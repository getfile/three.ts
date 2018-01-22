define(["require", "exports", "../math/Vector4", "../math/Vector3", "../math/Vector2", "../math/Color", "../math/Math"], function (require, exports, Vector4_1, Vector3_1, Vector2_1, Color_1, Math_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class BufferAttribute {
        constructor(array, itemSize, normalized = true) {
            if (Array.isArray(array))
                throw new TypeError('THREE.BufferAttribute: array should be a Typed Array.');
            this.uuid = Math_1._Math.generateUUID();
            this.name = '';
            this.array = array;
            this.itemSize = itemSize;
            this.count = (array !== undefined ? array.length / itemSize : 0);
            this.normalized = normalized;
            this.dynamic = false;
            this.updateRange = { offset: 0, count: -1 };
            this.onUploadCallback = function () { };
            this.version = 0;
        }
        set needsUpdate(value) {
            if (value === true)
                this.version++;
        }
        setArray(array) {
            if (Array.isArray(array))
                throw new TypeError('THREE.BufferAttribute: array should be a Typed Array.');
            this.count = (array !== undefined ? array.length / this.itemSize : 0);
            this.array = array;
        }
        setDynamic(value) {
            this.dynamic = value;
            return this;
        }
        copy(source) {
            this.array = new Float32Array(source.array);
            this.itemSize = source.itemSize;
            this.count = source.count;
            this.normalized = source.normalized;
            this.dynamic = source.dynamic;
            return this;
        }
        copyAt(index1, attribute, index2) {
            index1 *= this.itemSize;
            index2 *= attribute.itemSize;
            for (let i = 0, l = this.itemSize; i < l; i++)
                this.array[index1 + i] = attribute.array[index2 + i];
            return this;
        }
        copyArray(array) {
            this.array.set(array);
            return this;
        }
        copyColorsArray(colors) {
            let array = this.array, offset = 0;
            for (let i = 0, l = colors.length; i < l; i++) {
                let color = colors[i];
                if (color === undefined) {
                    console.warn('THREE.BufferAttribute.copyColorsArray(): color is undefined', i);
                    color = new Color_1.Color();
                }
                array[offset++] = color.r;
                array[offset++] = color.g;
                array[offset++] = color.b;
            }
            return this;
        }
        copyIndicesArray(indices) {
            let array = this.array, offset = 0;
            for (let i = 0, l = indices.length; i < l; i++) {
                let index = indices[i];
                array[offset++] = index.a;
                array[offset++] = index.b;
                array[offset++] = index.c;
            }
            return this;
        }
        copyVector2sArray(vectors) {
            let array = this.array, offset = 0;
            for (let i = 0, l = vectors.length; i < l; i++) {
                let vector = vectors[i];
                if (vector === undefined) {
                    console.warn('THREE.BufferAttribute.copyVector2sArray(): vector is undefined', i);
                    vector = new Vector2_1.Vector2();
                }
                array[offset++] = vector.x;
                array[offset++] = vector.y;
            }
            return this;
        }
        copyVector3sArray(vectors) {
            let array = this.array, offset = 0;
            for (let i = 0, l = vectors.length; i < l; i++) {
                let vector = vectors[i];
                if (vector === undefined) {
                    console.warn('THREE.BufferAttribute.copyVector3sArray(): vector is undefined', i);
                    vector = new Vector3_1.Vector3();
                }
                array[offset++] = vector.x;
                array[offset++] = vector.y;
                array[offset++] = vector.z;
            }
            return this;
        }
        copyVector4sArray(vectors) {
            let array = this.array, offset = 0;
            for (let i = 0, l = vectors.length; i < l; i++) {
                let vector = vectors[i];
                if (vector === undefined) {
                    console.warn('THREE.BufferAttribute.copyVector4sArray(): vector is undefined', i);
                    vector = new Vector4_1.Vector4();
                }
                array[offset++] = vector.x;
                array[offset++] = vector.y;
                array[offset++] = vector.z;
                array[offset++] = vector.w;
            }
            return this;
        }
        set(value, offset = 0) {
            this.array.set(value, offset);
            return this;
        }
        getX(index) {
            return this.array[index * this.itemSize];
        }
        setX(index, x) {
            this.array[index * this.itemSize] = x;
            return this;
        }
        getY(index) {
            return this.array[index * this.itemSize + 1];
        }
        setY(index, y) {
            this.array[index * this.itemSize + 1] = y;
            return this;
        }
        getZ(index) {
            return this.array[index * this.itemSize + 2];
        }
        setZ(index, z) {
            this.array[index * this.itemSize + 2] = z;
            return this;
        }
        getW(index) {
            return this.array[index * this.itemSize + 3];
        }
        setW(index, w) {
            this.array[index * this.itemSize + 3] = w;
            return this;
        }
        setXY(index, x, y) {
            index *= this.itemSize;
            this.array[index + 0] = x;
            this.array[index + 1] = y;
            return this;
        }
        setXYZ(index, x, y, z) {
            index *= this.itemSize;
            this.array[index + 0] = x;
            this.array[index + 1] = y;
            this.array[index + 2] = z;
            return this;
        }
        setXYZW(index, x, y, z, w) {
            index *= this.itemSize;
            this.array[index + 0] = x;
            this.array[index + 1] = y;
            this.array[index + 2] = z;
            this.array[index + 3] = w;
            return this;
        }
        onUpload(callback) {
            this.onUploadCallback = callback;
            return this;
        }
        clone() {
            return new BufferAttribute(this.array, this.itemSize).copy(this);
        }
    }
    exports.BufferAttribute = BufferAttribute;
    class Int8BufferAttribute extends BufferAttribute {
        constructor(array, itemSize, normalized = true) {
            super(new Int8Array(array), itemSize, normalized);
        }
    }
    exports.Int8BufferAttribute = Int8BufferAttribute;
    class Uint8BufferAttribute extends BufferAttribute {
        constructor(array, itemSize, normalized = true) {
            super(new Uint8Array(array), itemSize, normalized);
        }
    }
    exports.Uint8BufferAttribute = Uint8BufferAttribute;
    class Uint8ClampedBufferAttribute extends BufferAttribute {
        constructor(array, itemSize, normalized = true) {
            super(new Uint8ClampedArray(array), itemSize, normalized);
        }
    }
    exports.Uint8ClampedBufferAttribute = Uint8ClampedBufferAttribute;
    class Int16BufferAttribute extends BufferAttribute {
        constructor(array, itemSize, normalized = true) {
            super(new Int16Array(array), itemSize, normalized);
        }
    }
    exports.Int16BufferAttribute = Int16BufferAttribute;
    class Uint16BufferAttribute extends BufferAttribute {
        constructor(array, itemSize, normalized = true) {
            super(new Uint16Array(array), itemSize, normalized);
        }
    }
    exports.Uint16BufferAttribute = Uint16BufferAttribute;
    class Int32BufferAttribute extends BufferAttribute {
        constructor(array, itemSize, normalized = true) {
            super(new Int32Array(array), itemSize, normalized);
        }
    }
    exports.Int32BufferAttribute = Int32BufferAttribute;
    class Uint32BufferAttribute extends BufferAttribute {
        constructor(array, itemSize, normalized = true) {
            super(new Uint32Array(array), itemSize, normalized);
        }
    }
    exports.Uint32BufferAttribute = Uint32BufferAttribute;
    class Float32BufferAttribute extends BufferAttribute {
        constructor(array, itemSize, normalized = true) {
            super(new Float32Array(array), itemSize, normalized);
        }
    }
    exports.Float32BufferAttribute = Float32BufferAttribute;
    class Float64BufferAttribute extends BufferAttribute {
        constructor(array, itemSize, normalized = true) {
            super(new Float64Array(array), itemSize, normalized);
        }
    }
    exports.Float64BufferAttribute = Float64BufferAttribute;
});
//# sourceMappingURL=BufferAttribute.js.map