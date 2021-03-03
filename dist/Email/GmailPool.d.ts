/// <reference types="node" />
import { EventEmitter } from "events";
import { Email } from "./Email";
import { EmailProvider } from "./EmailProvider";
import { GmailProvider } from "./GmailProvider";
export declare class GmailDummyProvider extends EmailProvider {
    private gmail;
    constructor(gmail: GmailProvider, username: string);
    init(): void;
    newMail: (mail: Email) => void;
    close(): void;
}
export declare class GmailPool extends EventEmitter {
    private provider;
    constructor(username: string, password: string);
    init(): Promise<void>;
    getProvider(username?: string): GmailDummyProvider;
    close(): Promise<any>;
}
//# sourceMappingURL=GmailPool.d.ts.map