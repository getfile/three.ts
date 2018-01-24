import { Vector4 } from '../math/Vector4';
import { Vector3 } from '../math/Vector3';
import { Vector2 } from '../math/Vector2';
import { Color } from '../math/Color';
import { _Math } from '../math/Math';

/**
 * @author mrdoob / http://mrdoob.com/
 */

class BufferAttribute
{
    uuid: string;
    name: string;

    array: Float32Array; //fix
    itemSize: number; //item size
    count: number; //item number

    normalized: boolean;
    dynamic: boolean;
    updateRange: { offset:number, count:number };
    onUploadCallback: Function;
    version: number;

    constructor(array, itemSize: number, normalized: boolean = true)
    {
        if (Array.isArray(array))
            throw new TypeError('THREE.BufferAttribute: array should be a Typed Array.');

        this.uuid = _Math.generateUUID();
        this.name = '';

        this.array = array;
        this.itemSize = itemSize;
        this.count = (array !== undefined ? array.length / itemSize : 0);
        this.normalized = normalized;

        this.dynamic = false;
        this.updateRange = { offset: 0, count: - 1 };
        this.onUploadCallback = function () { };
        this.version = 0;
    }

    set needsUpdate(value)
    {
        if (value === true) this.version++;
    }

    setArray(array)
    {
        if (Array.isArray(array))
            throw new TypeError('THREE.BufferAttribute: array should be a Typed Array.');

        this.count = (array !== undefined ? array.length / this.itemSize : 0);
        this.array = array;
    }

    setDynamic(value: boolean)
    {
        this.dynamic = value;
        return this;
    }

    copy(source: BufferAttribute)
    {
        this.array = new Float32Array(source.array);
        this.itemSize = source.itemSize;
        this.count = source.count;
        this.normalized = source.normalized;
        this.dynamic = source.dynamic;

        return this;
    }

    //copy one element
    copyAt(index1: number, attribute: BufferAttribute, index2: number)
    {
        index1 *= this.itemSize;
        index2 *= attribute.itemSize;
        for (let i = 0, l = this.itemSize; i < l; i++)
            this.array[index1 + i] = attribute.array[index2 + i];
        return this;
    }

    copyArray(array)
    {
        this.array.set(array);
        return this;
    }

    copyColorsArray(colors: Array<Color>)
    {
        let array = this.array, offset = 0;
        for (let i = 0, l = colors.length; i < l; i++)
        {
            let color = colors[i];
            if (color === undefined)
            {
                console.warn('THREE.BufferAttribute.copyColorsArray(): color is undefined', i);
                color = new Color();
            }

            array[offset++] = color.r;
            array[offset++] = color.g;
            array[offset++] = color.b;
        }
        return this;
    }

    copyIndicesArray(indices)
    {
        let array = this.array, offset = 0;
        for (let i = 0, l = indices.length; i < l; i++)
        {
            let index = indices[i];
            array[offset++] = index.a;
            array[offset++] = index.b;
            array[offset++] = index.c;
        }
        return this;
    }

    copyVector2sArray(vectors: Array<Vector2>)
    {
        let array = this.array, offset = 0;
        for (let i = 0, l = vectors.length; i < l; i++)
        {
            let vector = vectors[i];
            if (vector === undefined)
            {
                console.warn('THREE.BufferAttribute.copyVector2sArray(): vector is undefined', i);
                vector = new Vector2();
            }

            array[offset++] = vector.x;
            array[offset++] = vector.y;
        }
        return this;
    }

    copyVector3sArray(vectors: Array<Vector3>)
    {
        let array = this.array, offset = 0;
        for (let i = 0, l = vectors.length; i < l; i++)
        {
            let vector = vectors[i];
            if (vector === undefined)
            {
                console.warn('THREE.BufferAttribute.copyVector3sArray(): vector is undefined', i);
                vector = new Vector3();
            }
            array[offset++] = vector.x;
            array[offset++] = vector.y;
            array[offset++] = vector.z;
        }
        return this;
    }

