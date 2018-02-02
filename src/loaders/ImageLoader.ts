/**
 * @author mrdoob / http://mrdoob.com/
 */

import { Cache } from './Cache';
import { defaultLoadingManager, LoadingManager } from './LoadingManager';


class ImageLoader
{
    manager: LoadingManager;
    crossOrigin: string;
    path: string;

    constructor( manager: LoadingManager )
    {
        this.manager = ( manager !== undefined ) ? manager : defaultLoadingManager;
        this.crossOrigin = 'Anonymous';
    }

    load( url: string, onLoad: Function, onProgress: Function, onError: Function ): HTMLImageElement
    {
        if ( url === undefined ) url = '';
        if ( this.path !== undefined ) url = this.path + url;

        url = this.manager.resolveURL( url );
        var cached = Cache.get( url );
        if ( cached !== undefined ) //文件已经加载过
        {
            this.manager.itemStart( url );
            setTimeout( () =>
            {
                if ( onLoad ) onLoad( cached );
                this.manager.itemEnd( url );
            }, 0 );

            return cached;
        }

        var image: HTMLImageElement = document.createElementNS( 'http://www.w3.org/1999/xhtml', 'img' ) as HTMLImageElement;
        image.addEventListener( 'load', () =>
        {
            Cache.add( url, image );
            if ( onLoad ) onLoad( image );
            this.manager.itemEnd( url );
        }, false );

		/*
		 * image.addEventListener( 'progress', function ( event ) {
		 * 
		 * if ( onProgress ) onProgress( event );
		 *  }, false );
		 */
        image.addEventListener( 'error', ( event ) =>
        {
            if ( onError ) onError( event );
            this.manager.itemEnd( url );
            this.manager.itemError( url );
        }, false );

        if ( url.substr( 0, 5 ) !== 'data:' )
        {
            if ( this.crossOrigin !== undefined )
                image.crossOrigin = this.crossOrigin;
        }

        this.manager.itemStart( url );
        image.src = url;
        return image;
    }

    setCrossOrigin( value: string ): ImageLoader
    {
        this.crossOrigin = value;
        return this;
    }

    setPath( value: string ): ImageLoader
    {
        this.path = value;
        return this;
    }

}


export { ImageLoader };
