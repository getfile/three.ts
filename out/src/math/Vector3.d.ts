import { Matrix4 } from './Matrix4';
declare class Vector3 {
    x: number;
    y: number;
    z: number;
    isVector3: boolean;
    constructor(x?: number, y?: number, z?: number);
    set(x: any, y: any, z: any): Vector3;
    setScalar(scalar: any): Vector3;
    setX(x: any): Vector3;
    setY(y: any): Vector3;
    setZ(z: any): Vector3;
    setComponent(index: number, value: number): Vector3;
    getComponent(index: any): number;
    clone(): Vector3;
    copy(v: Vector3): Vector3;
    add(v: Vector3, w?: Vector3): Vector3;
    addScalar(s: any): Vector3;
    addVectors(a: Vector3, b: Vector3): Vector3;
    addScaledVector(v: Vector3, s: any): Vector3;
    sub(v: Vector3, w?: Vector3): Vector3;
    subScalar(s: any): Vector3;
    subVectors(a: Vector3, b: Vector3): Vector3;
    multiply(v: Vector3, w: Vector3): Vector3;
    multiplyScalar(scalar: any): Vector3;
    multiplyVectors(a: Vector3, b: Vector3): Vector3;
    applyEuler(euler: any): this;
    applyAxisAngle(axis: any, angle: any): this;
    applyMatrix3(m: any): this;
    applyMatrix4(m: any): this;
    applyQuaternion(q: any): this;
    project(camera: any): this;
    unproject(camera: any): this;
    transformDirection(m: any): Vector3;
    divide(v: any): this;
    divideScalar(scalar: any): Vector3;
    min(v: any): this;
    max(v: any): this;
    clamp(min: any, max: any): this;
    clampScalar(minVal: any, maxVal: any): this;
    clampLength(min: any, max: any): Vector3;
    floor(): this;
    ceil(): this;
    round(): this;
    roundToZero(): this;
    negate(): this;
    dot(v: any): number;
    lengthSq(): number;
    length(): number;
    manhattanLength(): number;
    normalize(): Vector3;
    setLength(length: any): Vector3;
    lerp(v: any, alpha: any): this;
    lerpVectors(v1: any, v2: any, alpha: any): Vector3;
    cross(v: any, w: any): this;
    crossVectors(a: any, b: any): this;
    projectOnVector(vector: any): Vector3;
    projectOnPlane(planeNormal: any): Vector3;
    reflect(normal: any): Vector3;
    angleTo(v: any): number;
    distanceTo(v: any): number;
    distanceToSquared(v: any): number;
    manhattanDistanceTo(v: any): number;
    setFromSpherical(s: any): this;
    setFromCylindrical(c: any): this;
    setFromMatrixPosition(m: any): this;
    setFromMatrixScale(m: any): this;
    setFromMatrixColumn(m: Matrix4, index: any): this;
    equals(v: Vector3): boolean;
    fromArray(array: any, offset: any): this;
    toArray(array: any, offset: any): any;
    fromBufferAttribute(attribute: any, index: any, offset: any): this;
}
export { Vector3 };
