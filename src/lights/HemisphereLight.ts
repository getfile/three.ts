import { Light } from './Light';
import { Color } from '../math/Color';
import { Object3D } from '../core/Object3D';

/**
 * @author alteredq / http://alteredqualia.com/
 */

class HemisphereLight extends Light
{
	constructor( skyColor, groundColor, intensity )
	{
		super( skyColor, intensity );
		this.type = 'HemisphereLight';
		this.castShadow = undefined;
		this.position.copy( Object3D.DefaultUp );
		this.updateMatrix();
		this.groundColor = new Color( groundColor );
	}

	copy( source )
	{
		super.copy( source );
		this.groundColor.copy( source.groundColor );
		return this;
	}
}

export { HemisphereLight };
