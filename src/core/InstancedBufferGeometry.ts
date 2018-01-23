import { BufferGeometry } from './BufferGeometry.js';

/**
 * @author benaadams / https://twitter.com/ben_a_adams
 */

class InstancedBufferGeometry extends BufferGeometry
{

	maxInstancedCount: number;

	constructor()
	{
		super();
		this.type = 'InstancedBufferGeometry';
		this.maxInstancedCount = 0;
	}

	copy( source )
	{
		super.copy( source );
		this.maxInstancedCount = source.maxInstancedCount;
		return this;
	}

	clone()
	{
		return new InstancedBufferGeometry().copy( this );
	}

}

export { InstancedBufferGeometry };
