/// <reference types="node" />
import { EventEmitter } from "events";
import { ProxyManager } from "./ProxyManager";
export declare class ProxyPool extends EventEmitter {
    private holds;
    private poolSize;
    private used;
    private free;
    private portCounter;
    constructor(holds: typeof ProxyManager, poolSize?: number);
    init(): Promise<void>;
    createProxy(): Promise<ProxyManager>;
    handleProxy(proxy: ProxyManager): Promise<ProxyManager>;
    getProxy(): Promise<ProxyManager>;
}
//# sourceMappingURL=ProxyPool.d.ts.map