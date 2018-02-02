import { BufferGeometry } from "../../core/BufferGeometry";

/**
 * @author mrdoob / http://mrdoob.com/
 */

class WebGLObjects
{
    infoRender;
    geometries;
    updateList;

    constructor( geometries, infoRender )
    {
        this.geometries = geometries;
        this.infoRender = infoRender;
        this.updateList = {};
    }

    update( object )
    {
        var frame = this.infoRender.frame;
        var geometry = object.geometry;
        var buffergeometry: BufferGeometry = this.geometries.get( object, geometry );

        // Update once per frame
        if ( this.updateList[buffergeometry.id] !== frame )
        {
            if ( geometry.isGeometry )
                buffergeometry.updateFromObject( object );

            this.geometries.update( buffergeometry );
            this.updateList[buffergeometry.id] = frame;
        }

        return buffergeometry;
    }

    clear()
    {
        this.updateList = {};
    }


}


export { WebGLObjects };
