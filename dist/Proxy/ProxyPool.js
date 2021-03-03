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
exports.ProxyPool = void 0;
const events_1 = require("events");
class ProxyPool extends events_1.EventEmitter {
    constructor(holds, poolSize = 1) {
        super();
        this.holds = holds;
        this.poolSize = poolSize;
        this.used = [];
        this.free = [];
        this.portCounter = 9000;
        this.poolSize = Math.min(holds.available, poolSize);
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.holds;
            let promises = [];
            for (let i = 0; i < this.poolSize; i++) {
                promises.push(this.createProxy());
            }
            this.free = yield Promise.all(promises);
        });
    }
    createProxy() {
        return __awaiter(this, void 0, void 0, function* () {
            // @ts-ignore
            const proxy = new this.holds(this.portCounter++);
            return yield this.handleProxy(proxy);
        });
    }
    handleProxy(proxy) {
        return __awaiter(this, void 0, void 0, function* () {
            yield proxy.init();
            const self = this;
            proxy.on("released", (newProxy) => __awaiter(this, void 0, void 0, function* () {
                self.used.remove(proxy);
                if (newProxy !== proxy)
                    yield self.handleProxy(newProxy);
                self.free.push(newProxy);
                self.emit("released", newProxy);
            }));
            return proxy;
        });
    }
    getProxy() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            let proxy = this.free.pop();
            // @ts-ignore
            if (!proxy && ((_a = proxy === null || proxy === void 0 ? void 0 : proxy.constructor) === null || _a === void 0 ? void 0 : _a.available))
                proxy = yield this.createProxy();
            this.used.push(proxy);
            return proxy;
        });
    }
}
exports.ProxyPool = ProxyPool;
//# sourceMappingURL=ProxyPool.js.map