import { Account, AccountOptions } from "./Account";
import { RequestOptions } from "./request";
export declare type DiscordAccountOptions = AccountOptions & {
    token?: string;
};
export declare type DiscordFetchOptions = RequestOptions & {
    context?: any;
};
export declare class DiscordAccount extends Account {
    protected token?: string;
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
    private client_uuid;
    private science_token;
    constructor(props: DiscordAccountOptions);
    get stringofbirth(): string | undefined;
    get xSuperPropertiesBase64(): string;
    fetch(path: string, opts?: DiscordFetchOptions): Promise<any>;
    science(type: string, properties: any): Promise<any>;
    init(): Promise<void[]>;
    initFingerprint(): Promise<void>;
    initBrowserAgent(): Promise<void>;
    register(): Promise<void>;
    login(): Promise<void>;
}
//# sourceMappingURL=Discord.d.ts.map