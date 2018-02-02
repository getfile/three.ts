/**
 * @author mrdoob / http://mrdoob.com/
 */

import { RGBAFormat, RGBFormat } from '../constants';
import { ImageLoader } from './ImageLoader';
import { Texture } from '../textures/Texture';
import { defaultLoadingManager, LoadingManager } from './LoadingManager';


class TextureLoader
{
    manager: LoadingManager;
    crossOrigin: string;
    path: string;

    constructor( manager?: LoadingManager )
    {
        this.manager = ( manager !== undefined ) ? manager : defaultLoadingManager;
        this.crossOrigin = 'Anonymous';
    }

    load( url: string, onLoad?: Function, onProgress?: Function, onError?: Function ): Texture
    {
        var texture = new Texture();

        var loader = new ImageLoader( this.manager );
        loader.setCrossOrigin( this.crossOrigin );
        loader.setPath( this.path );
        loader.load( url, ( image ) =>
        {
            texture.image = image;

            // JPEGs can't have an alpha channel, so memory can be saved by storing them as RGB.
            var isJPEG = url.search( /\.(jpg|jpeg)$/ ) > 0 || url.search( /^data\:image\/jpeg/ ) === 0;
            texture.format = isJPEG ? RGBFormat : RGBAFormat;
            texture.needsUpdate = true;

            if ( onLoad !== undefined )
                onLoad( texture );
        }, onProgress, onError );

        return texture;
    }

    setCrossOrigin( value: string ): TextureLoader
    {
        this.crossOrigin = value;
        return this;
    }

    setPath( value: string ): TextureLoader
    {
        this.path = value;
        return this;
    }

}

export { TextureLoader };
