import { Sphere } from '../geom/Sphere';
import { Ray } from '../geom/Ray';
import { Object3D } from '../core/Object3D';
import { BufferGeometry } from '../core/BufferGeometry';
import { Matrix4 } from '../math/Matrix4';
import { Vector3 } from '../math/Vector3';
import { PointsMaterial } from '../materials/PointsMaterial';

/**
 * @author alteredq / http://alteredqualia.com/
 */

class Points extends Object3D
{
	constructor( geometry, material )
	{
		super();
		this.type = 'Points';
		this.geometry = geometry !== undefined ? geometry : new BufferGeometry();
		this.material = material !== undefined ? material : new PointsMaterial( { color: Math.random() * 0xffffff } );
	}


	raycast( raycaster, intersects )
	{
		let inverseMatrix = new Matrix4();
		let ray = new Ray();
		let sphere = new Sphere();
		let object = this;
		let geometry = this.geometry;
		let matrixWorld = this.matrixWorld;
		let threshold = raycaster.params.Points.threshold;

		// Checking boundingSphere distance to ray
		if ( geometry.boundingSphere === null ) geometry.computeBoundingSphere();

		sphere.copy( geometry.boundingSphere );
		sphere.applyMatrix4( matrixWorld );
		sphere.radius += threshold;

		if ( raycaster.ray.intersectsSphere( sphere ) === false ) return;

		//
		inverseMatrix.getInverse( matrixWorld );
		ray.copy( raycaster.ray ).applyMatrix4( inverseMatrix );

		let localThreshold = threshold / ( ( this.scale.x + this.scale.y + this.scale.z ) / 3 );
		let localThresholdSq = localThreshold * localThreshold;
		let position = new Vector3();

		function testPoint( point, index )
		{
			let rayPointDistanceSq = ray.distanceSqToPoint( point );
			if ( rayPointDistanceSq < localThresholdSq )
			{
				let intersectPoint = ray.closestPointToPoint( point );
				intersectPoint.applyMatrix4( matrixWorld );
				let distance = raycaster.ray.origin.distanceTo( intersectPoint );
				if ( distance < raycaster.near || distance > raycaster.far ) return;
				intersects.push( {
					distance: distance,
					distanceToRay: Math.sqrt( rayPointDistanceSq ),
					point: intersectPoint.clone(),
					index: index,
					face: null,
					object: object
				} );
			}
		}

		if ( geometry.isBufferGeometry )
		{
			let index = geometry.index;
			let attributes = geometry.attributes;
			let positions = attributes.position.array;

			if ( index !== null )
			{
				let indices = index.array;
				for ( let i = 0, il = indices.length; i < il; i++ )
				{
					let a = indices[ i ];
					position.fromArray( positions, a * 3 );
					testPoint( position, a );
				}
			} else
			{
				for ( let i = 0, l = positions.length / 3; i < l; i++ )
				{
					position.fromArray( positions, i * 3 );
					testPoint( position, i );
				}
			}
		} else
		{
			let vertices = geometry.vertices;
			for ( let i = 0, l = vertices.length; i < l; i++ )
				testPoint( vertices[ i ], i );
		}
	}

	clone()
	{
		return new Points( this.geometry, this.material ).copy( this );
	}

}


export { Points };
