declare class Quaternion {
    private onChangeCallback;
    private _x;
    private _y;
    private _z;
    private _w;
    constructor(x?: number, y?: number, z?: number, w?: number);
    slerpFlat(dst: any, dstOffset: any, src0: any, srcOffset0: any, src1: any, srcOffset1: any, t: any): void;
    x: number;
    y: number;
    z: number;
    w: number;
    set(x: number, y: number, z: number, w: number): Quaternion;
    clone(): Quaternion;
    copy(quaternion: Quaternion): Quaternion;
    setFromEuler(euler: any, update?: boolean): this;
    setFromAxisAngle(axis: any, angle: any): this;
    setFromRotationMatrix(m: any): this;
    setFromUnitVectors(vFrom: any, vTo: any): this;
    inverse(): this;
    conjugate(): this;
    dot(v: any): number;
    lengthSq(): number;
    length(): number;
    normalize(): this;
    multiply(q: any): this;
    premultiply(q: any): this;
    multiplyQuaternions(a: any, b: any): this;
    slerp(qb: any, t: any): Quaternion;
    equals(quaternion: any): boolean;
    fromArray(array: any, offset: any): this;
    toArray(array: any, offset: any): any;
    onChange(callback: any): this;
}
export { Quaternion };
