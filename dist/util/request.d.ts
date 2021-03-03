/// <reference types="node" />
import { Agent } from "http";
export declare type RequestOptions = {
    headers?: {
        [key: string]: string;
    };
    method?: "POST" | "GET" | "PUT" | "PATCH" | "DELETE" | "HEAD" | "TRACE" | "OPTIONS" | "CONNECT";
    body?: any;
    timeout?: number;
    size?: number;
    follow?: number;
    compress?: boolean;
    agent?: Agent;
    signal?: AbortSignal | null;
    res?: boolean;
};
export declare function request(url: string, opts?: RequestOptions): Promise<any>;
//# sourceMappingURL=request.d.ts.map