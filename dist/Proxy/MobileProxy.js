"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MobileProxy = void 0;
const ProxyManager_1 = require("./ProxyManager");
const node_fetch_1 = __importDefault(require("node-fetch"));
const fast_xml_parser_1 = __importDefault(require("fast-xml-parser"));
const http_1 = __importDefault(require("http"));
const http_proxy_1 = __importDefault(require("http-proxy"));
const url_1 = __importDefault(require("url"));
const net_1 = __importDefault(require("net"));
const Util_1 = require("../util/Util");
var rsaKey;
var cookieHeader = "";
var token = "";
var localAddress = "192.168.8.100";
class MobileProxy extends ProxyManager_1.ProxyManager {
    constructor() {
        super("http", "localhost", 8080);
        MobileProxy.count++;
    }
    static get available() {
        return 1 - MobileProxy.count;
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            yield login();
            this.server = http_1.default.createServer(function (req, res) {
                return __awaiter(this, void 0, void 0, function* () {
                    var urlObj = url_1.default.parse(req.url);
                    var target = urlObj.protocol + "//" + urlObj.host;
                    // console.log("Proxy HTTP request for:", target);
                    var proxy = http_proxy_1.default.createProxyServer({ localAddress });
                    proxy.on("error", function (err, req, res) {
                        console.log("proxy error", err);
                        res.end();
                    });
                    proxy.web(req, res, { target: target });
                });
            });
            var regex_hostport = /^([^:]+)(:([0-9]+))?$/;
            var getHostPortFromString = function (hostString, defaultPort) {
                var host = hostString;
                var port = defaultPort;
                var result = regex_hostport.exec(hostString);
                if (result != null) {
                    host = result[1];
                    if (result[2] != null) {
                        port = result[3];
                    }
                }
                return [host, port];
            };
            this.server.addListener("connect", function (req, socket, bodyhead) {
                var hostPort = getHostPortFromString(req.url, 443);
                var hostDomain = hostPort[0];
                var port = parseInt(hostPort[1]);
                // console.log("Proxying HTTPS request for:", hostDomain, port);
                var proxySocket = new net_1.default.Socket();
                proxySocket.connect({ port, host: hostDomain, localAddress }, function () {
                    proxySocket.write(bodyhead);
                    socket.write("HTTP/" + req.httpVersion + " 200 Connection established\r\n\r\n");
                });
                proxySocket.on("data", function (chunk) {
                    socket.write(chunk);
                });
                proxySocket.on("end", function () {
                    socket.end();
                });
                proxySocket.on("error", function () {
                    socket.write("HTTP/" + req.httpVersion + " 500 Connection error\r\n\r\n");
                    socket.end();
                });
                socket.on("data", function (chunk) {
                    proxySocket.write(chunk);
                });
                socket.on("end", function () {
                    proxySocket.end();
                });
                socket.on("error", function () {
                    proxySocket.end();
                });
            });
            return new Promise((res) => this.server.listen(this.port, () => res(null)));
        });
    }
    release() {
        return __awaiter(this, void 0, void 0, function* () {
            this.emit("released", this);
            yield newIp();
            yield Util_1.sleep(4000);
            return this;
        });
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            this.server.close();
        });
    }
}
exports.MobileProxy = MobileProxy;
MobileProxy.count = 0;
function newIp() {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            if (!token)
                yield getToken();
            try {
                var res = yield node_fetch_1.default("http://192.168.8.1/api/dialup/profiles", {
                    method: "POST",
                    headers: {
                        "content-type": "application/x-www-form-urlencoded",
                        cookie: cookieHeader,
                        __RequestVerificationToken: token,
                    },
                    body: `<?xml version="1.0" encoding="UTF-8"?><request><Delete>0</Delete><SetDefault>2</SetDefault><Modify>2</Modify><Profile><Index>2</Index><IsValid>1</IsValid><Name>test</Name><ApnIsStatic>1</ApnIsStatic><ApnName>test${Math.floor(Math.random() * 10000)}</ApnName><DialupNum>*99#</DialupNum><Username></Username><AuthMode>0</AuthMode><IpIsStatic>0</IpIsStatic><IpAddress></IpAddress><DnsIsStatic>0</DnsIsStatic><PrimaryDns></PrimaryDns><SecondaryDns></SecondaryDns><ReadOnly>0</ReadOnly><iptype>0</iptype></Profile></request>`,
                });
                res = yield res.text();
                res = fast_xml_parser_1.default.parse(res);
                // console.log("ip changed");
                res = res.response;
                token = "";
                console.log("new ip");
                setTimeout(() => resolve(null), 1000);
            }
            catch (error) {
                reject();
            }
        }));
    });
}
function getToken() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            var res = yield node_fetch_1.default("http://192.168.8.1/api/webserver/SesTokInfo", {
                headers: {
                    __RequestVerificationToken: "",
                    cookie: cookieHeader,
                },
            });
            let body = fast_xml_parser_1.default.parse(yield res.text());
            token = body.response.TokInfo;
            cookieHeader = body.response.SesInfo;
        }
        catch (e) {
            token = "";
            console.error(e);
        }
    });
}
function login() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!token)
            yield getToken();
        try {
            var res = yield node_fetch_1.default("http://192.168.8.1/api/user/hilink_login", {
                method: "GET",
                headers: {
                    cookie: cookieHeader,
                },
            });
            res = yield res.text();
            res = fast_xml_parser_1.default.parse(res);
            if (res.error)
                console.error(res.error.code);
            res = yield node_fetch_1.default("http://192.168.8.1/api/user/state-login", {
                method: "GET",
                headers: {
                    cookie: cookieHeader,
                },
            });
            res = yield res.text();
            res = fast_xml_parser_1.default.parse(res);
            if (res.error)
                console.error(res.error.code);
            res = yield node_fetch_1.default("http://192.168.8.1/api/webserver/publickey", {
                method: "GET",
                headers: {
                    cookie: cookieHeader,
                },
            });
            res = yield res.text();
            res = fast_xml_parser_1.default.parse(res);
            if (res.error)
                console.error(res.error.code);
            // rsaKey = { e: res.response.encpubkeyn, n: res.response.encpubkeye + "" };
            // const key = new NodeRSA();
            // key.importKey(
            // 	{
            // 		n: Buffer.from(rsaKey.n),
            // 		e: rsaKey.e,
            // 	},
            // 	"components-public"
            // );
            // rsaKey = key;
            // newIp();
        }
        catch (error) {
            console.error(error);
        }
    });
}
//# sourceMappingURL=MobileProxy.js.map