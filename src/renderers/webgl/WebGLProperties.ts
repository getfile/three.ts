import { Object3D } from "../../core/Object3D";
import { EventDispatcher } from "../../core/EventDispatcher";

/**
 * @author fordacious / fordacious.github.io
 */

class WebGLProperties
{
    properties;

    constructor()
    {
        this.properties = {};
    }

    get(object: EventDispatcher)
    {
        var uuid = object.uuid;
        var map = this.properties[uuid];

        if (map === undefined)
        {
            map = {};
            this.properties[uuid] = map;
        }

        return map;
    }

    remove(object: EventDispatcher)
    {
        delete this.properties[object.uuid];
    }

    clear()
    {
        this.properties = {};
    }


}


export { WebGLProperties };
