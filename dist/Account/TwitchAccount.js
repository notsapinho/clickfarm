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
exports.TwitchAccount = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const Account_1 = require("./Account");
const request_1 = require("../util/request");
const Util_1 = require("../util/Util");
const ac = require("@antiadmin/anticaptchaofficial");
class TwitchAccount extends Account_1.Account {
    constructor(opts) {
        super(opts);
        this.cookies = {};
        this.useragent = Util_1.randomUserAgent();
        this.intialized = this.init();
    }
    getCookies() {
        return (Object.entries(this.cookies)
            .map(([key, value]) => `${key}=${value}`)
            .join("; ") + `; auth-token=${this.access_token}`);
    }
    fetch(url, opts) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (!opts)
                opts = {};
            if (!opts.headers)
                opts.headers = {};
            opts.agent = (_a = this.proxy) === null || _a === void 0 ? void 0 : _a.agent;
            opts.headers = Object.assign(Object.assign({}, opts.headers), { accept: "*/*", referer: "hhttps://www.twitch.tv/", origin: "https://www.twitch.tv", "accept-language": "en", "cache-control": "no-cache", "content-type": "text/plain;charset=UTF-8", pragma: "no-cache", "sec-ch-ua": '" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"', "sec-ch-ua-mobile": "?0", "sec-fetch-dest": "empty", "sec-fetch-mode": "cors", "sec-fetch-site": "same-site", "user-agent": this.useragent, "client-id": TwitchAccount.client_id, cookie: this.getCookies() });
            if (this.access_token)
                opts.headers.authorization = `OAuth ${this.access_token}`;
            const { body, res } = yield request_1.request(url, Object.assign(Object.assign({}, opts), { res: true }));
            const cookies = res.headers.raw()["set-cookie"] || [];
            cookies.forEach((cookie) => {
                const c = cookie.split("; ")[0];
                const [key, value] = c.split("=");
                // @ts-ignore
                this.cookies[key] = value;
            });
            return body;
        });
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            // get unique_id user cookie
            yield this.fetch("https://twitch.tv/");
            this.cookies.api_token = `twilight.${TwitchAccount.getRandomId()}`;
        });
    }
    getUserId() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.user_id)
                return this.user_id;
            const res = yield this.fetch(`https://gql.twitch.tv/gql`, {
                body: [
                    {
                        operationName: "UserMenuCurrentUser",
                        variables: {},
                        extensions: {
                            persistedQuery: {
                                version: 1,
                                sha256Hash: "3fafec9996208e9c38f39893cc8cf7ed1933c77daff806b8171a1be54625b620",
                            },
                        },
                    },
                ],
            });
            this.user_id = res[0].data.currentUser.id;
            return this.user_id;
        });
    }
    retry(options, func) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            var tries = 0;
            while (tries++ < 2) {
                try {
                    return yield func();
                }
                catch (error) {
                    // console.log(error);
                    switch (error.error_code) {
                        case 3022:
                            // verify login location with email
                            if (!this.emailProvider)
                                throw "Can't verify email: no email provider set";
                            const mail = yield this.emailProvider.waitFor((email) => {
                                var _a;
                                return email.recipient === ((_a = this.emailProvider) === null || _a === void 0 ? void 0 : _a.email) &&
                                    ["account@twitch.tv", "no-reply@twitch.tv"].includes(email.sender);
                            });
                            const code = (_a = mail.text.match(/\n+(\d{6})\n+/)) === null || _a === void 0 ? void 0 : _a[1];
                            options.twitchguard_code = code;
                            options.captcha = { proof: error.captcha_proof };
                            break;
                        case 1000:
                            // captcha
                            ac.settings.funcaptchaApiJSSubdomain = "client-api.arkoselabs.com";
                            const token = yield ac.solveFunCaptchaProxyless("https://www.twitch.tv/signup", "E5554D43-23CC-1982-971D-6A2262A2CA24");
                            options.arkose = { token };
                            break;
                        default:
                            // unkown error code
                            throw error;
                    }
                }
            }
            throw "too many tries";
        });
    }
    login() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.intialized;
            const self = this;
            var options = {
                username: this.username,
                password: this.password,
                client_id: TwitchAccount.client_id,
                undelete_user: false,
            };
            yield this.retry(options, () => __awaiter(this, void 0, void 0, function* () {
                const { access_token } = yield self.fetch("https://passport.twitch.tv/login", {
                    body: options,
                });
                self.access_token = access_token;
            }));
        });
    }
    static usernameAvailable(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield node_fetch_1.default("https://gql.twitch.tv/gql", {
                headers: {
                    "client-id": TwitchAccount.client_id,
                },
                method: "POST",
                body: JSON.stringify([
                    {
                        operationName: "UsernameValidator_User",
                        variables: { username: username },
                        extensions: {
                            persistedQuery: {
                                version: 1,
                                sha256Hash: "fd1085cf8350e309b725cf8ca91cd90cac03909a3edeeedbd0872ac912f3d660",
                            },
                        },
                    },
                ]),
            });
            const available = yield res.json();
            return available[0].data.isUsernameAvailable;
        });
    }
    register() {
        var _a, _b, _c, _d, _e;
        return __awaiter(this, void 0, void 0, function* () {
            yield this.intialized;
            const self = this;
            const day = (_a = this.dateofbirth) === null || _a === void 0 ? void 0 : _a.getDate();
            const month = (_b = this.dateofbirth) === null || _b === void 0 ? void 0 : _b.getMonth();
            const year = (_c = this.dateofbirth) === null || _c === void 0 ? void 0 : _c.getFullYear();
            // if (!(await this.usernameAvailable())) throw `Username is not available: ${this.username}`;
            this.username = (_d = this.username) === null || _d === void 0 ? void 0 : _d.replace(/\W/g, "");
            var options = {
                email: (_e = this.emailProvider) === null || _e === void 0 ? void 0 : _e.email,
                username: this.username,
                password: this.password,
                client_id: TwitchAccount.client_id,
                include_verification_code: true,
                birthday: {
                    day,
                    month,
                    year,
                },
            };
            yield this.retry(options, () => __awaiter(this, void 0, void 0, function* () {
                // console.log(options);
                const result = yield self.fetch("https://passport.twitch.tv/register", {
                    body: options,
                });
                // console.log(result);
                self.access_token = result.access_token;
            }));
            if (this.avatar)
                yield this.changeProfilePicture(this.avatar);
        });
    }
    changeProfilePicture(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const user_id = yield this.getUserId();
            const { upload_url } = yield this.fetch(`https://api.twitch.tv/kraken/users/${user_id}/upload_image?client_id=${TwitchAccount.client_id}&api_version=5&image_type=profile_image&format=png`, {
                method: "POST",
            });
            const pfpReq = yield node_fetch_1.default(url);
            const pfp = yield pfpReq.buffer();
            yield node_fetch_1.default(upload_url, {
                method: "PUT",
                body: pfp,
            });
        });
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    static getRandomId() {
        return "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx".replace(/[xy]/g, function (e) {
            var t = (16 * Math.random()) | 0;
            return ("x" === e ? t : (3 & t) | 8).toString(16);
        });
    }
}
exports.TwitchAccount = TwitchAccount;
TwitchAccount.client_id = "kimne78kx3ncx6brgo4mv6wki5h1ko";
//# sourceMappingURL=TwitchAccount.js.map