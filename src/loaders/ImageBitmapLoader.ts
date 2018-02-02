/**
 * @author thespite / http://clicktorelease.com/
 */

import { Cache } from './Cache.js';
import { defaultLoadingManager } from './LoadingManager.js';


class ImageBitmapLoader
{
    manager;
    options;
    path;

    constructor( manager )
    {
        if ( typeof createImageBitmap === 'undefined' )
            console.warn( 'THREE.ImageBitmapLoader: createImageBitmap() not supported.' );
        if ( typeof fetch === 'undefined' )
            console.warn( 'THREE.ImageBitmapLoader: fetch() not supported.' );

        this.manager = manager !== undefined ? manager : defaultLoadingManager;
        this.options = undefined;
    }

    setOptions( options ): ImageBitmapLoader
    {
        this.options = options;
        return this;
    }

    load( url: string, onLoad: Function, onProgress: Function, onError: Function )
    {
        if ( url === undefined ) url = '';
        if ( this.path !== undefined ) url = this.path + url;

        var cached = Cache.get( url );
        if ( cached !== undefined )
        {
            this.manager.itemStart( url );
            setTimeout( () =>
            {
                if ( onLoad ) onLoad( cached );
                this.manager.itemEnd( url );
            }, 0 );
            return cached;
        }

        fetch( url ).then( ( res ) =>
        {
            return res.blob();
        } ).then( ( blob ) =>
        {
            return createImageBitmap( blob, this.options );
        } ).then( ( imageBitmap ) =>
        {
            Cache.add( url, imageBitmap );
            if ( onLoad ) onLoad( imageBitmap );
            this.manager.itemEnd( url );
        } ).catch( ( e ) =>
        {
            if ( onError ) onError( e );
            this.manager.itemEnd( url );
            this.manager.itemError( url );
        } );
    }

    setCrossOrigin( /* value */ ): ImageBitmapLoader
    {
        return this;
    }

    setPath( value ): ImageBitmapLoader
    {
        this.path = value;
        return this;
    }

}

export { ImageBitmapLoader };
