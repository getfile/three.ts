import { Color } from '../math/Color.js';

/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 */

class FogExp2
{
	name;
	color;
	density;

	constructor( color, density )
	{
		this.name = '';
		this.color = new Color( color );
		this.density = ( density !== undefined ) ? density : 0.00025;
	}

	clone()
	{
		return new FogExp2( this.color.getHex(), this.density );
	}

	toJSON( /* meta */ )
	{
		return {
			type: 'FogExp2',
			color: this.color.getHex(),
			density: this.density
		};
	}
}

export { FogExp2 };
