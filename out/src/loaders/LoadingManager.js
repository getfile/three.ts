define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class LoadingManager {
        constructor(onLoad, onProgress, onError) {
            this.isLoading = false;
            this.itemsLoaded = 0;
            this.itemsTotal = 0;
            this.urlModifier = undefined;
            this.onStart = undefined;
            this.onLoad = onLoad;
            this.onProgress = onProgress;
            this.onError = onError;
        }
        itemStart(url) {
            this.itemsTotal++;
            if (this.isLoading === false) {
                if (this.onStart !== undefined)
                    this.onStart(url, this.itemsLoaded, this.itemsTotal);
            }
            this.isLoading = true;
        }
        itemEnd(url) {
            this.itemsLoaded++;
            if (this.onProgress !== undefined)
                this.onProgress(url, this.itemsLoaded, this.itemsTotal);
            if (this.itemsLoaded === this.itemsTotal) {
                this.isLoading = false;
                if (this.onLoad !== undefined)
                    this.onLoad();
            }
        }
        itemError(url) {
            if (this.onError !== undefined)
                this.onError(url);
        }
        resolveURL(url) {
            if (this.urlModifier)
                return this.urlModifier(url);
            return url;
        }
        setURLModifier(transform) {
            this.urlModifier = transform;
            return this;
        }
    }
    exports.LoadingManager = LoadingManager;
    var DefaultLoadingManager = new LoadingManager();
    exports.DefaultLoadingManager = DefaultLoadingManager;
});
//# sourceMappingURL=LoadingManager.js.map