declare class LoadingManager {
    onStart: Function;
    onLoad: Function;
    onProgress: Function;
    onError: Function;
    urlModifier: Function;
    isLoading: boolean;
    itemsLoaded: number;
    itemsTotal: number;
    constructor(onLoad?: Function, onProgress?: Function, onError?: Function);
    itemStart(url: string): void;
    itemEnd(url: string): void;
    itemError(url: string): void;
    resolveURL(url: string): string;
    setURLModifier(transform: Function): LoadingManager;
}
declare let defaultLoadingManager: LoadingManager;
export { LoadingManager, defaultLoadingManager };