    copyVector4sArray(vectors: Array<Vector4>)
    {
        let array = this.array, offset = 0;
        for (let i = 0, l = vectors.length; i < l; i++)
        {
            let vector = vectors[i];
            if (vector === undefined)
            {
                console.warn('THREE.BufferAttribute.copyVector4sArray(): vector is undefined', i);
                vector = new Vector4();
            }
            array[offset++] = vector.x;
            array[offset++] = vector.y;
            array[offset++] = vector.z;
            array[offset++] = vector.w;
        }
        return this;
    }

    set(value, offset: number = 0)
    {
        this.array.set(value, offset);
        return this;
    }

    getX(index: number)
    {
        return this.array[index * this.itemSize];
    }

    setX(index, x)
    {
        this.array[index * this.itemSize] = x;
        return this;
    }

    getY(index)
    {
        return this.array[index * this.itemSize + 1];
    }

    setY(index, y)
    {
        this.array[index * this.itemSize + 1] = y;
        return this;
    }

    getZ(index)
    {
        return this.array[index * this.itemSize + 2];
    }

    setZ(index, z)
    {
        this.array[index * this.itemSize + 2] = z;
        return this;
    }

    getW(index)
    {
        return this.array[index * this.itemSize + 3];
    }

    setW(index, w)
    {
        this.array[index * this.itemSize + 3] = w;
        return this;
    }

    setXY(index, x, y)
    {
        index *= this.itemSize;
        this.array[index + 0] = x;
        this.array[index + 1] = y;
        return this;
    }

    setXYZ(index, x, y, z)
    {
        index *= this.itemSize;
        this.array[index + 0] = x;
        this.array[index + 1] = y;
        this.array[index + 2] = z;
        return this;
    }

    setXYZW(index, x, y, z, w)
    {
        index *= this.itemSize;
        this.array[index + 0] = x;
        this.array[index + 1] = y;
        this.array[index + 2] = z;
        this.array[index + 3] = w;
        return this;
    }

    onUpload(callback)
    {
        this.onUploadCallback = callback;
        return this;
    }

    clone()
    {
        return new BufferAttribute(this.array, this.itemSize).copy(this);
    }
}

//
class Int8BufferAttribute extends BufferAttribute
{
    constructor(array, itemSize, normalized: boolean = true)
    {
        super(new Int8Array(array), itemSize, normalized);
    }
}

class Uint8BufferAttribute extends BufferAttribute
{
    constructor(array, itemSize, normalized: boolean = true)
    {
        super(new Uint8Array(array), itemSize, normalized);
    }
}

class Uint8ClampedBufferAttribute extends BufferAttribute
{
    constructor(array, itemSize, normalized: boolean = true)
    {
        super(new Uint8ClampedArray(array), itemSize, normalized);
    }
}

class Int16BufferAttribute extends BufferAttribute
{
    constructor(array, itemSize, normalized: boolean = true)
    {
        super(new Int16Array(array), itemSize, normalized);
    }
}

class Uint16BufferAttribute extends BufferAttribute
{
    constructor(array, itemSize, normalized: boolean = true)
    {
        super(new Uint16Array(array), itemSize, normalized);
    }
}

class Int32BufferAttribute extends BufferAttribute
{
    constructor(array, itemSize, normalized: boolean = true)
    {
        super(new Int32Array(array), itemSize, normalized);
    }
}

class Uint32BufferAttribute extends BufferAttribute
{
    constructor(array, itemSize, normalized: boolean = true)
    {
        super(new Uint32Array(array), itemSize, normalized);
    }
}

class Float32BufferAttribute extends BufferAttribute
{
    constructor(array, itemSize, normalized: boolean = true)
    {
        super(new Float32Array(array), itemSize, normalized);
    }
}

class Float64BufferAttribute extends BufferAttribute
{
    constructor(array, itemSize, normalized: boolean = true)
    {
        super(new Float64Array(array), itemSize, normalized);
    }
}


//
export
{
    BufferAttribute,
    Float64BufferAttribute,
    Float32BufferAttribute,
    Uint32BufferAttribute,
    Int32BufferAttribute,
    Uint16BufferAttribute,
    Int16BufferAttribute,
    Uint8ClampedBufferAttribute,
    Uint8BufferAttribute,
    Int8BufferAttribute
};
