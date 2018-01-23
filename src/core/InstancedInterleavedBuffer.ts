import { InterleavedBuffer } from './InterleavedBuffer.js';

/**
 * @author benaadams / https://twitter.com/ben_a_adams
 */

class InstancedInterleavedBuffer extends InterleavedBuffer
{
	meshPerAttribute: number;

	constructor( array, stride: number, meshPerAttribute: number = 1 )
	{
		super( array, stride );
		this.meshPerAttribute = meshPerAttribute;
	}

	copy( source )
	{
		super.copy( source );
		this.meshPerAttribute = source.meshPerAttribute;
		return this;
	}

}

export { InstancedInterleavedBuffer };
