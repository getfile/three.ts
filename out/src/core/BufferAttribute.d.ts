import { Vector4 } from '../math/Vector4';
import { Vector3 } from '../math/Vector3';
import { Vector2 } from '../math/Vector2';
import { Color } from '../math/Color';
declare class BufferAttribute {
    uuid: string;
    name: string;
    array: Float32Array;
    itemSize: number;
    count: number;
    normalized: boolean;
    dynamic: boolean;
    updateRange: {
        offset: number;
        count: number;
    };
    onUploadCallback: Function;
    version: number;
    constructor(array: any, itemSize: number, normalized?: boolean);
    needsUpdate: any;
    setArray(array: any): void;
    setDynamic(value: boolean): this;
    copy(source: BufferAttribute): this;
    copyAt(index1: number, attribute: BufferAttribute, index2: number): this;
    copyArray(array: any): this;
    copyColorsArray(colors: Array<Color>): this;
    copyIndicesArray(indices: any): this;
    copyVector2sArray(vectors: Array<Vector2>): this;
    copyVector3sArray(vectors: Array<Vector3>): this;
    copyVector4sArray(vectors: Array<Vector4>): this;
    set(value: any, offset?: number): this;
    getX(index: number): number;
    setX(index: any, x: any): this;
    getY(index: any): number;
    setY(index: any, y: any): this;
    getZ(index: any): number;
    setZ(index: any, z: any): this;
    getW(index: any): number;
    setW(index: any, w: any): this;
    setXY(index: any, x: any, y: any): this;
    setXYZ(index: any, x: any, y: any, z: any): this;
    setXYZW(index: any, x: any, y: any, z: any, w: any): this;
    onUpload(callback: any): this;
    clone(): BufferAttribute;
}
declare class Int8BufferAttribute extends BufferAttribute {
    constructor(array: any, itemSize: any, normalized?: boolean);
}
declare class Uint8BufferAttribute extends BufferAttribute {
    constructor(array: any, itemSize: any, normalized?: boolean);
}
declare class Uint8ClampedBufferAttribute extends BufferAttribute {
    constructor(array: any, itemSize: any, normalized?: boolean);
}
declare class Int16BufferAttribute extends BufferAttribute {
    constructor(array: any, itemSize: any, normalized?: boolean);
}
declare class Uint16BufferAttribute extends BufferAttribute {
    constructor(array: any, itemSize: any, normalized?: boolean);
}
declare class Int32BufferAttribute extends BufferAttribute {
    constructor(array: any, itemSize: any, normalized?: boolean);
}
declare class Uint32BufferAttribute extends BufferAttribute {
    constructor(array: any, itemSize: any, normalized?: boolean);
}
declare class Float32BufferAttribute extends BufferAttribute {
    constructor(array: any, itemSize: any, normalized?: boolean);
}
declare class Float64BufferAttribute extends BufferAttribute {
    constructor(array: any, itemSize: any, normalized?: boolean);
}
export { BufferAttribute, Float64BufferAttribute, Float32BufferAttribute, Uint32BufferAttribute, Int32BufferAttribute, Uint16BufferAttribute, Int16BufferAttribute, Uint8ClampedBufferAttribute, Uint8BufferAttribute, Int8BufferAttribute };
