import { Font } from '../extras/core/Font';
import { FileLoader } from './FileLoader';
import { defaultLoadingManager } from './LoadingManager';

/**
 * @author mrdoob / http://mrdoob.com/
 */

class FontLoader
{
    manager;
    path: string;

    constructor( manager )
    {
        this.manager = ( manager !== undefined ) ? manager : defaultLoadingManager;
    }

    load( url, onLoad, onProgress, onError )
    {
        var loader = new FileLoader( this.manager );
        loader.setPath( this.path );
        loader.load( url, ( text ) =>
        {
            var json;
            try
            {
                json = JSON.parse( text );
            } catch ( e )
            {
                console.warn( 'THREE.FontLoader: typeface support is being deprecated. Use typefaceon instead.' );
                json = JSON.parse( text.substring( 65, text.length - 2 ) );
            }

            var font = this.parse( json );
            if ( onLoad ) onLoad( font );
        }, onProgress, onError );
    }

    parse( json )
    {
        return new Font( json );
    }

    setPath( value )
    {
        this.path = value;
        return this;
    }

}


export { FontLoader };
