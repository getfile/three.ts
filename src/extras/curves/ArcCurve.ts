import { EllipseCurve } from './EllipseCurve';


class ArcCurve extends EllipseCurve
{
	constructor( aX, aY, aRadius, aStartAngle, aEndAngle, aClockwise )
	{
		super( aX, aY, aRadius, aRadius, aStartAngle, aEndAngle, aClockwise );
		this.type = 'ArcCurve';
	}
}

export { ArcCurve };
