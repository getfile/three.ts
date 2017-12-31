/**
 * @author mrdoob / http://mrdoob.com/
 */

class Layers
{

	mask: number;

	constructor()
	{
		this.mask = 1 | 0;
	}

	set( channel )
	{
		this.mask = 1 << channel | 0;
	}

	enable( channel )
	{
		this.mask |= 1 << channel | 0;
	}

	toggle( channel )
	{
		this.mask ^= 1 << channel | 0;
	}

	disable( channel )
	{
		this.mask &= ~( 1 << channel | 0 );
	}

	test( layers: Layers )
	{
		return ( this.mask & layers.mask ) !== 0;
	}

}


export { Layers };
