/**
 * @author mrdoob / http://mrdoob.com/
 */

import { Texture } from './Texture';

class CanvasTexture extends Texture
{
	constructor( canvas, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy )
	{
		super( null, canvas, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy );
		this.needsUpdate = true;
	}
}

export { CanvasTexture };
