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
const promises_1 = __importDefault(require("fs/promises"));
const Account_1 = require("./Account");
const Util_1 = require("./Util");
const ua_parser_js_1 = require("ua-parser-js");
const request_1 = require("./request");
const uuid_1 = require("uuid");
const solveRCaptcha_1 = require("./Captcha/solveRCaptcha");
const node_fetch_1 = __importDefault(require("node-fetch"));
class DiscordAccount extends Account_1.Account {
    constructor(props) {
        super(props);
        this.client_uuid = "AQDEiIBaUQT6gxI2IWASK3YBAAAAAAAA";
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
    fetch(path, opts) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!opts)
                opts = {};
            if (!opts.headers)
                opts.headers = {};
            if (opts.context)
                opts.headers["x-context-properties"] = Util_1.objectAsBase64(opts.context);
            opts.headers["X-Super-Properties"] = this.xSuperPropertiesBase64;
            if (this.fingerprint)
                opts.headers["x-fingerpint"] = this.fingerprint;
            return request_1.request("https://discord.com/api/v8" + path, opts);
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
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.initBrowserAgent();
            return Promise.all([this.initFingerprint()]);
        });
    }
    initFingerprint() {
        return __awaiter(this, void 0, void 0, function* () {
            const { fingerprint } = yield this.fetch("/experiments", { context: { location: "Register" } });
            this.fingerprint = fingerprint;
        });
    }
    initBrowserAgent() {
        return __awaiter(this, void 0, void 0, function* () {
            const useragents = yield promises_1.default.readFile(__dirname + "/Lists/user_agents.txt", { encoding: "utf8" });
            const useragent = useragents.split("\n").random();
            const uaparser = new ua_parser_js_1.UAParser(useragent);
            const browser = uaparser.getBrowser();
            const os = uaparser.getOS();
            this.xSuperProperties = {
                browser: browser.name,
                browser_user_agent: useragent,
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
        });
    }
    register() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            console.log("wait init");
            yield this.intialized;
            if (this.emailProvider) {
                console.log("register");
                // register verified account
                yield this.science("mktg_page_viewed", {
                    has_session: false,
                    page_name: "landing",
                    previous_link_location: null,
                    previous_page_name: null,
                });
                yield Util_1.sleepRandom(500, 1000);
                yield this.science("main_navigation_menu", {
                    page_name: "landing",
                    linkClicked: "login",
                });
                yield Util_1.sleepRandom(250, 500);
                yield this.science("keyboard_mode_toggled", {
                    accessibility_support_enabled: false,
                    accessibility_features: 128,
                    enabled: false,
                });
                yield this.science("login_viewed", {
                    location: "Non-Invite Login Page",
                    login_source: null,
                    accessibility_support_enabled: false,
                    accessibility_features: 128,
                });
                yield Util_1.sleepRandom(250, 500);
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
                    load_id: uuid_1.v4(),
                    screen_name: "login",
                    duration_ms_since_app_opened: 784,
                    accessibility_support_enabled: false,
                    accessibility_features: 128,
                });
                yield Util_1.sleepRandom(500, 1000);
                yield this.science("register_viewed", {
                    location: "Non-Invite Register Page",
                    registration_source: null,
                    accessibility_features: 128,
                    accessibility_support_enabled: false,
                });
                let captcha_key = null;
                const self = this;
                function reg() {
                    var _a;
                    return __awaiter(this, void 0, void 0, function* () {
                        yield self.science("age_gate_submitted", {
                            dob: null,
                            source_section: "Register",
                            accessibility_features: 128,
                            accessibility_support_enabled: false,
                        });
                        return self.fetch("/auth/register", {
                            body: {
                                fingerprint: self.fingerprint,
                                email: (_a = self.emailProvider) === null || _a === void 0 ? void 0 : _a.email,
                                username: self.username,
                                password: self.password,
                                invite: null,
                                consent: true,
                                date_of_birth: self.stringofbirth,
                                gift_code_sku_id: null,
                                captcha_key,
                            },
                        });
                    });
                }
                try {
                    var { token } = yield reg();
                }
                catch (error) {
                    if (error && error.captcha_key) {
                        captcha_key = yield solveRCaptcha_1.solveRCaptcha("https://discord.com/", "6Lef5iQTAAAAAKeIvIY-DeexoO3gj7ryl9rLMEnn");
                        var { token } = yield reg();
                    }
                    else {
                        console.error("discord other register error: ", error);
                        throw error;
                    }
                }
                this.token = token;
                console.log("wait for mail");
                const mail = yield this.emailProvider.waitFor((mail) => { var _a; return mail.recipient === ((_a = this.emailProvider) === null || _a === void 0 ? void 0 : _a.email) && mail.sender === "noreply@discordapp.com"; });
                console.log(mail);
                const link = ((_a = mail.html.match(/https:\/\/[\d\w]+\.discordapp\.com\/ls\/click\?upn=([\w\d\-=]+\r\n)+/g)) === null || _a === void 0 ? void 0 : _a[0]); // search for https://url9624.discordapp.com/ls/click?upn=qDOo8cnwIoKzt0aLL1cBeFE1RlVCKJFF5zAq8ml-2BFh1dq-2FeX22E9yMPFmLMSO5CYwAol4ZzpBioWgrT27-2BnTzrbLMzysWGw0nwP2biY79tepTOTnY4SdxrM-2BsbzizE1-2FFXAsbqTrCg5egbNPBfkjNPq4cWG7641Ewk71GmHK-2BiNywyYW2H6oihu38TkCXq17w-2Bi9GBd3yvYJTbb9eFudqJC2qrPsY-2FkJ1yIGJUn6NWA-3D2bGH_E2ztplHE4zoCK0j8yCTFl0Erw1llUbPZjfYE-2F2pdRvD6TYNtCi7aOkDgQgkwpScN7n7wCH4-2Bcy6rHqYX-2Ftwf8HFsez5Ac2psAIpXx1DnMUcQxpDDcF4e0n8Ko-2FHbbWu3oUKuEXamxctnlJyJrxx3Of6nFxjLnwjXku-2BXrrqWzVrrzBdA6T41CfAJQ1ywTYXlJOYrCK63RADJSdiYwkGm7gJ8SzomThxFsnOhObPqmD4-3D
                const res = yield node_fetch_1.default(link, { follow: 0 });
                const href = res.headers.get("location");
                const emailtoken = href.split("=")[1];
                captcha_key = null;
                function verify() {
                    return self.fetch("/verify", { body: { captcha_key, token: emailtoken } });
                }
                try {
                    yield verify();
                }
                catch (error) {
                    if (error && error.captcha_key) {
                        captcha_key = yield solveRCaptcha_1.solveRCaptcha("https://discord.com/", "6Lef5iQTAAAAAKeIvIY-DeexoO3gj7ryl9rLMEnn");
                        var { token } = yield reg();
                    }
                    else {
                        console.error("discord email verify error: ", error);
                        throw error;
                    }
                }
            }
            else {
                // register temp account
                // https://discord.gg/N8WxRUy
            }
        });
    }
    login() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.DiscordAccount = DiscordAccount;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGlzY29yZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9EaXNjb3JkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDJEQUE2QjtBQUM3Qix1Q0FBb0Q7QUFDcEQsaUNBQTREO0FBQzVELCtDQUF3QztBQUN4Qyx1Q0FBb0Q7QUFDcEQsK0JBQW9DO0FBQ3BDLDJEQUF3RDtBQUN4RCw0REFBK0I7QUFNL0IsTUFBYSxjQUFlLFNBQVEsaUJBQU87SUFzQjFDLFlBQVksS0FBNEI7UUFDdkMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBSk4sZ0JBQVcsR0FBVyxrQ0FBa0MsQ0FBQztRQUtoRSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUMvQixDQUFDO0lBRUQsSUFBSSxhQUFhO1FBQ2hCLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVztZQUFFLE9BQU87UUFDOUIsT0FBTyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDO0lBQzdHLENBQUM7SUFFRCxJQUFJLHNCQUFzQjtRQUN6QixPQUFPLHFCQUFjLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVLLEtBQUssQ0FBQyxJQUFZLEVBQUUsSUFBMEI7O1lBQ25ELElBQUksQ0FBQyxJQUFJO2dCQUFFLElBQUksR0FBRyxFQUFFLENBQUM7WUFDckIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPO2dCQUFFLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1lBQ3JDLElBQUksSUFBSSxDQUFDLE9BQU87Z0JBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxHQUFHLHFCQUFjLENBQUMsSUFBSSxD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