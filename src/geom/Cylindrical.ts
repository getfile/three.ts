/**
 * @author Mugen87 / https://github.com/Mugen87
 *
 * Ref: https://en.wikipedia.org/wiki/Cylindrical_coordinate_system
 *
 */

class Cylindrical
{
	radius: number;
	theta: number;
	y: number;

	constructor( radius?: number, theta?: number, y?: number )
	{

		this.radius = ( radius !== undefined ) ? radius : 1.0; // distance from the origin to a point in the x-z plane
		this.theta = ( theta !== undefined ) ? theta : 0; // counterclockwise angle in the x-z plane measured in radians from the positive z-axis
		this.y = ( y !== undefined ) ? y : 0; // height above the x-z plane

		return this;

	}

	set( radius, theta, y )
	{
		this.radius = radius;
		this.theta = theta;
		this.y = y;

		return this;
	}

	clone()
	{
		return new Cylindrical().copy( this );
	}

	copy( other )
	{
		this.radius = other.radius;
		this.theta = other.theta;
		this.y = other.y;

		return this;
	}

	setFromVector3( vec3 )
	{
		this.radius = Math.sqrt( vec3.x * vec3.x + vec3.z * vec3.z );
		this.theta = Math.atan2( vec3.x, vec3.z );
		this.y = vec3.y;

		return this;
	}

}


export { Cylindrical };
