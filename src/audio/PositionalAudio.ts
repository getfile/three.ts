/**
 * @author mrdoob / http://mrdoob.com/
 */

import { Vector3 } from '../math/Vector3.js';
import { Audio } from './Audio.js';
import { Object3D } from '../core/Object3D.js';

class PositionalAudio extends Audio
{
	panner;

	constructor( listener )
	{
		super( listener );

		this.panner = this.context.createPanner();
		this.panner.connect( this.gain );
	}

	getOutput()
	{
		return this.panner;
	}

	getRefDistance()
	{
		return this.panner.refDistance;
	}

	setRefDistance( value )
	{
		this.panner.refDistance = value;
	}

	getRolloffFactor()
	{
		return this.panner.rolloffFactor;
	}

	setRolloffFactor( value )
	{
		this.panner.rolloffFactor = value;
	}

	getDistanceModel()
	{
		return this.panner.distanceModel;
	}

	setDistanceModel( value )
	{
		this.panner.distanceModel = value;
	}

	getMaxDistance()
	{
		return this.panner.maxDistance;
	}

	setMaxDistance( value )
	{
		this.panner.maxDistance = value;
	}

	updateMatrixWorld( force )
	{
		var position = new Vector3();
		super.updateMatrixWorld(force);
		position.setFromMatrixPosition( this.matrixWorld );
		this.panner.setPosition( position.x, position.y, position.z );
	}

}

export { PositionalAudio };
