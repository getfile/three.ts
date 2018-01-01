declare class Matrix3 {
    elements: Array<number>;
    constructor();
    set(n11: any, n12: any, n13: any, n21: any, n22: any, n23: any, n31: any, n32: any, n33: any): this;
    identity(): this;
    clone(): Matrix3;
    copy(m: any): this;
    setFromMatrix4(m: any): this;
    applyToBufferAttribute(attribute: any): any;
    multiply(m: any): this;
    premultiply(m: any): this;
    multiplyMatrices(a: any, b: any): this;
    multiplyScalar(s: any): this;
    determinant(): number;
    getInverse(matrix: any, throwOnDegenerate?: boolean): this;
    transpose(): this;
    getNormalMatrix(matrix4: any): this;
    transposeIntoArray(r: any): this;
    setUvTransform(tx: any, ty: any, sx: any, sy: any, rotation: any, cx: any, cy: any): void;
    scale(sx: any, sy: any): this;
    rotate(theta: any): this;
    translate(tx: any, ty: any): this;
    equals(matrix: any): boolean;
    fromArray(array: any, offset?: number): this;
    toArray(array: any, offset: any): any;
}
export { Matrix3 };
