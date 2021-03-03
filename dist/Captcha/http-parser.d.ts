export var methods: string[];
export function HTTPParser(type: any): void;
export class HTTPParser {
    constructor(type: any);
    initialize(type: any, async_resource: any): void;
    type: any;
    state: string | undefined;
    info: {
        headers: never[];
        upgrade: boolean;
    } | undefined;
    trailers: any[] | undefined;
    line: string | undefined;
    isChunked: boolean | undefined;
    connection: string | undefined;
    headerSize: number | undefined;
    body_bytes: number | null | undefined;
    isUserCall: boolean | undefined;
    hadError: boolean | undefined;
    reinitialize: typeof HTTPParser;
    close: () => void;
    pause: () => void;
    resume: () => void;
    free(): void;
    _compatMode0_11: boolean;
    getAsyncId(): number;
    execute(chunk: any, start: any, length: any): any;
    chunk: any;
    offset: any;
    end: any;
    finish(): Error | undefined;
    consume: () => void;
    unconsume: () => void;
    getCurrentBuffer(): void;
    userCall(): (ret: any) => any;
    nextRequest(): void;
    consumeLine(): any;
    parseHeader(line: any, headers: any): void;
    REQUEST_LINE(): void;
    RESPONSE_LINE(): void;
    shouldKeepAlive(): boolean;
    HEADER(): boolean | undefined;
    BODY_CHUNKHEAD(): void;
    BODY_CHUNK(): void;
    BODY_CHUNKEMPTYLINE(): void;
    BODY_CHUNKTRAILERS(): void;
    BODY_RAW(): void;
    BODY_SIZED(): void;
}
export namespace HTTPParser {
    const encoding: string;
    const maxHeaderSize: number;
    const REQUEST: string;
    const RESPONSE: string;
    const kOnHeaders: number;
    const kOnHeadersComplete: number;
    const kOnBody: number;
    const kOnMessageComplete: number;
    const kOnExecute: number;
    const methods: string[];
}
//# sourceMappingURL=http-parser.d.ts.map