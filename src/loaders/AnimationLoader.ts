import { AnimationClip } from '../animation/AnimationClip.js';
import { FileLoader } from './FileLoader.js';
import { defaultLoadingManager, LoadingManager } from './LoadingManager.js';

/**
 * @author bhouston / http://clara.io/
 */

class AnimationLoader
{
    manager: LoadingManager;

    constructor(manager: LoadingManager)
    {
        this.manager = (manager !== undefined) ? manager : defaultLoadingManager;
    }

    load(url, onLoad, onProgress, onError)
    {
        var loader = new FileLoader(this.manager);
        loader.load(url, (text) =>
        {
            onLoad(this.parse(JSON.parse(text)));
        }, onProgress, onError);
    }

    parse(json, onLoad)
    {
        var animations = [];
        for (var i = 0; i < json.length; i++)
        {
            var clip = AnimationClip.parse(json[i]);
            animations.push(clip);
        }

        onLoad(animations);
    }

}


export { AnimationLoader };
