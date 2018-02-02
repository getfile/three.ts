/**
 * @author mrdoob / http://mrdoob.com/
 */

/**加载管理 */
class LoadingManager
{
    onStart: Function;
    onLoad: Function;
    onProgress: Function;
    onError: Function;
    /** 地址转换器 */
    urlModifier: Function;
    /**是否有资源正在加载 */
    isLoading: boolean;
    itemsLoaded: number; //item num
    itemsTotal: number; //item total

    constructor( onLoad?: Function, onProgress?: Function, onError?: Function )
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
    itemStart( url: string )
    {
        this.itemsTotal++;
        if ( this.isLoading === false )
        {
            if ( this.onStart !== undefined )
                this.onStart( url, this.itemsLoaded, this.itemsTotal );
        }
        this.isLoading = true;
    }

    //loader over
    itemEnd( url: string )
    {
        this.itemsLoaded++;
        if ( this.onProgress !== undefined )
            this.onProgress( url, this.itemsLoaded, this.itemsTotal );

        if ( this.itemsLoaded === this.itemsTotal )
        {
            this.isLoading = false;
            if ( this.onLoad !== undefined )
                this.onLoad();
        }
    }

    //loader error
    itemError( url: string )
    {
        if ( this.onError !== undefined )
            this.onError( url );
    }

    /**地址转换 */
    resolveURL( url: string ): string
    {
        if ( this.urlModifier )
            return this.urlModifier( url );
        return url;
    }

    /**设置地址转换器 */
    setURLModifier( transform: Function ): LoadingManager
    {
        this.urlModifier = transform;
        return this;
    }

}

let defaultLoadingManager = new LoadingManager();


export { LoadingManager, defaultLoadingManager };
