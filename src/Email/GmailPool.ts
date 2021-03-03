import { EventEmitter } from "events";
import { makeid } from "../util/Util";
import { Email } from "./Email";
import { EmailProvider } from "./EmailProvider";
import { GmailProvider } from "./GmailProvider";

export class GmailDummyProvider extends EmailProvider {
	constructor(private gmail: GmailProvider, username: string) {
		super(username, "gmail.com");
		this.init();
	}

	init() {
		this.gmail.on("NEW_MAIL", this.newMail);
		this.gmail.on("CLOSE", this.close);
	}

	newMail = (mail: Email) => {
		this.emit("NEW_MAIL", mail);
	};

	close() {
		this.gmail.off("CLOSE", this.close);
		this.gmail.off("NEW_MAIL", this.newMail);
	}
}

export class GmailPool extends EventEmitter {
	private provider: GmailProvider;
	constructor(username: string, password: string) {
		super();
		this.provider = new GmailProvider(username, password);
	}

	async init() {
		return this.provider.init();
	}

	getProvider(username?: string) {
		if (username) return new GmailDummyProvider(this.provider, username);
		const id = makeid(5);
		const name = this.provider.username;
		// .split("")
		// .map((x) => (Math.random() > 0.5 ? x + "." : x))
		// .join("");
		return new GmailDummyProvider(this.provider, `${name}+${id}`);
	}

	async close() {
		this.emit("CLOSE");
		return this.provider.close();
	}
}
