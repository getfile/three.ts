import { Object3D } from '../../core/Object3D';

/**
 * @author alteredq / http://alteredqualia.com/
 */

class ImmediateRenderObject extends Object3D
{
	render;
	
	constructor( material )
	{
		super();
		this.material = material;
		this.render = function ( /* renderCallback */ ) { };

	}
}

export { ImmediateRenderObject };
