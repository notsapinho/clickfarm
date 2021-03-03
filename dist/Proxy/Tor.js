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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tor = void 0;
const ProxyManager_1 = require("./ProxyManager");
const child_process_1 = require("child_process");
const Util_1 = require("../util/Util");
class Tor extends ProxyManager_1.ProxyManager {
    constructor(port) {
        super("socks5", "localhost", port);
    }
    static get available() {
        return 100000;
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.intalized)
                return;
            this.intalized = true;
            const dir = yield Util_1.tempDir();
            this.process = child_process_1.spawn("tor", `--SocksPort ${this.port} --DataDirectory ${dir}`.split(" "));
            yield new Promise((resolve, reject) => {
                var _a, _b;
                let history = "";
                (_b = (_a = this.process) === null || _a === void 0 ? void 0 : _a.stdout) === null || _b === void 0 ? void 0 : _b.on("data", (log) => {
                    log = log.toString().slice(0, -1);
                    history += log;
                    if (log.includes("100% (done)"))
                        resolve(true);
                    if (log.includes("[err]"))
                        reject(history);
                });
            });
        });
    }
    release() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            (_a = this.process) === null || _a === void 0 ? void 0 : _a.kill("SIGHUP");
            yield Util_1.sleep(500);
            this.emit("released", this);
            return this;
        });
    }
}
exports.Tor = Tor;
//# sourceMappingURL=Tor.js.map