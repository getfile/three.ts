declare class Cache {
    private static enabled;
    private static files;
    static add(key: string, file: any): void;
    static get(key: any): any;
    static remove(key: any): void;
    static clear(): void;
}
export { Cache };
