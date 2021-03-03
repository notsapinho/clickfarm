import { Account, AccountOptions } from "./Account";
import { RequestOptions } from "./request";
import { ProxyManager } from "./Proxy/ProxyManager";
export declare type DiscordAccountOptions = AccountOptions & {
    token?: string;
    proxy?: ProxyManager;
};
export declare type DiscordFetchOptions = RequestOptions & {
    context?: any;
};
export declare class DiscordAccount extends Account {
    token?: string;
    protected fingerprint: string;
    protected intialized: Promise<any>;
    protected xSuperProperties: {
        browser: string;
        browser_user_agent: string;
        browser_version: string;
        client_build_number: number;
        client_event_source: null;
        device: string;
        os: string;
        os_version: string;
        referrer: string;
        referrer_current: string;
        referring_domain: string;
        referring_domain_current: string;
        release_channel: string;
    };
    protected useragent: string;
    private client_uuid;
    private science_token;
    protected avatar?: string;
    protected avatarBase64?: string;
    protected proxy?: ProxyManager;
    constructor(props: DiscordAccountOptions);
    get stringofbirth(): string | undefined;
    get xSuperPropertiesBase64(): string;
    init(): Promise<[void, void, void | undefined]>;
    initAvatar(): Promise<void>;
    initFingerprint(): Promise<void>;
    initBrowserAgent(): Promise<void>;
    fetch(path: string, opts?: DiscordFetchOptions): Promise<any>;
    science(type: string, properties: any): Promise<any>;
    solveCaptcha(): Promise<string>;
    repeatAction(func: Function): Promise<any>;
    register(emailverify?: boolean): Promise<void>;
    login(): Promise<void>;
    uploadAvatar(): Promise<any>;
    sendFriendRequest(tag: string): Promise<any>;
    removeFriend(id: string): Promise<any>;
    directMessage(userid: string, text: string): Promise<any>;
    sendMessage(channelid: string, content: string): Promise<any>;
    fetchMessages(channelid: string): Promise<any>;
    addReaction(channelid: string, messageid: string, emoji: string): Promise<any>;
    setHypesquad(house_id: 1 | 2 | 3): Promise<any>;
    leaveServer(id: string): Promise<any>;
    joinServer(invite: string): Promise<any>;
    close(): Promise<void>;
}
//# sourceMappingURL=DiscordAccount.d.ts.map