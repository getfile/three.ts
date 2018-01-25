/**
 * @author Don McCurdy / https://www.donmccurdy.com
 */

class LoaderUtils 
{

    static decodeText(array: number[]): string
    {
        if (window["TextDecoder"] !== 'undefined')
            return new (window["TextDecoder"])("utf-8").decode(array);

        // Avoid the String.fromCharCode.apply(null, array) shortcut, which
        // throws a "maximum call stack size exceeded" error for large arrays.
        var s = '';
        for (var i = 0, il = array.length; i < il; i++)
        {
            // Implicitly assumes little-endian.
            s += String.fromCharCode(array[i]);
        }

        return s;
    }

    static extractUrlBase(url: string): string
    {
        var parts = url.split('/');
        if (parts.length === 1) return './';
        parts.pop();
        return parts.join('/') + '/';
    }

}

export { LoaderUtils };
