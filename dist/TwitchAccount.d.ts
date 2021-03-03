import { Account, AccountOptions } from "./Account";
import { RequestOptions } from "./request";
export declare type TwitchAccountOptions = AccountOptions;
export declare class TwitchAccount extends Account {
    static client_id: string;
    useragent: string;
    protected intialized: Promise<any>;
    cookies: any;
    constructor(opts: TwitchAccountOptions);
    getCookies(): string;
    fetch(url: string, opts?: RequestOptions): Promise<void>;
    init(): Promise<void>;
    register(): Promise<void>;
    login(): Promise<void>;
    close(): Promise<void>;
    static getRandomId(): string;
}
//# sourceMappingURL=TwitchAccount.d.ts.map