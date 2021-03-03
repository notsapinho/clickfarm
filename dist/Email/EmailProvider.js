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
exports.EmailProvider = void 0;
const events_1 = require("events");
class EmailProvider extends events_1.EventEmitter {
    constructor(username, provider) {
        super();
        this.username = username;
        this.provider = provider;
    }
    init() { }
    close() { }
    get email() {
        return `${this.username}@${this.provider}`;
    }
    waitFor(filter, opts) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((res, rej) => {
                this.on("NEW_MAIL", m);
                function m(mail) {
                    try {
                        if (filter(mail)) {
                            return res(mail);
                        }
                    }
                    catch (error) {
                        console.error(error);
                    }
                }
                setTimeout(() => {
                    this.off("NEW_MAIL", m);
                    return rej(new Error("Timeout for email"));
                }, 1000 * ((opts === null || opts === void 0 ? void 0 : opts.timeout) || 30));
            });
        });
    }
}
exports.EmailProvider = EmailProvider;
//# sourceMappingURL=EmailProvider.js.map