declare class Cache {
    enabled: any;
    files: any;
    constructor();
    add(key: any, file: any): void;
    get(key: any): any;
    remove(key: any): void;
    clear(): void;
}
export { Cache };
