import { Material } from './Material';
import { Color } from '../math/Color';

/**
 * @author alteredq / http://alteredqualia.com/
 *
 * parameters = {
 *  color: <hex>,
 *  opacity: <float>,
 *  map: new THREE.Texture( <Image> ),
 *
 *	uvOffset: new THREE.Vector2(),
 *	uvScale: new THREE.Vector2()
 * }
 */

class SpriteMaterial extends Material
{
	constructor( parameters )
	{
		super();
		this.type = 'SpriteMaterial';

		this.color = new Color( 0xffffff );
		this.map = null;

		this.rotation = 0;

		this.fog = false;
		this.lights = false;

		this.setValues( parameters );
	}

	copy( source )
	{
		super.copy( source );
		this.color.copy( source.color );
		this.map = source.map;

		this.rotation = source.rotation;

		return this;
	}


}


export { SpriteMaterial };
