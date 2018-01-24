import { _Math } from '../math/Math.js';

/**
 * @author benaadams / https://twitter.com/ben_a_adams
 */

class InterleavedBuffer
{
    uuid: string;
    
    array: Float32Array;
    stride: number; //item size
    count: number; //item count
    dynamic: boolean;

    updateRange: { offset: number, count: number };
    onUploadCallback: Function;

    version: number;

    constructor(array?, stride: number = 1)
    {
        this.uuid = _Math.generateUUID();

        this.array = array;
        this.stride = stride;
        this.count = array !== undefined ? array.length / stride : 0;

        this.dynamic = false;
        this.updateRange = { offset: 0, count: - 1 };

        this.onUploadCallback = function () { };

        this.version = 0;
    }

    set needsUpdate(value: boolean)
    {
        if (value) this.version++;
    }

    setArray(array)
    {
        if (Array.isArray(array))
            throw new TypeError('THREE.BufferAttribute: array should be a Typed Array.');

        this.count = array !== undefined ? array.length / this.stride : 0;
        this.array = array;
    }

    setDynamic(value: boolean)
    {
        this.dynamic = value;
        return this;
    }

    copy(source: InterleavedBuffer)
    {
        this.array = new Float32Array(source.array);
        this.count = source.count;
        this.stride = source.stride;
        this.dynamic = source.dynamic;
        return this;
    }

    //copy one element, from dex2 to dex1
    copyAt(index1: number, attribute: InterleavedBuffer, index2: number)
    {
        index1 *= this.stride;
        index2 *= attribute.stride;
        for (var i = 0, l = this.stride; i < l; i++)
            this.array[index1 + i] = attribute.array[index2 + i];

        return this;
    }

    set(value, offset: number = 0)
    {
        this.array.set(value, offset);
        return this;
    }

    clone()
    {
        return new InterleavedBuffer().copy(this);
    }

    //set dataUpload callback function 
    onUpload(callback: Function)
    {
        this.onUploadCallback = callback;
        return this;
    }

}


export { InterleavedBuffer };
