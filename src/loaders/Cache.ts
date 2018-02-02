/**
 * @author mrdoob / http://mrdoob.com/
 */

//add, get, remove, clear
/** 文件缓存对象 */
class Cache
{
    private static enabled: boolean = false;
    private static files = {};

    /** 添加文件项 */
    static add( key: string, file )
    {
        if ( Cache.enabled === false ) return;
        // console.log( 'THREE.Cache', 'Adding key:', key );
        Cache.files[key] = file;
    }

    /** 获取文件项 */
    static get( key )
    {
        if ( Cache.enabled === false ) return;
        // console.log( 'THREE.Cache', 'Checking key:', key );
        return Cache.files[key];
    }

    /** 移除文件项 */
    static remove( key )
    {
        delete Cache.files[key];
    }

    /** 清除映射表 */
    static clear()
    {
        Cache.files = {};
    }

}


export { Cache };
