import { ShaderMaterial } from './ShaderMaterial';

/**
 * @author mrdoob / http://mrdoob.com/
 */

class RawShaderMaterial extends ShaderMaterial
{
	constructor( parameters )
	{
		super( parameters );
		this.type = 'RawShaderMaterial';
	}
}

export { RawShaderMaterial };
