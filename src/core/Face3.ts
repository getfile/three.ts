import { Color } from '../math/Color';
import { Vector3 } from '../math/Vector3';

/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 */

class Face3
{

    //a, b, c = vertex index
    a: number;
    b: number;
    c: number;

    color: Color;
    normal: Vector3;

    vertexColors: Color[];
    vertexNormals: Vector3[];

    materialIndex: number;

    constructor( a: number = 0, b: number = 0, c: number = 0, normal?: Vector3 | Vector3[], color?: Color | Color[], materialIndex: number = 0 )
    {
        this.a = a;
        this.b = b;
        this.c = c;

        this.normal = ( normal instanceof Vector3 ) ? normal : new Vector3();
        this.vertexNormals = Array.isArray( normal ) ? normal : [];

        this.color = ( color instanceof Color ) ? color : new Color();
        this.vertexColors = Array.isArray( color ) ? color : [];

        this.materialIndex = materialIndex;
    }

    clone(): Face3
    {
        return new Face3().copy( this );
    }

    copy( source: Face3 ): Face3
    {
        this.a = source.a;
        this.b = source.b;
        this.c = source.c;

        this.normal.copy( source.normal );
        this.color.copy( source.color );

        this.materialIndex = source.materialIndex;

        for ( var i = 0, il = source.vertexNormals.length; i < il; i++ )
            this.vertexNormals[i] = source.vertexNormals[i].clone();

        for ( var i = 0, il = source.vertexColors.length; i < il; i++ )
            this.vertexColors[i] = source.vertexColors[i].clone();

        return this;
    }


}

export { Face3 };
