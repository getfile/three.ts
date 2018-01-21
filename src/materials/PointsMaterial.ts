import { Material } from './Material';
import { Color } from '../math/Color';

/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 * 
 * parameters = { color: <hex>, opacity: <float>, map: new THREE.Texture(
 * <Image> ),
 * 
 * size: <float>, sizeAttenuation: <bool> }
 */

class PointsMaterial extends Material
{
	constructor( parameters )
	{
		super();

		this.type = 'PointsMaterial';
		this.color = new Color( 0xffffff );
		this.map = null;
		this.size = 1;
		this.sizeAttenuation = true;
		this.lights = false;

		this.setValues( parameters );
	}

	copy( source )
	{
		super.copy(source);
		this.color.copy( source.color );
		this.map = source.map;
		this.size = source.size;
		this.sizeAttenuation = source.sizeAttenuation;

		return this;
	}
	
}

export { PointsMaterial };
