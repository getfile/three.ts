declare class Cache {
    static enabled: boolean;
    static files: {};
    static add(key: any, file: any): void;
    static get(key: any): any;
    static remove(key: any): void;
    static clear(): void;
}
export { Cache };
