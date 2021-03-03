import { solveCaptcha } from "../Captcha/solveCaptcha";
import fs from "fs/promises";
import { Account, AccountOptions } from "./Account";
import { objectAsBase64, randomUserAgent, sleep, sleepRandom } from "../util/Util";
import { UAParser } from "ua-parser-js";
import { request, RequestOptions } from "../util/request";
import fetch from "node-fetch";
import FileType from "file-type";
import { ProxyManager } from "../Proxy/ProxyManager";
import { getAnticaptchaToken } from "../Captcha/getAnticaptchaToken";
import "missing-native-js-functions";
// const ac = require("../Captcha/anticaptcha");
const ac = require("@antiadmin/anticaptchaofficial");

export type DiscordAccountOptions = AccountOptions & { token?: string; proxy?: ProxyManager; init?: boolean };

export type DiscordFetchOptions = RequestOptions & { context?: any };

export class DiscordAccount extends Account {
	token?: string;
	fingerprint: string;
	intialized: Promise<any>;
	xSuperProperties: {
		browser: string;
		browser_user_agent: string;
		browser_version: string;
		client_build_number: number;
		client_event_source: null;
		device: string; //"";
		os: string;
		os_version: string;
		referrer: string; //"";
		referrer_current: string; //"";
		referring_domain: string; //"";
		referring_domain_current: string; //"";
		release_channel: string; //"stable";
	};
	useragent: string;
	client_uuid: string = "MgDGI4DI4grrNxdWS7fyLXYBAAABAAAA";
	science_token: string;
	avatarBase64?: string;
	proxy?: ProxyManager;

	constructor(props: DiscordAccountOptions) {
		super(props);
		if (props.init !== false) this.intialized = this.init();
	}

	get stringofbirth() {
		if (!this.dateofbirth) return;
		return `${this.dateofbirth.getFullYear()}-${this.dateofbirth.getMonth() + 1}-${this.dateofbirth.getDate()}`;
	}

	get xSuperPropertiesBase64() {
		return objectAsBase64(this.xSuperProperties);
	}

	async init() {
		this.initBrowserAgent();
		return Promise.all([this.initFingerprint(), this.initAvatar(), this.emailProvider?.init()]);
	}

	async initAvatar() {
		if (!this.avatar) return;
		try {
			let buffer: Buffer;
			if (this.avatar.startsWith("http")) {
				const request = await fetch(this.avatar);
				buffer = await request.buffer();
			} else {
				buffer = <Buffer>(<unknown>await fs.readFile(this.avatar, { encoding: "binary" }));
			}
			const filetype = await FileType.fromBuffer(buffer);
			if (!filetype || !buffer) return;
			this.avatarBase64 = `data:${filetype.mime};base64,${buffer.toString("base64")}`;
		} catch (error) {
			console.error("error getting avatar for " + this.avatar, error);
		}
	}

	async initFingerprint() {
		const { fingerprint } = await this.fetch("/experiments", { context: { location: "Register" } });
		this.fingerprint = fingerprint;
	}

	initBrowserAgent() {
		this.useragent = randomUserAgent();
		const uaparser = new UAParser(this.useragent);
		const browser = uaparser.getBrowser();
		const os = uaparser.getOS();

		this.xSuperProperties = {
			browser: <string>browser.name,
			browser_user_agent: this.useragent,
			browser_version: <string>browser.version,
			referrer: "",
			referrer_current: "",
			referring_domain: "",
			referring_domain_current: "",
			release_channel: "stable",
			client_build_number: 72071,
			client_event_source: null,
			device: "",
			os: <string>os.name,
			os_version: <string>os.version,
		};
	}

	async fetch(path: string, opts?: DiscordFetchOptions) {
		const url = "https://discord.com/api/v8" + path;
		if (!opts) opts = {};
		if (!opts.headers) opts.headers = {};
		if (opts.context) opts.headers["x-context-properties"] = objectAsBase64(opts.context);
		if (this.fingerprint) opts.headers["x-fingerprint"] = this.fingerprint;
		if (this.useragent) opts.headers["user-agent"] = this.useragent;
		if (this.token) opts.headers["authorization"] = this.token;
		if (this.proxy) opts.agent = this.proxy.agent;

		opts.headers = {
			...opts.headers,
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
		};

		return request(url, opts);
	}

	async science(type: string, properties: any) {
		// "mktg_page_viewed"
		let body: any = {
			// @ts-ignore
			events: [
				{
					type: type,
					properties: {
						client_track_timestamp: Math.floor(Date.now() - Math.random() * 500 + 500),
						client_uuid: this.client_uuid,
						client_send_timestamp: Date.now(),
						...properties,
					},
				},
			],
		};
		if (this.science_token) body.science_token = this.science_token;

		return this.fetch("/science", { body });
	}

