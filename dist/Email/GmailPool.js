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
exports.GmailPool = exports.GmailDummyProvider = void 0;
const events_1 = require("events");
const Util_1 = require("../util/Util");
const EmailProvider_1 = require("./EmailProvider");
const GmailProvider_1 = require("./GmailProvider");
class GmailDummyProvider extends EmailProvider_1.EmailProvider {
    constructor(gmail, username) {
        super(username, "gmail.com");
        this.gmail = gmail;
        this.newMail = (mail) => {
            this.emit("NEW_MAIL", mail);
        };
        this.init();
    }
    init() {
        this.gmail.on("NEW_MAIL", this.newMail);
        this.gmail.on("CLOSE", this.close);
    }
    close() {
        this.gmail.off("CLOSE", this.close);
        this.gmail.off("NEW_MAIL", this.newMail);
    }
}
exports.GmailDummyProvider = GmailDummyProvider;
class GmailPool extends events_1.EventEmitter {
    constructor(username, password) {
        super();
        this.provider = new GmailProvider_1.GmailProvider(username, password);
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.provider.init();
        });
    }
    getProvider(username) {
        if (username)
            return new GmailDummyProvider(this.provider, username);
        const id = Util_1.makeid(5);
        const name = this.provider.username;
        // .split("")
        // .map((x) => (Math.random() > 0.5 ? x + "." : x))
        // .join("");
        return new GmailDummyProvider(this.provider, `${name}+${id}`);
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            this.emit("CLOSE");
            return this.provider.close();
        });
    }
}
exports.GmailPool = GmailPool;
//# sourceMappingURL=GmailPool.js.map