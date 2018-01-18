import { Object3D } from "../../core/Object3D";

/**
 * @author fordacious / fordacious.github.io
 */

class WebGLProperties
{
	properties;

	constructor()
	{
		this.properties = {};
	}

	get( object: Object3D )
	{
		var uuid = object.uuid;
		var map = this.properties[ uuid ];

		if ( map === undefined )
		{
			map = {};
			this.properties[ uuid ] = map;
		}

		return map;
	}

	remove( object )
	{
		delete this.properties[ object.uuid ];
	}

	clear()
	{
		this.properties = {};
	}

}


export { WebGLProperties };
