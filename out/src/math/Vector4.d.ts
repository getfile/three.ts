import { Matrix4 } from './Matrix4';
import { Quaternion } from './Quaternion';
import { BufferAttribute } from '../core/BufferAttribute';
declare class Vector4 {
    x: number;
    y: number;
    z: number;
    w: number;
    constructor(x?: number, y?: number, z?: number, w?: number);
    set(x: number, y: number, z: number, w: number): Vector4;
    setScalar(scalar: number): Vector4;
    setX(x: number): Vector4;
    setY(y: number): Vector4;
    setZ(z: number): Vector4;
    setW(w: number): Vector4;
    setComponent(index: number, value: number): Vector4;
    getComponent(index: number): number;
    clone(): Vector4;
    copy(v: Vector4): Vector4;
    add(v: Vector4, w?: Vector4): Vector4;
    addScalar(s: number): Vector4;
    addVectors(a: Vector4, b: Vector4): Vector4;
    addScaledVector(v: Vector4, s: number): Vector4;
    sub(v: Vector4, w: Vector4): Vector4;
    subScalar(s: number): Vector4;
    subVectors(a: Vector4, b: Vector4): Vector4;
    multiplyScalar(scalar: number): Vector4;
    applyMatrix4(m: Matrix4): Vector4;
    divideScalar(scalar: number): Vector4;
    setAxisAngleFromQuaternion(q: Quaternion): Vector4;
    setAxisAngleFromRotationMatrix(m: Matrix4): Vector4;
    min(v: Vector4): Vector4;
    max(v: Vector4): Vector4;
    clamp(min: Vector4, max: Vector4): Vector4;
    clampScalar(minVal: number, maxVal: number): Vector4;
    clampLength(min: number, max: number): Vector4;
    floor(): Vector4;
    ceil(): Vector4;
    round(): Vector4;
    roundToZero(): Vector4;
    negate(): Vector4;
    dot(v: Vector4): number;
    lengthSq(): number;
    length(): number;
    manhattanLength(): number;
    normalize(): Vector4;
    setLength(length: number): Vector4;
    lerp(v: Vector4, alpha: number): Vector4;
    lerpVectors(v1: Vector4, v2: Vector4, alpha: number): Vector4;
    equals(v: Vector4): boolean;
    fromArray(array: number[], offset?: number): Vector4;
    toArray(array: number[], offset?: number): number[];
    fromBufferAttribute(attribute: BufferAttribute, index: number): Vector4;
}
export { Vector4 };
