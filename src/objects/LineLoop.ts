import { Line } from './Line';

/**
 * @author mgreter / http://github.com/mgreter
 */

class LineLoop extends Line
{
	constructor( geometry, material )
	{
		super( geometry, material );
		this.type = 'LineLoop';
	}
}

export { LineLoop };
