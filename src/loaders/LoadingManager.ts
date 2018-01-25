/**
 * @author mrdoob / http://mrdoob.com/
 */

class LoadingManager
{
    onStart: Function;
    onLoad: Function;
    onProgress: Function;
    onError: Function;
    urlModifier: Function;

    isLoading: boolean;

    itemsLoaded: number; //item num
    itemsTotal: number; //item count

    constructor(onLoad?: Function, onProgress?: Function, onError?: Function)
    {
        this.isLoading = false;
        this.itemsLoaded = 0;
        this.itemsTotal = 0;
        this.urlModifier = undefined;

        this.onStart = undefined;
        this.onLoad = onLoad;
        this.onProgress = onProgress;
        this.onError = onError;
    }

    //loader start
    itemStart(url: string)
    {
        this.itemsTotal++;
        if (this.isLoading === false)
        {
            if (this.onStart !== undefined)
                this.onStart(url, this.itemsLoaded, this.itemsTotal);
        }
        this.isLoading = true;
    }

    //loader over
    itemEnd(url: string)
    {
        this.itemsLoaded++;
        if (this.onProgress !== undefined)
            this.onProgress(url, this.itemsLoaded, this.itemsTotal);

        if (this.itemsLoaded === this.itemsTotal)
        {
            this.isLoading = false;
            if (this.onLoad !== undefined)
                this.onLoad();
        }
    }

    //loader error
    itemError(url: string)
    {
        if (this.onError !== undefined)
            this.onError(url);
    }

    resolveURL(url: string): string
    {
        if (this.urlModifier)
            return this.urlModifier(url);
        return url;
    }

    setURLModifier(transform: Function): LoadingManager
    {
        this.urlModifier = transform;
        return this;
    }

}

let defaultLoadingManager = new LoadingManager();


export { LoadingManager, defaultLoadingManager };
