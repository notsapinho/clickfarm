import { EmailProvider } from "../Email/EmailProvider";
export declare type AccountOptions = {
    emailProvider?: EmailProvider;
    password?: string;
    username?: string;
    avatar?: string;
    dateofbirth?: Date;
};
export declare abstract class Account {
    emailProvider?: EmailProvider;
    password?: string;
    username?: string;
    avatar?: string;
    dateofbirth?: Date;
    constructor(props: AccountOptions);
    get stringofbirth(): string | undefined;
    get objectofbirth(): {
        month: number;
        day: number;
        year: number;
    } | undefined;
    register(): Promise<void>;
    login(): Promise<void>;
    close(): Promise<void>;
}
//# sourceMappingURL=Account.d.ts.map