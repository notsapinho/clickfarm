import { ProxyManager } from "./ProxyManager";
export declare class Tor extends ProxyManager {
    private process?;
    private intalized;
    constructor(port: number);
    static get available(): number;
    init(): Promise<void>;
    release(): Promise<this>;
}
//# sourceMappingURL=Tor.d.ts.map