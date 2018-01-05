/**
 * @author mrdoob / http://mrdoob.com/
 */

class Cache
{
	enabled;
	files;

	constructor()
	{
		this.enabled = false;
		this.files = {};
	}

	add( key, file )
	{
		if ( this.enabled === false ) return;
		// console.log( 'THREE.Cache', 'Adding key:', key );
		this.files[ key ] = file;
	}

	get( key )
	{
		if ( this.enabled === false ) return;
		// console.log( 'THREE.Cache', 'Checking key:', key );
		return this.files[ key ];
	}

	remove( key )
	{
		delete this.files[ key ];
	}

	clear()
	{
		this.files = {};
	}

}


export { Cache };
