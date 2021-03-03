import { EmailProvider } from "./EmailProvider";
// @ts-ignore
import ImapClient from "emailjs-imap-client";
import { Email } from "./Email";
import { simpleParser } from "mailparser";

export class GmailProvider extends EmailProvider {
	public client: any;

	constructor(username: string, password: string) {
		super(username, "gmail.com");
		this.client = new ImapClient("imap.gmail.com", 993, {
			auth: { user: username, pass: password },
			useSecureTransport: true,
			logLevel: "info",
		});
		this.client.onerror = console.error;
		this.client.onupdate = this.newMessage;
	}

	async init() {
		await this.client.connect();
		await this.client.selectMailbox("INBOX");
	}

	newMessage = async (path: string, type: string, value: string) => {
		if (type !== "exists") return;
		const messages = await this.client.listMessages(path, value, ["envelope", "body[]"]);
		messages.forEach(async (message: any) => {
			const body = message["body[]"];
			const email = await simpleParser(body);

			const mail: Email = {
				html: <string>email.html,
				text: <string>email.text,
				recipient: <string>email.to?.value[0].address,
				sender: <string>email.from?.value[0].address,
				subject: <string>email.subject,
			};
			console.log("got mail from: " + mail.sender + " to: " + mail.recipient);
			this.emit("NEW_MAIL", mail);
		});
	};

	async close() {
		return this.client.close();
	}
}
