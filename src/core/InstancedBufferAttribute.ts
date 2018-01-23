import { BufferAttribute } from './BufferAttribute';

/**
 * @author benaadams / https://twitter.com/ben_a_adams
 */

class InstancedBufferAttribute extends BufferAttribute
{
	meshPerAttribute: number;

	constructor( array, itemSize: number, meshPerAttribute: number = 1 )
	{
		super( array, itemSize );
		this.meshPerAttribute = 1;
	}

	copy( source )
	{
		super.copy( source );
		this.meshPerAttribute = source.meshPerAttribute;
		return this;
	}

}


export { InstancedBufferAttribute };
