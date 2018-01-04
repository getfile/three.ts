import { Color } from '../math/Color';
import { Vector3 } from '../math/Vector3';

/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 */

class Face3
{
	a;
	b;
	c;

	color: Color;
	vertexColors: Array<Color>;

	normal: Vector3;
	vertexNormals: Array<Vector3>;

	materialIndex: number;

	constructor( a, b, c, normal?: any, color?: any, materialIndex: number = 0 )
	{
		this.a = a;
		this.b = b;
		this.c = c;

		this.normal = ( normal && normal instanceof Vector3 ) ? normal : new Vector3();
		this.vertexNormals = Array.isArray( normal ) ? normal : [];

		this.color = ( color && color instanceof Color ) ? color : new Color();
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
			this.vertexNormals[ i ] = source.vertexNormals[ i ].clone();

		for ( var i = 0, il = source.vertexColors.length; i < il; i++ )
			this.vertexColors[ i ] = source.vertexColors[ i ].clone();

		return this;
	}

}

export { Face3 };
