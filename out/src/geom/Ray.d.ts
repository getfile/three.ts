import { Vector3 } from '../math/Vector3';
declare class Ray {
    origin: Vector3;
    direction: Vector3;
    constructor(origin?: Vector3, direction?: Vector3);
    set(origin: any, direction: any): this;
    clone(): Ray;
    copy(ray: any): this;
    at(t: any, optionalTarget: any): any;
    lookAt(v: any): this;
    recast(t: any): this;
    closestPointToPoint(point: any, optionalTarget: any): any;
    distanceToPoint(point: any): number;
    distanceSqToPoint(point: any): number;
    distanceSqToSegment(v0: any, v1: any, optionalPointOnRay: any, optionalPointOnSegment: any): any;
    intersectSphere(sphere: any, optionalTarget: any): any;
    intersectsSphere(sphere: any): boolean;
    distanceToPlane(plane: any): number;
    intersectPlane(plane: any, optionalTarget: any): any;
    intersectsPlane(plane: any): boolean;
    intersectBox(box: any, optionalTarget: any): any;
    intersectsBox(box: any): boolean;
    intersectTriangle(a: any, b: any, c: any, backfaceCulling: any, optionalTarget: any): any;
    applyMatrix4(matrix4: any): this;
    equals(ray: any): any;
}
export { Ray };
