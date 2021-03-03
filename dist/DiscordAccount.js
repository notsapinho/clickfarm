"use strict";
var __awaiter =
	(this && this.__awaiter) ||
	function (thisArg, _arguments, P, generator) {
		function adopt(value) {
			return value instanceof P
				? value
				: new P(function (resolve) {
						resolve(value);
				  });
		}
		return new (P || (P = Promise))(function (resolve, reject) {
			function fulfilled(value) {
				try {
					step(generator.next(value));
				} catch (e) {
					reject(e);
				}
			}
			function rejected(value) {
				try {
					step(generator["throw"](value));
				} catch (e) {
					reject(e);
				}
			}
			function step(result) {
				result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
			}
			step((generator = generator.apply(thisArg, _arguments || [])).next());
		});
	};
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscordAccount = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const Account_1 = require("./Account");
const Util_1 = require("./Util");
const ua_parser_js_1 = require("ua-parser-js");
const request_1 = require("./request");
const solveRCaptcha_1 = require("./Captcha/solveRCaptcha");
const node_fetch_1 = __importDefault(require("node-fetch"));
const file_type_1 = __importDefault(require("file-type"));
class DiscordAccount extends Account_1.Account {
	constructor(props) {
		super(props);
		this.client_uuid = "MgDGI4DI4grrNxdWS7fyLXYBAAABAAAA";
		this.intialized = this.init();
	}
	get stringofbirth() {
		if (!this.dateofbirth) return;
		return `${this.dateofbirth.getFullYear()}-${this.dateofbirth.getMonth() + 1}-${this.dateofbirth.getDate()}`;
	}
	get xSuperPropertiesBase64() {
		return Util_1.objectAsBase64(this.xSuperProperties);
	}
	init() {
		var _a;
		return __awaiter(this, void 0, void 0, function* () {
			yield this.initBrowserAgent();
			return Promise.all([
				this.initFingerprint(),
				this.initAvatar(),
				(_a = this.emailProvider) === null || _a === void 0 ? void 0 : _a.init(),
			]);
		});
	}
	initAvatar() {
		return __awaiter(this, void 0, void 0, function* () {
			if (!this.avatar) return;
			try {
				let buffer;
				if (this.avatar.startsWith("http")) {
					const request = yield node_fetch_1.default(this.avatar);
					buffer = yield request.buffer();
				} else {
					buffer = yield promises_1.default.readFile(this.avatar, { encoding: "binary" });
				}
				const filetype = yield file_type_1.default.fromBuffer(buffer);
				if (!filetype || !buffer) return;
				this.avatarBase64 = `data:${filetype.mime};base64,${buffer.toString("base64")}`;
			} catch (error) {
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
		return __awaiter(this, void 0, void 0, function* () {
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
		});
	}
	fetch(path, opts) {
		return __awaiter(this, void 0, void 0, function* () {
			const url = "https://discord.com/api/v8" + path;
			if (!opts) opts = {};
			if (!opts.headers) opts.headers = {};
			if (opts.context) opts.headers["x-context-properties"] = Util_1.objectAsBase64(opts.context);
			if (this.fingerprint) opts.headers["x-fingerprint"] = this.fingerprint;
			if (this.useragent) opts.headers["user-agent"] = this.useragent;
			if (this.token) opts.headers["authorization"] = this.token;
			if (this.proxy) opts.agent = this.proxy.agent;
			opts.headers = Object.assign(Object.assign({}, opts.headers), {
				accept: "*/*",
				referer: "https://discord.com/",
				origin: "https://discord.com",
				cookie:
					"__cfduid=d15581d28d4ab55ec53052f006a9d5b2e1607088253; locale=en-US; _ga=GA1.2.695554087.1607088255; _gid=GA1.2.342211744.1607088255; _gat_UA-53577205-2=1",
				"sec-fetch-dest": "empty",
				"sec-fetch-mode": "cors",
				"sec-fetch-site": "same-origin",
				"accept-language": "en-US",
				"x-super-properties": this.xSuperPropertiesBase64,
			});
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
						properties: Object.assign(
							{
								client_track_timestamp: Math.floor(Date.now() - Math.random() * 500 + 500),
								client_uuid: this.client_uuid,
								client_send_timestamp: Date.now(),
							},
							properties
						),
					},
				],
			};
			if (this.science_token) body.science_token = this.science_token;
			return this.fetch("/science", { body });
		});
	}
	solveCaptcha() {
		var _a;
		return __awaiter(this, void 0, void 0, function* () {
			return solveRCaptcha_1.solveRCaptcha("https://discord.com/", "6Lef5iQTAAAAAKeIvIY-DeexoO3gj7ryl9rLMEnn", {
				agent: (_a = this.proxy) === null || _a === void 0 ? void 0 : _a.agent,
				timeout: 300,
				clientKey: "rd3q6tvJ4tXT1ZrK56fYr9Pjxtvbo9ff4vCkl6yloJ2lrJSZmJyioqSinK+eqJ8=",
			});
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
				} catch (e) {
					error = e;
					console.error("discord register error: ", error);
					if (error && error.captcha_key) {
						captcha_key = yield this.solveCaptcha();
					} else if (error && error.retry_after) {
						yield Util_1.sleep(error.retry_after * 1000);
					} else {
						throw error;
					}
				}
			} while (error);
		});
	}
	register(emailverify = true) {
		var _a, _b;
		return __awaiter(this, void 0, void 0, function* () {
			const self = this;
			yield this.intialized;
			console.log("register");
			function reg(captcha_key) {
				var _a;
				return __awaiter(this, void 0, void 0, function* () {
					return yield self.fetch("/auth/register", {
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
			var { token } = yield this.repeatAction(reg);
			this.token = token;
			if (this.emailProvider && emailverify) {
				console.log("wait for mail");
				const mail = yield this.emailProvider.waitFor((mail) => {
					var _a;
					return (
						mail.recipient === ((_a = this.emailProvider) === null || _a === void 0 ? void 0 : _a.email) &&
						mail.sender === "noreply@discordapp.com"
					);
				});
				let link = (_a = mail.text.match(/https:.+/g)) === null || _a === void 0 ? void 0 : _a[0];
				const res = yield node_fetch_1.default(link, {
					redirect: "manual",
					agent: (_b = this.proxy) === null || _b === void 0 ? void 0 : _b.agent,
				});
				if (res.status >= 400) throw "email verify link not working";
				const href = res.headers.get("location");
				const emailtoken = href.split("=")[1];
				console.log("verify email");
				function verify(captcha_key) {
					return self.fetch("/auth/verify", { body: { captcha_key, token: emailtoken } });
				}
				yield this.repeatAction(verify);
				console.log("account sucessfully registered and email verified");
			} else {
				console.log("guest account sucessfully registered");
			}
			yield this.uploadAvatar().catch();
		});
	}
	login() {
		return __awaiter(this, void 0, void 0, function* () {});
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
			invite = invite.split("/").last();
			return this.fetch(`/invites/${invite}`, { method: "POST" });
		});
	}
	close() {
		var _a;
		return __awaiter(this, void 0, void 0, function* () {
			yield (_a = this.emailProvider) === null || _a === void 0 ? void 0 : _a.close();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGlzY29yZEFjY291bnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvRGlzY29yZEFjY291bnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMkRBQTZCO0FBQzdCLHVDQUFvRDtBQUNwRCxpQ0FBNkU7QUFDN0UsK0NBQXdDO0FBQ3hDLHVDQUFvRDtBQUVwRCwyREFBd0Q7QUFDeEQsNERBQStCO0FBQy9CLDBEQUFpQztBQU9qQyxNQUFhLGNBQWUsU0FBUSxpQkFBTztJQTBCMUMsWUFBWSxLQUE0QjtRQUN2QyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFQTixnQkFBVyxHQUFXLGtDQUFrQyxDQUFDO1FBUWhFLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQy9CLENBQUM7SUFFRCxJQUFJLGFBQWE7UUFDaEIsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXO1lBQUUsT0FBTztRQUM5QixPQUFPLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUM7SUFDN0csQ0FBQztJQUVELElBQUksc0JBQXNCO1FBQ3pCLE9BQU8scUJBQWMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBRUssSUFBSTs7O1lBQ1QsTUFBTSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztZQUM5QixPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxRQUFFLElBQUksQ0FBQyxhQUFhLDBDQUFFLElBQUksR0FBRyxDQUFDLENBQUM7O0tBQzVGO0lBRUssVUFBVTs7WUFDZixJQUFJLENBQUMsSUFBSSxDQUFD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
