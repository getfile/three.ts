import { Object3D } from '../core/Object3D';
import { Color } from '../math/Color';

/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 */

class Light extends Object3D
{
	color;
	intensity;
	groundColor;
	distance;
	angle;
	decay;
	penumbra;
	shadow;

	constructor( color, intensity )
	{
		super();

		this.type = 'Light';
		this.color = new Color( color );
		this.intensity = intensity !== undefined ? intensity : 1;
		this.receiveShadow = undefined;
	}

	copy( source )
	{
		super.copy( source );

		this.color.copy( source.color );
		this.intensity = source.intensity;

		return this;
	}

	toJSON( meta )
	{
		var data = super.toJSON( meta );

		data.object.color = this.color.getHex();
		data.object.intensity = this.intensity;

		if ( this.groundColor !== undefined ) data.object.groundColor = this.groundColor.getHex();

		if ( this.distance !== undefined ) data.object.distance = this.distance;
		if ( this.angle !== undefined ) data.object.angle = this.angle;
		if ( this.decay !== undefined ) data.object.decay = this.decay;
		if ( this.penumbra !== undefined ) data.object.penumbra = this.penumbra;

		if ( this.shadow !== undefined ) data.object.shadow = this.shadow.toJSON();

		return data;
	}

}


export { Light };
