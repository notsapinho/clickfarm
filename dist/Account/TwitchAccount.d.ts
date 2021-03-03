import { Account, AccountOptions } from "./Account";
import { RequestOptions } from "../util/request";
import { ProxyManager } from "../Proxy";
export declare type TwitchAccountOptions = AccountOptions & {
    proxy?: ProxyManager;
    access_token?: string;
};
export declare class TwitchAccount extends Account {
    static client_id: string;
    useragent: string;
    intialized: Promise<any>;
    cookies: any;
    access_token: string;
    proxy?: ProxyManager;
    user_id: string;
    constructor(opts: TwitchAccountOptions);
    getCookies(): string;
    fetch(url: string, opts?: RequestOptions): Promise<any>;
    init(): Promise<void>;
    getUserId(): Promise<string>;
    retry(options: any, func: () => Promise<any>): Promise<any>;
    login(): Promise<void>;
    static usernameAvailable(username: string): Promise<any>;
    register(): Promise<void>;
    changeProfilePicture(url: string): Promise<void>;
    close(): Promise<void>;
    static getRandomId(): string;
}
//# sourceMappingURL=TwitchAccount.d.ts.map