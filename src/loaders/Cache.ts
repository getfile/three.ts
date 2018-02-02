/**
 * @author mrdoob / http://mrdoob.com/
 */

//add, get, remove, clear
/** 文件缓存对象 */
class Cache
{
    private static enabled: boolean = false;
    private static files = {};

    static add( key: string, file )
    {
        if ( Cache.enabled === false ) return;
        // console.log( 'THREE.Cache', 'Adding key:', key );
        Cache.files[key] = file;
    }

    static get( key )
    {
        if ( Cache.enabled === false ) return;
        // console.log( 'THREE.Cache', 'Checking key:', key );
        return Cache.files[key];
    }

    static remove( key )
    {
        delete Cache.files[key];
    }

    static clear()
    {
        Cache.files = {};
    }

}


export { Cache };
