import { EmailProvider } from "./EmailProvider";
export declare class GmailProvider extends EmailProvider {
    client: any;
    constructor(username: string, password: string);
    init(): Promise<void>;
    newMessage: (path: string, type: string, value: string) => Promise<void>;
    close(): Promise<any>;
}
//# sourceMappingURL=GmailProvider.d.ts.map