	async solveCaptcha() {
		return solveCaptcha("https://discord.com/", "6Lef5iQTAAAAAKeIvIY-DeexoO3gj7ryl9rLMEnn", {
			agent: this.proxy?.agent,
			timeout: 300,
		});

		ac.setAPIKey(getAnticaptchaToken());
		return ac.solveRecaptchaV2Proxyless("https://discord.com/", "6Lef5iQTAAAAAKeIvIY-DeexoO3gj7ryl9rLMEnn");
	}

	async repeatAction(func: Function) {
		let error;
		let captcha_key = null;
		do {
			try {
				error = null;
				return await func(captcha_key);
			} catch (e) {
				error = e;
				if (error && error.captcha_key) {
					captcha_key = await this.solveCaptcha();
				} else if (error && error.retry_after) {
					await sleep(error.retry_after * 1000);
				} else {
					throw error;
				}
			}
		} while (error);
	}

	async register(
		{ emailverify, invite }: { emailverify?: boolean; invite?: string } = { emailverify: true }
	): Promise<void> {
		const self = this;
		await this.intialized;
		console.log("register");
		var additionalOptions: any = {};
		if (self.emailProvider) additionalOptions.email = self.emailProvider.email;

		async function reg(captcha_key: string) {
			return await self.fetch("/auth/register", {
				body: {
					fingerprint: self.fingerprint,
					username: self.username,
					password: self.password,
					invite,
					consent: true,
					date_of_birth: self.stringofbirth,
					gift_code_sku_id: null,
					captcha_key,
					...additionalOptions,
				},
			});
		}
		var { token } = await this.repeatAction(reg);
		this.token = token;

		if (this.emailProvider && emailverify) {
			console.log("wait for mail");

			const mail = await this.emailProvider.waitFor(
				(email: any) =>
					email.recipient.equalsIgnoreCase(this.emailProvider?.email) &&
					email.sender === "noreply@discord.com"
			);
			await sleep(1000 * 30);
			let link = <string>mail.text.match(/https:.+/g)?.[0];

			const res = await fetch(link, { redirect: "manual", agent: this.proxy?.agent });
			if (res.status >= 400) throw "email verify link not working";
			const href = <string>res.headers.get("location");
			const emailtoken = href.split("=")[1];
			console.log("verify email");

			function verify(captcha_key: string) {
				return self.fetch("/auth/verify", { body: { captcha_key, token: emailtoken } });
			}

			await this.repeatAction(verify);
		} else {
			// guest account
		}

		console.log("sucessfully registered");
	}

	async login() {}

	async uploadAvatar() {
		return this.fetch("/users/@me", {
			body: {
				avatar: this.avatarBase64,
			},
			method: "PATCH",
		});
	}

	sendFriendRequest(tag: string) {
		const username = tag.split("#")[0];
		const discriminator = tag.split("#")[1];

		return this.fetch("/users/@me/relationships", {
			body: {
				username,
				discriminator,
			},
		});
	}

	removeFriend(id: string) {
		return this.fetch(`/users/@me/relationships/${id}`, {
			method: "DELETE",
		});
	}

	async directMessage(userid: string, text: string) {
		const { id } = await this.fetch(`/users/@me/channels`, {
			body: {
				recipients: [userid],
			},
		});
		return this.sendMessage(id, text);
	}

	async sendMessage(channelid: string, content: string) {
		return this.fetch(`/channels/${channelid}/messages`, {
			body: {
				content,
			},
		});
	}

	async fetchMessages(channelid: string) {
		return this.fetch(`/channels/${channelid}/messages?limit=50`);
	}

	async addReaction(channelid: string, messageid: string, emoji: string) {
		emoji = encodeURIComponent(emoji);
		return this.fetch(`/channels/${channelid}/messages/${messageid}/reactions/${emoji}/%40me`, {
			method: "PUT",
		});
	}

	async setHypesquad(house_id: 1 | 2 | 3) {
		return this.fetch("/hypesquad/online", { body: { house_id } });
	}

	async leaveServer(id: string) {
		return this.fetch(`/users/@me/guilds/${id}`, { method: "DELETE" });
	}

	async joinServer(invite: string) {
		const i = invite.split("/").last();
		return this.fetch(`/invites/${i}`, { method: "POST" });
	}

	async close() {
		await this.emailProvider?.close();
	}
}

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
