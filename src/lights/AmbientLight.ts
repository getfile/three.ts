import { Light } from './Light';

/**
 * @author mrdoob / http://mrdoob.com/
 */

class AmbientLight extends Light
{
	constructor( color, intensity )
	{
		super( color, intensity );
		this.type = 'AmbientLight';
		this.castShadow = undefined;
	}
}

export { AmbientLight };
