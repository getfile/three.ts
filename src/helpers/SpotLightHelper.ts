/**
 * @author alteredq / http://alteredqualia.com/
 * @author mrdoob / http://mrdoob.com/
 * @author WestLangley / http://github.com/WestLangley
 */

import { Vector3 } from '../math/Vector3.js';
import { Object3D } from '../core/Object3D.js';
import { LineSegments } from '../objects/LineSegments.js';
import { LineBasicMaterial } from '../materials/LineBasicMaterial.js';
import { Float32BufferAttribute } from '../core/BufferAttribute.js';
import { BufferGeometry } from '../core/BufferGeometry.js';

class SpotLightHelper extends Object3D
{
	light;
	color;
	cone;

	constructor( light, color )
	{
		super();

		this.light = light;
		this.light.updateMatrixWorld();

		this.matrix = light.matrixWorld;
		this.matrixAutoUpdate = false;

		this.color = color;

		var geometry = new BufferGeometry();

		var positions = [
			0, 0, 0, 0, 0, 1,
			0, 0, 0, 1, 0, 1,
			0, 0, 0, - 1, 0, 1,
			0, 0, 0, 0, 1, 1,
			0, 0, 0, 0, - 1, 1
		];

		for ( var i = 0, j = 1, l = 32; i < l; i++ , j++ )
		{
			var p1 = ( i / l ) * Math.PI * 2;
			var p2 = ( j / l ) * Math.PI * 2;
			positions.push(
				Math.cos( p1 ), Math.sin( p1 ), 1,
				Math.cos( p2 ), Math.sin( p2 ), 1
			);
		}

		geometry.addAttribute( 'position', new Float32BufferAttribute( positions, 3 ) );
		var material = new LineBasicMaterial( { fog: false } );

		this.cone = new LineSegments( geometry, material );
		this.add( this.cone );
		this.update();
	}

	dispose()
	{
		this.cone.geometry.dispose();
		this.cone.material.dispose();
	}

	update()
	{
		var vector = new Vector3();
		var vector2 = new Vector3();

		this.light.updateMatrixWorld();

		var coneLength = this.light.distance ? this.light.distance : 1000;
		var coneWidth = coneLength * Math.tan( this.light.angle );

		this.cone.scale.set( coneWidth, coneWidth, coneLength );

		vector.setFromMatrixPosition( this.light.matrixWorld );
		vector2.setFromMatrixPosition( this.light.target.matrixWorld );

		this.cone.lookAt( vector2.sub( vector ) );

		if ( this.color !== undefined )
			this.cone.material.color.set( this.color );
		else
			this.cone.material.color.copy( this.light.color );
	}

}

export { SpotLightHelper };
