/**
 * @author mrdoob / http://mrdoob.com/
 */

import { PerspectiveCamera } from './PerspectiveCamera';

class ArrayCamera extends PerspectiveCamera
{
	cameras;
	
	constructor( array )
	{
		super();
		this.cameras = array || [];
	}

}

export { ArrayCamera };
