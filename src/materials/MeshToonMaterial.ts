import { MeshPhongMaterial } from './MeshPhongMaterial';

/**
 * @author takahirox / http://github.com/takahirox
 *
 * parameters = {
 *  gradientMap: new THREE.Texture( <Image> )
 * }
 */

class MeshToonMaterial extends MeshPhongMaterial
{
	defines;

	constructor( parameters )
	{
		super( parameters );
		this.defines = { 'TOON': '' };
		this.type = 'MeshToonMaterial';
		this.gradientMap = null;
		this.setValues( parameters );
	}

	copy( source )
	{
		super.copy( source );
		this.gradientMap = source.gradientMap;
		return this;
	}


}


export { MeshToonMaterial };
