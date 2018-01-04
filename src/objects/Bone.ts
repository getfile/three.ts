import { Object3D } from '../core/Object3D';

/**
 * @author mikael emtinger / http://gomo.se/
 * @author alteredq / http://alteredqualia.com/
 * @author ikerr / http://verold.com
 */

class Bone extends Object3D
{
	constructor()
	{
		super();
		this.type = 'Bone';
	}
}

export { Bone };
