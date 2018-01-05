import { Matrix4 } from '../math/Matrix4';
import { Mesh } from '../objects/Mesh';
import { Group } from '../objects/Group';

/**
 * @author alteredq / http://alteredqualia.com/
 */

class SceneUtils 
{

	static createMultiMaterialObject( geometry, materials )
	{
		var group = new Group();
		for ( var i = 0, l = materials.length; i < l; i++ )
			group.add( new Mesh( geometry, materials[ i ] ) );

		return group;
	}

	static detach( child, parent, scene )
	{
		child.applyMatrix( parent.matrixWorld );
		parent.remove( child );
		scene.add( child );
	}

	static attach( child, scene, parent )
	{
		child.applyMatrix( new Matrix4().getInverse( parent.matrixWorld ) );

		scene.remove( child );
		parent.add( child );
	}

}


export { SceneUtils };
