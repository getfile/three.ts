/**
 * @author abelnation / http://github.com/abelnation
 * @author Mugen87 / http://github.com/Mugen87
 * @author WestLangley / http://github.com/WestLangley
 */

import { Object3D } from '../core/Object3D';
import { Line } from '../objects/Line';
import { LineBasicMaterial } from '../materials/LineBasicMaterial';
import { BufferGeometry } from '../core/BufferGeometry';
import { BufferAttribute } from '../core/BufferAttribute';

class RectAreaLightHelper extends Object3D
{
	light;
	color;
	line;

	constructor( light, color )
	{
		super();
		this.light = light;
		this.light.updateMatrixWorld();

		this.matrix = light.matrixWorld;
		this.matrixAutoUpdate = false;

		this.color = color;

		var material = new LineBasicMaterial( { fog: false } );

		var geometry = new BufferGeometry();

		geometry.addAttribute( 'position', new BufferAttribute( new Float32Array( 5 * 3 ), 3 ) );

		this.line = new Line( geometry, material );
		this.add( this.line );

		this.update();
	}

	dispose()
	{
		this.children[ 0 ].geometry.dispose();
		this.children[ 0 ].material.dispose();
	}

	update()
	{
		// calculate new dimensions of the helper
		var hx = this.light.width * 0.5;
		var hy = this.light.height * 0.5;
		var position = this.line.geometry.attributes.position;
		var array = position.array;

		// update vertices
		array[ 0 ] = hx; array[ 1 ] = - hy; array[ 2 ] = 0;
		array[ 3 ] = hx; array[ 4 ] = hy; array[ 5 ] = 0;
		array[ 6 ] = - hx; array[ 7 ] = hy; array[ 8 ] = 0;
		array[ 9 ] = - hx; array[ 10 ] = - hy; array[ 11 ] = 0;
		array[ 12 ] = hx; array[ 13 ] = - hy; array[ 14 ] = 0;

		position.needsUpdate = true;

		if ( this.color !== undefined )
			this.line.material.color.set( this.color );
		else
			this.line.material.color.copy( this.light.color );
	}

}

export { RectAreaLightHelper };
