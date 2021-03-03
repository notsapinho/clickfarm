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
exports.ProxyManager = void 0;
const proxy_agent_1 = __importDefault(require("proxy-agent"));
const events_1 = require("events");
class ProxyManager extends events_1.EventEmitter {
    constructor(protocol, ip, port) {
        super();
        this.protocol = protocol;
        this.ip = ip;
        this.port = port;
        this.agent = new proxy_agent_1.default(`${protocol}://${ip}:${port}`);
    }
    static get available() {
        return 0;
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    release() {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("not implemented");
        });
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.ProxyManager = ProxyManager;
//# sourceMappingURL=ProxyManager.js.map