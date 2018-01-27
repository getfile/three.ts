import { Material } from './Material';
import { Color } from '../math/Color';

/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 *
 * parameters = {
 *  color: <hex>,
 *  opacity: <float>,
 *
 *  linewidth: <float>,
 *  linecap: "round",
 *  linejoin: "round"
 * }
 */

class LineBasicMaterial extends Material
{

	linecap: string;
	linejoin: string;

	constructor( parameters )
	{
		super();

		this.type = 'LineBasicMaterial';
		this.color = new Color( 0xffffff );

		this.linewidth = 1;
		this.linecap = 'round';
		this.linejoin = 'round';

		this.lights = false;
		this.setValues( parameters );
	}

	copy( source )
	{
		super.copy( source );

		this.color.copy( source.color );
		this.linewidth = source.linewidth;
		this.linecap = source.linecap;
		this.linejoin = source.linejoin;

		return this;
	}


}



export { LineBasicMaterial };
