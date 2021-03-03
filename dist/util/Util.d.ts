declare global {
    interface Array<T> {
        remove(o: T): Array<T>;
        flat(): T;
        first(): T;
        last(): T;
        random(): T;
        unique(): T[];
        shuffle(): T[];
        insert(i: number, elem: T): T[];
    }
}
export declare function init(): void;
export declare function objectAsBase64(e: any): string;
export declare function sleep(ms: number): Promise<unknown>;
export declare function sleepRandom(min: number, max: number): Promise<unknown>;
export declare function tempDir(): Promise<string>;
export declare function makeid(length: number): string;
export declare function randomUserAgent(): string;
export declare function randomAvatar(): string;
export declare function randomUsername(): string;
//# sourceMappingURL=Util.d.ts.map