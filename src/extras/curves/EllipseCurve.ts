import { Curve } from '../core/Curve';
import { Vector2 } from '../../math/Vector2';


class EllipseCurve extends Curve
{
	aX; aY; xRadius; yRadius; aStartAngle; aEndAngle; aClockwise; aRotation;

	constructor( aX, aY, xRadius, yRadius, aStartAngle, aEndAngle, aClockwise, aRotation? ) 
	{
		super();

		this.type = 'EllipseCurve';

		this.aX = aX || 0;
		this.aY = aY || 0;

		this.xRadius = xRadius || 1;
		this.yRadius = yRadius || 1;

		this.aStartAngle = aStartAngle || 0;
		this.aEndAngle = aEndAngle || 2 * Math.PI;

		this.aClockwise = aClockwise || false;

		this.aRotation = aRotation || 0;
	}

	getPoint( t, optionalTarget? )
	{
		var point = optionalTarget || new Vector2();

		var twoPi = Math.PI * 2;
		var deltaAngle = this.aEndAngle - this.aStartAngle;
		var samePoints = Math.abs( deltaAngle ) < Number.EPSILON;

		// ensures that deltaAngle is 0 .. 2 PI
		while ( deltaAngle < 0 ) deltaAngle += twoPi;
		while ( deltaAngle > twoPi ) deltaAngle -= twoPi;

		if ( deltaAngle < Number.EPSILON )
		{

			if ( samePoints )
			{

				deltaAngle = 0;

			} else
			{

				deltaAngle = twoPi;

			}

		}

		if ( this.aClockwise === true && !samePoints )
		{

			if ( deltaAngle === twoPi )
			{

				deltaAngle = - twoPi;

			} else
			{

				deltaAngle = deltaAngle - twoPi;

			}

		}

		var angle = this.aStartAngle + t * deltaAngle;
		var x = this.aX + this.xRadius * Math.cos( angle );
		var y = this.aY + this.yRadius * Math.sin( angle );

		if ( this.aRotation !== 0 )
		{

			var cos = Math.cos( this.aRotation );
			var sin = Math.sin( this.aRotation );

			var tx = x - this.aX;
			var ty = y - this.aY;

			// Rotate the point about the center of the ellipse.
			x = tx * cos - ty * sin + this.aX;
			y = tx * sin + ty * cos + this.aY;

		}

		return point.set( x, y );
	}

	copy( source )
	{
		super.copy( source );

		this.aX = source.aX;
		this.aY = source.aY;

		this.xRadius = source.xRadius;
		this.yRadius = source.yRadius;

		this.aStartAngle = source.aStartAngle;
		this.aEndAngle = source.aEndAngle;

		this.aClockwise = source.aClockwise;

		this.aRotation = source.aRotation;

		return this;
	}


	toJSON()
	{
		var data = super.toJSON();

		data.aX = this.aX;
		data.aY = this.aY;

		data.xRadius = this.xRadius;
		data.yRadius = this.yRadius;

		data.aStartAngle = this.aStartAngle;
		data.aEndAngle = this.aEndAngle;

		data.aClockwise = this.aClockwise;

		data.aRotation = this.aRotation;

		return data;
	}

	fromJSON( json )
	{
		super.fromJSON( json );

		this.aX = json.aX;
		this.aY = json.aY;

		this.xRadius = json.xRadius;
		this.yRadius = json.yRadius;

		this.aStartAngle = json.aStartAngle;
		this.aEndAngle = json.aEndAngle;

		this.aClockwise = json.aClockwise;

		this.aRotation = json.aRotation;

		return this;
	}

}

export { EllipseCurve };
