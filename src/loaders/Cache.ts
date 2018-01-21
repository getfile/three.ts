/**
 * @author mrdoob / http://mrdoob.com/
 */

class Cache
{
	static enabled = false;
	static files = {};

	static add( key, file )
	{
		if ( Cache.enabled === false ) return;
		// console.log( 'THREE.Cache', 'Adding key:', key );
		Cache.files[ key ] = file;
	}

	static get( key )
	{
		if ( Cache.enabled === false ) return;
		// console.log( 'THREE.Cache', 'Checking key:', key );
		return Cache.files[ key ];
	}

	static remove( key )
	{
		delete Cache.files[ key ];
	}

	static clear()
	{
		Cache.files = {};
	}

}


export { Cache };
