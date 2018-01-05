declare class LoadingManager {
    onStart: any;
    onLoad: any;
    onProgress: any;
    onError: any;
    isLoading: any;
    itemsLoaded: any;
    itemsTotal: any;
    urlModifier: any;
    constructor(onLoad?: any, onProgress?: any, onError?: any);
    itemStart(url: any): void;
    itemEnd(url: any): void;
    itemError(url: any): void;
    resolveURL(url: any): any;
    setURLModifier(transform: any): this;
}
declare var DefaultLoadingManager: LoadingManager;
export { LoadingManager, DefaultLoadingManager };
