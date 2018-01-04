import { Color } from '../math/Color';

/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 */

class Fog
{
	name;
	color;
	near;
	far;

	constructor( color, near, far )
	{
		this.name = '';
		this.color = new Color( color );
		this.near = ( near !== undefined ) ? near : 1;
		this.far = ( far !== undefined ) ? far : 1000;
	}

	clone()
	{
		return new Fog( this.color.getHex(), this.near, this.far );
	}

	toJSON( /* meta */ )
	{
		return {
			type: 'Fog',
			color: this.color.getHex(),
			near: this.near,
			far: this.far
		};
	}
	
}

export { Fog };
