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
exports.GmailProvider = void 0;
const EmailProvider_1 = require("./EmailProvider");
// @ts-ignore
const emailjs_imap_client_1 = __importDefault(require("emailjs-imap-client"));
const mailparser_1 = require("mailparser");
class GmailProvider extends EmailProvider_1.EmailProvider {
    constructor(username, password) {
        super(username, "gmail.com");
        this.newMessage = (path, type, value) => __awaiter(this, void 0, void 0, function* () {
            if (type !== "exists")
                return;
            const messages = yield this.client.listMessages(path, value, ["envelope", "body[]"]);
            messages.forEach((message) => __awaiter(this, void 0, void 0, function* () {
                var _a, _b;
                const body = message["body[]"];
                const email = yield mailparser_1.simpleParser(body);
                const mail = {
                    html: email.html,
                    text: email.text,
                    recipient: (_a = email.to) === null || _a === void 0 ? void 0 : _a.value[0].address,
                    sender: (_b = email.from) === null || _b === void 0 ? void 0 : _b.value[0].address,
                    subject: email.subject,
                };
                console.log("got mail from: " + mail.sender + " to: " + mail.recipient);
                this.emit("NEW_MAIL", mail);
            }));
        });
        this.client = new emailjs_imap_client_1.default("imap.gmail.com", 993, {
            auth: { user: username, pass: password },
            useSecureTransport: true,
            logLevel: "info",
        });
        this.client.onerror = console.error;
        this.client.onupdate = this.newMessage;
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.client.connect();
            yield this.client.selectMailbox("INBOX");
        });
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.client.close();
        });
    }
}
exports.GmailProvider = GmailProvider;
//# sourceMappingURL=GmailProvider.js.map