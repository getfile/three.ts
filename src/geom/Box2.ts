import { Vector2 } from '../math/Vector2';

/**
 * @author bhouston / http://clara.io
 */

class Box2
{
	min: Vector2;
	max: Vector2;

	constructor( min?: Vector2, max?: Vector2 )
	{
		this.min = ( min !== undefined ) ? min : new Vector2( + Infinity, + Infinity );
		this.max = ( max !== undefined ) ? max : new Vector2( - Infinity, - Infinity );
	}

	set( min, max ): Box2
	{
		this.min.copy( min );
		this.max.copy( max );

		return this;
	}

	setFromPoints( points ): Box2
	{
		this.makeEmpty();

		for ( var i = 0, il = points.length; i < il; i++ )
			this.expandByPoint( points[ i ] );
		return this;
	}

	setFromCenterAndSize( center, size ): Box2
	{
		var v1 = new Vector2();
		var halfSize = v1.copy( size ).multiplyScalar( 0.5 );
		this.min.copy( center ).sub( halfSize );
		this.max.copy( center ).add( halfSize );

		return this;
	}

	clone(): Box2
	{
		return new Box2().copy( this );
	}

	copy( box ): Box2
	{
		this.min.copy( box.min );
		this.max.copy( box.max );

		return this;
	}

	makeEmpty(): Box2
	{
		this.min.x = this.min.y = + Infinity;
		this.max.x = this.max.y = - Infinity;

		return this;
	}

	isEmpty(): boolean
	{
		// this is a more robust check for empty than ( volume <= 0 ) because volume can get positive with two negative axes
		return ( this.max.x < this.min.x ) || ( this.max.y < this.min.y );
	}

	getCenter( optionalTarget ): Vector2
	{
		var result = optionalTarget || new Vector2();
		return this.isEmpty() ? result.set( 0, 0 ) : result.addVectors( this.min, this.max ).multiplyScalar( 0.5 );
	}

	getSize( optionalTarget ): Vector2
	{
		var result = optionalTarget || new Vector2();
		return this.isEmpty() ? result.set( 0, 0 ) : result.subVectors( this.max, this.min );
	}

	expandByPoint( point ): Box2
	{
		this.min.min( point );
		this.max.max( point );

		return this;
	}

	expandByVector( vector ): Box2
	{
		this.min.sub( vector );
		this.max.add( vector );

		return this;
	}

	expandByScalar( scalar ): Box2
	{
		this.min.addScalar( - scalar );
		this.max.addScalar( scalar );

		return this;
	}

	containsPoint( point ): boolean
	{
		return point.x < this.min.x || point.x > this.max.x ||
			point.y < this.min.y || point.y > this.max.y ? false : true;
	}

	containsBox( box ): boolean
	{
		return this.min.x <= box.min.x && box.max.x <= this.max.x &&
			this.min.y <= box.min.y && box.max.y <= this.max.y;
	}

	getParameter( point, optionalTarget ): Vector2
	{
		// This can potentially have a divide by zero if the box
		// has a size dimension of 0.

		var result = optionalTarget || new Vector2();

		return result.set(
			( point.x - this.min.x ) / ( this.max.x - this.min.x ),
			( point.y - this.min.y ) / ( this.max.y - this.min.y )
		);
	}

	intersectsBox( box ): boolean
	{
		// using 4 splitting planes to rule out intersections

		return box.max.x < this.min.x || box.min.x > this.max.x ||
			box.max.y < this.min.y || box.min.y > this.max.y ? false : true;
	}

	clampPoint( point, optionalTarget ): Vector2
	{
		var result = optionalTarget || new Vector2();
		return result.copy( point ).clamp( this.min, this.max );
	}

	distanceToPoint( point ): number
	{
		var v1 = new Vector2();

		var clampedPoint = v1.copy( point ).clamp( this.min, this.max );
		return clampedPoint.sub( point ).length();
	}

	intersect( box ): Box2
	{
		this.min.max( box.min );
		this.max.min( box.max );

		return this;
	}

	union( box ): Box2
	{
		this.min.min( box.min );
		this.max.max( box.max );

		return this;
	}

	translate( offset ): Box2
	{
		this.min.add( offset );
		this.max.add( offset );

		return this;
	}

	equals( box ): boolean
	{
		return box.min.equals( this.min ) && box.max.equals( this.max );
	}

}


export { Box2 };
