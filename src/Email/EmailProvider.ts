import { EventEmitter } from "events";
import { Email } from "./Email";

export class EmailProvider extends EventEmitter {
	constructor(public readonly username: string, public readonly provider: string) {
		super();
	}

	init(): any | Promise<any> {}
	close(): any | Promise<any> {}

	get email() {
		return `${this.username}@${this.provider}`;
	}

	async waitFor(filter: (email: Email) => boolean, opts?: { timeout: number }): Promise<Email> {
		return new Promise((res, rej) => {
			this.on("NEW_MAIL", m);
			function m(mail: Email) {
				try {
					if (filter(mail)) {
						return res(mail);
					}
				} catch (error) {
					console.error(error);
				}
			}
			setTimeout(() => {
				this.off("NEW_MAIL", m);
				return rej(new Error("Timeout for email"));
			}, 1000 * (opts?.timeout || 30));
		});
	}
}
