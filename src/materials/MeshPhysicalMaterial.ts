import { MeshStandardMaterial } from './MeshStandardMaterial';

/**
 * @author WestLangley / http://github.com/WestLangley
 *
 * parameters = {
 *  reflectivity: <float>
 * }
 */

class MeshPhysicalMaterial extends MeshStandardMaterial
{
	defines;
	type: string;
	reflectivity: number;
	clearCoat: number;
	clearCoatRoughness: number;

	constructor( parameters )
	{
		super();

		this.defines = { 'PHYSICAL': '' };
		this.type = 'MeshPhysicalMaterial';
		this.reflectivity = 0.5; // maps to F0 = 0.04
		this.clearCoat = 0.0;
		this.clearCoatRoughness = 0.0;
		this.setValues( parameters );
	}

	copy( source )
	{
		super.copy( source );
		this.defines = { 'PHYSICAL': '' };

		this.reflectivity = source.reflectivity;

		this.clearCoat = source.clearCoat;
		this.clearCoatRoughness = source.clearCoatRoughness;

		return this;
	}


}


export { MeshPhysicalMaterial };
