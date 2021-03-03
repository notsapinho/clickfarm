import { ProxyManager } from "./ProxyManager";
export declare class MobileProxy extends ProxyManager {
    private server;
    private static count;
    constructor();
    static get available(): number;
    init(): Promise<unknown>;
    release(): Promise<this>;
    close(): Promise<void>;
}
//# sourceMappingURL=MobileProxy.d.ts.map