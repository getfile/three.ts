import { Vector3 } from '../math/Vector3';
declare class Plane {
    normal: Vector3;
    constant: number;
    constructor(normal?: Vector3, constant?: number);
    set(normal: any, constant: any): this;
    setComponents(x: any, y: any, z: any, w: any): this;
    setFromNormalAndCoplanarPoint(normal: any, point: any): this;
    setFromCoplanarPoints(a: any, b: any, c: any): this;
    clone(): Plane;
    copy(plane: any): this;
    normalize(): this;
    negate(): this;
    distanceToPoint(point: any): number;
    distanceToSphere(sphere: any): number;
    projectPoint(point: any, optionalTarget: any): any;
    intersectLine(line: any, optionalTarget: any): any;
    intersectsLine(line: any): boolean;
    intersectsBox(box: any): any;
    intersectsSphere(sphere: any): any;
    coplanarPoint(optionalTarget: any): any;
    applyMatrix4(matrix: any, optionalNormalMatrix: any): this;
    translate(offset: any): this;
    equals(plane: any): boolean;
}
export { Plane };
