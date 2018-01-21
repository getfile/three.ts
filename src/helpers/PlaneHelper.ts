/**
 * @author WestLangley / http://github.com/WestLangley
 */

import { Line } from '../objects/Line.js';
import { Mesh } from '../objects/Mesh.js';
import { LineBasicMaterial } from '../materials/LineBasicMaterial.js';
import { MeshBasicMaterial } from '../materials/MeshBasicMaterial.js';
import { Float32BufferAttribute } from '../core/BufferAttribute.js';
import { BufferGeometry } from '../core/BufferGeometry.js';
import { Object3D } from '../core/Object3D.js';

class PlaneHelper extends Line
{
	plane;
	size;

	constructor( plane, size, hex )
	{
		let color = ( hex !== undefined ) ? hex : 0xffff00;
		let positions = [ 1, - 1, 1, - 1, 1, 1, - 1, - 1, 1, 1, 1, 1, - 1, 1, 1, - 1, - 1, 1, 1, - 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0 ];
		let geometry = new BufferGeometry();
		geometry.addAttribute( 'position', new Float32BufferAttribute( positions, 3 ) );
		geometry.computeBoundingSphere();

		super( geometry, new LineBasicMaterial( { color: color } ) );

		this.type = 'PlaneHelper';
		this.plane = plane;
		this.size = ( size === undefined ) ? 1 : size;
		//
		let positions2 = [ 1, 1, 1, - 1, 1, 1, - 1, - 1, 1, 1, 1, 1, - 1, - 1, 1, 1, - 1, 1 ];

		let geometry2 = new BufferGeometry();
		geometry2.addAttribute( 'position', new Float32BufferAttribute( positions2, 3 ) );
		geometry2.computeBoundingSphere();

		this.add( new Mesh( geometry2, new MeshBasicMaterial( { color: color, opacity: 0.2, transparent: true, depthWrite: false } ) ) );
	}

	updateMatrixWorld( force )
	{
		let scale = - this.plane.constant;

		if ( Math.abs( scale ) < 1e-8 ) scale = 1e-8; // sign does not matter
		this.scale.set( 0.5 * this.size, 0.5 * this.size, scale );
		this.lookAt( this.plane.normal );
		super.updateMatrixWorld( force );
	}
	
}


export { PlaneHelper };
