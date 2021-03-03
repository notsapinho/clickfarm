/// <reference types="node" />
import { EventEmitter } from "events";
import { Email } from "./Email";
export declare class EmailProvider extends EventEmitter {
    readonly username: string;
    readonly provider: string;
    constructor(username: string, provider: string);
    init(): any | Promise<any>;
    close(): any | Promise<any>;
    get email(): string;
    waitFor(filter: (email: Email) => boolean, opts?: {
        timeout: number;
    }): Promise<Email>;
}
//# sourceMappingURL=EmailProvider.d.ts.map