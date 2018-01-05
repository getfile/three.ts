import { Light } from './Light';

/**
 * @author abelnation / http://github.com/abelnation
 */

class RectAreaLight extends Light
{
	width;
	height;
	
	constructor( color, intensity, width, height )
	{
		super( color, intensity );

		this.type = 'RectAreaLight';
		this.position.set( 0, 1, 0 );
		this.updateMatrix();
		this.width = ( width !== undefined ) ? width : 10;
		this.height = ( height !== undefined ) ? height : 10;

		// TODO (abelnation): distance/decay
		// TODO (abelnation): update method for RectAreaLight to update transform to lookat target
		// TODO (abelnation): shadows
	}

	// TODO (abelnation): RectAreaLight update when light shape is changed
	copy( source )
	{
		super.copy( source );

		this.width = source.width;
		this.height = source.height;
		return this;
	}

	toJSON( meta )
	{
		var data = super.toJSON( meta );

		data.object.width = this.width;
		data.object.height = this.height;
		return data;
	}

}

export { RectAreaLight };
