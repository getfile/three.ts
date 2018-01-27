/**
 * @author mrdoob / http://mrdoob.com/
 *
 * parameters = {
 *  color: <THREE.Color>,
 *  opacity: <float>
 * }
 */

import { Material } from './Material.js';
import { Color } from '../math/Color.js';

class ShadowMaterial extends Material
{
	constructor( parameters )
	{
		super();
		this.type = 'ShadowMaterial';

		this.color = new Color( 0x000000 );
		this.opacity = 1.0;

		this.lights = true;
		this.transparent = true;

		this.setValues( parameters );
	}
}

export { ShadowMaterial };
