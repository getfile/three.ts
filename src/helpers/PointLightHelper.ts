/**
 * @author alteredq / http://alteredqualia.com/
 * @author mrdoob / http://mrdoob.com/
 */

import { Mesh } from '../objects/Mesh';
import { MeshBasicMaterial } from '../materials/MeshBasicMaterial';
import { SphereBufferGeometry } from '../geometries/SphereGeometry';

class PointLightHelper extends Mesh
{
	light;
	color;

	constructor( light, sphereSize, color )
	{
		super( geometry, material );

		this.light = light;
		this.light.updateMatrixWorld();
		this.color = color;

		var geometry = new SphereBufferGeometry( sphereSize, 4, 2 );
		var material = new MeshBasicMaterial( { wireframe: true, fog: false } );

		this.matrix = this.light.matrixWorld;
		this.matrixAutoUpdate = false;
		this.update();

		/*
		var distanceGeometry = new THREE.IcosahedronGeometry( 1, 2 );
		var distanceMaterial = new THREE.MeshBasicMaterial( { color: hexColor, fog: false, wireframe: true, opacity: 0.1, transparent: true } );
	
		this.lightSphere = new THREE.Mesh( bulbGeometry, bulbMaterial );
		this.lightDistance = new THREE.Mesh( distanceGeometry, distanceMaterial );
	
		var d = light.distance;
	
		if ( d === 0.0 ) {
			this.lightDistance.visible = false;
		} else {
			this.lightDistance.scale.set( d, d, d );
		}
	
		this.add( this.lightDistance );
		*/
	}

	dispose()
	{
		this.geometry.dispose();
		this.material.dispose();
	}

	update()
	{
		if ( this.color !== undefined )
			this.material.color.set( this.color );
		else
			this.material.color.copy( this.light.color );

		/*
		var d = this.light.distance;
		if ( d === 0.0 ) {
			this.lightDistance.visible = false;
		} else {
			this.lightDistance.visible = true;
			this.lightDistance.scale.set( d, d, d );
		}
		*/
	}

}


export { PointLightHelper };
