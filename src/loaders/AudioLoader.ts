import { AudioContext } from '../audio/AudioContext';
import { FileLoader } from './FileLoader';
import { defaultLoadingManager, LoadingManager } from './LoadingManager';

/**
 * @author Reece Aaron Lecrivain / http://reecenotes.com/
 */

class AudioLoader
{
    manager: LoadingManager;

    constructor( manager: LoadingManager )
    {
        this.manager = ( manager !== undefined ) ? manager : defaultLoadingManager;
    }

    load( url: string, onLoad: Function, onProgress: Function, onError: Function )
    {
        var loader = new FileLoader( this.manager );
        loader.setResponseType( 'arraybuffer' );
        loader.load( url, ( buffer ) =>
        {
            var context = AudioContext.getContext();
            context.decodeAudioData( buffer, ( audioBuffer ) =>
            {
                onLoad( audioBuffer );
            } );
        }, onProgress, onError );
    }

}


export { AudioLoader };
