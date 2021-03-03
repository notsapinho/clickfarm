import { Account, AccountOptions } from "./Account";
import { RequestOptions } from "../util/request";
import { ProxyManager } from "../Proxy/ProxyManager";
import "missing-native-js-functions";
export declare type DiscordAccountOptions = AccountOptions & {
    token?: string;
    proxy?: ProxyManager;
    init?: boolean;
};
export declare type DiscordFetchOptions = RequestOptions & {
    context?: any;
};
export declare class DiscordAccount extends Account {
    token?: string;
    fingerprint: string;
    intialized: Promise<any>;
    xSuperProperties: {
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
    useragent: string;
    client_uuid: string;
    science_token: string;
    avatarBase64?: string;
    proxy?: ProxyManager;
    constructor(props: DiscordAccountOptions);
    get stringofbirth(): string | undefined;
    get xSuperPropertiesBase64(): string;
    init(): Promise<[void, void, any]>;
    initAvatar(): Promise<void>;
    initFingerprint(): Promise<void>;
    initBrowserAgent(): void;
    fetch(path: string, opts?: DiscordFetchOptions): Promise<any>;
    science(type: string, properties: any): Promise<any>;
    solveCaptcha(): Promise<any>;
    repeatAction(func: Function): Promise<any>;
    register({ emailverify, invite }?: {
        emailverify?: boolean;
        invite?: string;
    }): Promise<void>;
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