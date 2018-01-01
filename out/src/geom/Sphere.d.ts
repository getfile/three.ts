import { Vector3 } from '../math/Vector3';
declare class Sphere {
    center: Vector3;
    radius: number;
    constructor(center?: Vector3, radius?: number);
    set(center: any, radius: any): this;
    setFromPoints(points: any, optionalCenter: any): this;
    clone(): Sphere;
    copy(sphere: any): this;
    empty(): boolean;
    containsPoint(point: any): boolean;
    distanceToPoint(point: any): number;
    intersectsSphere(sphere: any): boolean;
    intersectsBox(box: any): any;
    intersectsPlane(plane: any): boolean;
    clampPoint(point: any, optionalTarget: any): any;
    getBoundingBox(optionalTarget: any): any;
    applyMatrix4(matrix: any): this;
    translate(offset: any): this;
    equals(sphere: any): boolean;
}
export { Sphere };
