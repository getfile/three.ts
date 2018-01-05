import { Line } from './Line.js';

/**
 * @author mrdoob / http://mrdoob.com/
 */

class LineSegments extends Line
{
	constructor( geometry?, material? )
	{
		super( geometry, material );
		this.type = 'LineSegments';
	}
}

export { LineSegments };
