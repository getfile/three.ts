import { Matrix4 } from './Matrix4';
import { BufferAttribute } from '../core/BufferAttribute';
declare class Matrix3 {
    elements: Array<number>;
    constructor();
    set(n11: number, n12: number, n13: number, n21: number, n22: number, n23: number, n31: number, n32: number, n33: number): Matrix3;
    identity(): Matrix3;
    clone(): Matrix3;
    copy(m: Matrix3): Matrix3;
    setFromMatrix4(m: Matrix4): Matrix3;
    applyToBufferAttribute(attribute: BufferAttribute): BufferAttribute;
    multiply(m: Matrix3): Matrix3;
    premultiply(m: Matrix3): Matrix3;
    multiplyMatrices(a: Matrix3, b: Matrix3): Matrix3;
    multiplyScalar(s: number): Matrix3;
    determinant(): number;
    getInverse(matrix: Matrix3, throwOnDegenerate?: boolean): Matrix3;
    transpose(): Matrix3;
    getNormalMatrix(matrix4: Matrix4): Matrix3;
    transposeIntoArray(r: number[]): Matrix3;
    setUvTransform(tx: number, ty: number, sx: number, sy: number, rotation: number, cx: number, cy: number): void;
    scale(sx: number, sy: number): Matrix3;
    rotate(theta: number): Matrix3;
    translate(tx: number, ty: number): Matrix3;
    equals(matrix: Matrix3): boolean;
    fromArray(array: number[], offset?: number): Matrix3;
    toArray(array: number[], offset?: number): number[];
}
export { Matrix3 };
