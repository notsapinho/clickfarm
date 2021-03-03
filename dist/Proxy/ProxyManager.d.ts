/// <reference types="node" />
import { Agent } from "agent-base";
import { EventEmitter } from "events";
export declare class ProxyManager extends EventEmitter {
    readonly protocol: string;
    readonly ip: string;
    readonly port: number;
    readonly agent: Agent;
    constructor(protocol: string, ip: string, port: number);
    static get available(): number;
    init(): Promise<any>;
    release(): Promise<ProxyManager>;
    close(): Promise<void>;
}
//# sourceMappingURL=ProxyManager.d.ts.map