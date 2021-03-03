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
exports.request = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
// TODO: save cookie (different for each proxy)
function request(url, opts) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!opts)
            opts = {};
        if (!opts.headers)
            opts.headers = {};
        if (opts.body) {
            if (typeof opts.body === "object") {
                opts.headers["content-type"] = "application/json";
                opts.body = JSON.stringify(opts.body);
            }
            if (!opts.method)
                opts.method = "POST";
        }
        const res = yield node_fetch_1.default(url, opts);
        if (res.status === 204)
            return true;
        const text = yield res.text();
        const error = res.status >= 300 || res.status < 200;
        try {
            var json = JSON.parse(text);
        }
        catch (e) {
            if (error) {
                if (text)
                    throw text;
                throw res.statusText;
            }
            if (opts.res)
                return { res, body: text };
            return text;
        }
        if (json) {
            if (json.error || (json.code && !json.guild) || json.message)
                throw json;
            if (error)
                throw json;
        }
        if (error)
            throw res.statusText;
        if (opts.res)
            return { res, body: json };
        return json;
    });
}
exports.request = request;
//# sourceMappingURL=request.js.map