import { _Math } from '../math/Math';
import { InterleavedBuffer } from "./InterleavedBuffer";
import { BufferAttribute } from './BufferAttribute';

/**
 * @author benaadams / https://twitter.com/ben_a_adams
 */

class InterleavedBufferAttribute extends BufferAttribute
{
    data: InterleavedBuffer;
    offset: number;

    constructor(interleavedBuffer: InterleavedBuffer, itemSize: number, offset: number, normalized: boolean)
    {
        super([], itemSize, normalized);
        this.data = interleavedBuffer;
        this.offset = offset;
    }

    get count()
    {
        return this.data.count;
    }

    get array()
    {
        return this.data.array;
    }

    setX(index: number, x: number)
    {
        this.data.array[index * this.data.stride + this.offset] = x;
        return this;
    }

    setY(index: number, y: number)
    {
        this.data.array[index * this.data.stride + this.offset + 1] = y;
        return this;
    }

    setZ(index: number, z: number)
    {
        this.data.array[index * this.data.stride + this.offset + 2] = z;
        return this;
    }

    setW(index: number, w: number)
    {
        this.data.array[index * this.data.stride + this.offset + 3] = w;
        return this;
    }

    getX(index: number)
    {
        return this.data.array[index * this.data.stride + this.offset];
    }

    getY(index: number)
    {
        return this.data.array[index * this.data.stride + this.offset + 1];
    }

    getZ(index: number)
    {
        return this.data.array[index * this.data.stride + this.offset + 2];
    }

    getW(index: number)
    {
        return this.data.array[index * this.data.stride + this.offset + 3];
    }

    setXY(index: number, x: number, y: number)
    {
        index = index * this.data.stride + this.offset;
        this.data.array[index + 0] = x;
        this.data.array[index + 1] = y;
        return this;
    }

    setXYZ(index: number, x: number, y: number, z: number)
    {
        index = index * this.data.stride + this.offset;
        this.data.array[index + 0] = x;
        this.data.array[index + 1] = y;
        this.data.array[index + 2] = z;
        return this;
    }

    setXYZW(index: number, x: number, y: number, z: number, w: number)
    {
        index = index * this.data.stride + this.offset;
        this.data.array[index + 0] = x;
        this.data.array[index + 1] = y;
        this.data.array[index + 2] = z;
        this.data.array[index + 3] = w;
        return this;
    }

}


export { InterleavedBufferAttribute };
