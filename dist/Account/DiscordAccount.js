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
exports.DiscordAccount = void 0;
const solveCaptcha_1 = require("../Captcha/solveCaptcha");
const promises_1 = __importDefault(require("fs/promises"));
const Account_1 = require("./Account");
const Util_1 = require("../util/Util");
const ua_parser_js_1 = require("ua-parser-js");
const request_1 = require("../util/request");
const node_fetch_1 = __importDefault(require("node-fetch"));
const file_type_1 = __importDefault(require("file-type"));
const getAnticaptchaToken_1 = require("../Captcha/getAnticaptchaToken");
require("missing-native-js-functions");
// const ac = require("../Captcha/anticaptcha");
const ac = require("@antiadmin/anticaptchaofficial");
class DiscordAccount extends Account_1.Account {
    constructor(props) {
        super(props);
        this.client_uuid = "MgDGI4DI4grrNxdWS7fyLXYBAAABAAAA";
        if (props.init !== false)
            this.intialized = this.init();
    }
    get stringofbirth() {
        if (!this.dateofbirth)
            return;
        return `${this.dateofbirth.getFullYear()}-${this.dateofbirth.getMonth() + 1}-${this.dateofbirth.getDate()}`;
    }
    get xSuperPropertiesBase64() {
        return Util_1.objectAsBase64(this.xSuperProperties);
    }
    init() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            this.initBrowserAgent();
            return Promise.all([this.initFingerprint(), this.initAvatar(), (_a = this.emailProvider) === null || _a === void 0 ? void 0 : _a.init()]);
        });
    }
    initAvatar() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.avatar)
                return;
            try {
                let buffer;
                if (this.avatar.startsWith("http")) {
                    const request = yield node_fetch_1.default(this.avatar);
                    buffer = yield request.buffer();
                }
                else {
                    buffer = (yield promises_1.default.readFile(this.avatar, { encoding: "binary" }));
                }
                const filetype = yield file_type_1.default.fromBuffer(buffer);
                if (!filetype || !buffer)
                    return;
                this.avatarBase64 = `data:${filetype.mime};base64,${buffer.toString("base64")}`;
            }
            catch (error) {
                console.error("error getting avatar for " + this.avatar, error);
            }
        });
    }
    initFingerprint() {
        return __awaiter(this, void 0, void 0, function* () {
            const { fingerprint } = yield this.fetch("/experiments", { context: { location: "Register" } });
            this.fingerprint = fingerprint;
        });
    }
    initBrowserAgent() {
        this.useragent = Util_1.randomUserAgent();
        const uaparser = new ua_parser_js_1.UAParser(this.useragent);
        const browser = uaparser.getBrowser();
        const os = uaparser.getOS();
        this.xSuperProperties = {
            browser: browser.name,
            browser_user_agent: this.useragent,
            browser_version: browser.version,
            referrer: "",
            referrer_current: "",
            referring_domain: "",
            referring_domain_current: "",
            release_channel: "stable",
            client_build_number: 72071,
            client_event_source: null,
            device: "",
            os: os.name,
            os_version: os.version,
        };
    }
    fetch(path, opts) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = "https://discord.com/api/v8" + path;
            if (!opts)
                opts = {};
            if (!opts.headers)
                opts.headers = {};
            if (opts.context)
                opts.headers["x-context-properties"] = Util_1.objectAsBase64(opts.context);
            if (this.fingerprint)
                opts.headers["x-fingerprint"] = this.fingerprint;
            if (this.useragent)
                opts.headers["user-agent"] = this.useragent;
            if (this.token)
                opts.headers["authorization"] = this.token;
            if (this.proxy)
                opts.agent = this.proxy.agent;
            opts.headers = Object.assign(Object.assign({}, opts.headers), { accept: "*/*", referer: "https://discord.com/", origin: "https://discord.com", cookie: "__cfduid=d15581d28d4ab55ec53052f006a9d5b2e1607088253; locale=en-US; _ga=GA1.2.695554087.1607088255; _gid=GA1.2.342211744.1607088255; _gat_UA-53577205-2=1", "sec-fetch-dest": "empty", "sec-fetch-mode": "cors", "sec-fetch-site": "same-origin", "accept-language": "en-US", "x-super-properties": this.xSuperPropertiesBase64 });
            return request_1.request(url, opts);
        });
    }
    science(type, properties) {
        return __awaiter(this, void 0, void 0, function* () {
            // "mktg_page_viewed"
            let body = {
                // @ts-ignore
                events: [
                    {
                        type: type,
                        properties: Object.assign({ client_track_timestamp: Math.floor(Date.now() - Math.random() * 500 + 500), client_uuid: this.client_uuid, client_send_timestamp: Date.now() }, properties),
                    },
                ],
            };
            if (this.science_token)
                body.science_token = this.science_token;
            return this.fetch("/science", { body });
        });
    }
    solveCaptcha() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            return solveCaptcha_1.solveCaptcha("https://discord.com/", "6Lef5iQTAAAAAKeIvIY-DeexoO3gj7ryl9rLMEnn", {
                agent: (_a = this.proxy) === null || _a === void 0 ? void 0 : _a.agent,
                timeout: 300,
            });
            ac.setAPIKey(getAnticaptchaToken_1.getAnticaptchaToken());
            return ac.solveRecaptchaV2Proxyless("https://discord.com/", "6Lef5iQTAAAAAKeIvIY-DeexoO3gj7ryl9rLMEnn");
        });
    }
    repeatAction(func) {
        return __awaiter(this, void 0, void 0, function* () {
            let error;
            let captcha_key = null;
            do {
                try {
                    error = null;
                    return yield func(captcha_key);
                }
                catch (e) {
                    error = e;
                    if (error && error.captcha_key) {
                        captcha_key = yield this.solveCaptcha();
                    }
                    else if (error && error.retry_after) {
                        yield Util_1.sleep(error.retry_after * 1000);
                    }
                    else {
                        throw error;
                    }
                }
            } while (error);
        });
    }
    register({ emailverify, invite } = { emailverify: true }) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const self = this;
            yield this.intialized;
            console.log("register");
            var additionalOptions = {};
            if (self.emailProvider)
                additionalOptions.email = self.emailProvider.email;
            function reg(captcha_key) {
                return __awaiter(this, void 0, void 0, function* () {
                    return yield self.fetch("/auth/register", {
                        body: Object.assign({ fingerprint: self.fingerprint, username: self.username, password: self.password, invite, consent: true, date_of_birth: self.stringofbirth, gift_code_sku_id: null, captcha_key }, additionalOptions),
                    });
                });
            }
            var { token } = yield this.repeatAction(reg);
            this.token = token;
            if (this.emailProvider && emailverify) {
                console.log("wait for mail");
                const mail = yield this.emailProvider.waitFor((email) => {
                    var _a;
                    return email.recipient.equalsIgnoreCase((_a = this.emailProvider) === null || _a === void 0 ? void 0 : _a.email) &&
                        email.sender === "noreply@discord.com";
                });
                yield Util_1.sleep(1000 * 30);
                let link = (_a = mail.text.match(/https:.+/g)) === null || _a === void 0 ? void 0 : _a[0];
                const res = yield node_fetch_1.default(link, { redirect: "manual", agent: (_b = this.proxy) === null || _b === void 0 ? void 0 : _b.agent });
                if (res.status >= 400)
                    throw "email verify link not working";
                const href = res.headers.get("location");
                const emailtoken = href.split("=")[1];
                console.log("verify email");
                function verify(captcha_key) {
                    return self.fetch("/auth/verify", { body: { captcha_key, token: emailtoken } });
                }
                yield this.repeatAction(verify);
            }
            else {
                // guest account
            }
            console.log("sucessfully registered");
        });
    }
    login() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    uploadAvatar() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.fetch("/users/@me", {
                body: {
                    avatar: this.avatarBase64,
                },
                method: "PATCH",
            });
        });
    }
    sendFriendRequest(tag) {
        const username = tag.split("#")[0];
        const discriminator = tag.split("#")[1];
        return this.fetch("/users/@me/relationships", {
            body: {
                username,
                discriminator,
            },
        });
    }
    removeFriend(id) {
        return this.fetch(`/users/@me/relationships/${id}`, {
            method: "DELETE",
        });
    }
    directMessage(userid, text) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = yield this.fetch(`/users/@me/channels`, {
                body: {
                    recipients: [userid],
                },
            });
            return this.sendMessage(id, text);
        });
    }
    sendMessage(channelid, content) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.fetch(`/channels/${channelid}/messages`, {
                body: {
                    content,
                },
            });
        });
    }
    fetchMessages(channelid) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.fetch(`/channels/${channelid}/messages?limit=50`);
        });
    }
    addReaction(channelid, messageid, emoji) {
        return __awaiter(this, void 0, void 0, function* () {
            emoji = encodeURIComponent(emoji);
            return this.fetch(`/channels/${channelid}/messages/${messageid}/reactions/${emoji}/%40me`, {
                method: "PUT",
            });
        });
    }
    setHypesquad(house_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.fetch("/hypesquad/online", { body: { house_id } });
        });
    }
    leaveServer(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.fetch(`/users/@me/guilds/${id}`, { method: "DELETE" });
        });
    }
    joinServer(invite) {
        return __awaiter(this, void 0, void 0, function* () {
            const i = invite.split("/").last();
            return this.fetch(`/invites/${i}`, { method: "POST" });
        });
    }
    close() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            yield ((_a = this.emailProvider) === null || _a === void 0 ? void 0 : _a.close());
        });
    }
}
exports.DiscordAccount = DiscordAccount;
/*

Science requests aren't needed
await this.science("mktg_page_viewed", {
    has_session: false,
    page_name: "landing",
    previous_link_location: null,
    previous_page_name: null,
});
await sleepRandom(500, 1000);
await this.science("main_navigation_menu", {
    page_name: "landing",
    linkClicked: "login",
});
await sleepRandom(250, 500);
await this.science("keyboard_mode_toggled", {
    accessibility_support_enabled: false,
    accessibility_features: 128,
    enabled: false,
});
await this.science("login_viewed", {
    location: "Non-Invite Login Page",
    login_source: null,
    accessibility_support_enabled: false,
    accessibility_features: 128,
});
await sleepRandom(250, 500);
this.science("app_ui_viewed", {
    total_compressed_byte_size: 2176189,
    total_uncompressed_byte_size: 9861292,
    total_transfer_byte_size: 0,
    js_compressed_byte_size: 1409154,
    js_uncompressed_byte_size: 7319631,
    js_transfer_byte_size: 0,
    css_compressed_byte_size: 205356,
    css_uncompressed_byte_size: 1351021,
    css_transfer_byte_size: 0,
    load_id: uuidv4(),
    screen_name: "login",
    duration_ms_since_app_opened: 784,
    accessibility_support_enabled: false,
    accessibility_features: 128,
});
await sleepRandom(500, 1000);
await this.science("register_viewed", {
    location: "Non-Invite Register Page",
    registration_source: null,
    accessibility_features: 128,
    accessibility_support_enabled: false,
});
await self.science("age_gate_submitted", {
    dob: null, // don't know why this is not send, even if it's set
    source_section: "Register",
    accessibility_features: 128,
    accessibility_support_enabled: false,
});
*/
//# sourceMappingURL=DiscordAccount.js.map