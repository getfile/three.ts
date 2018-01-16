/**
 * @author mrdoob / http://mrdoob.com/
 */

import { Texture } from './Texture';
import { CubeReflectionMapping } from '../constants';

class CubeTexture extends Texture
{
	constructor( images?, mapping?, wrapS?, wrapT?, magFilter?, minFilter?, format?, type?, anisotropy?, encoding? )
	{
		images = images !== undefined ? images : [];
		mapping = mapping !== undefined ? mapping : CubeReflectionMapping;

		super( images, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy, encoding );

		this.flipY = false;
	}

	get images()
	{
		return this.image;
	}

	set images( value )
	{
		this.image = value;
	}
}

export { CubeTexture };
