import { Vector2 } from '../math/Vector2';
declare class Box2 {
    min: Vector2;
    max: Vector2;
    constructor(min?: Vector2, max?: Vector2);
    set(min: any, max: any): Box2;
    setFromPoints(points: any): Box2;
    setFromCenterAndSize(center: any, size: any): Box2;
    clone(): Box2;
    copy(box: any): Box2;
    makeEmpty(): Box2;
    isEmpty(): boolean;
    getCenter(optionalTarget: any): Vector2;
    getSize(optionalTarget: any): Vector2;
    expandByPoint(point: any): Box2;
    expandByVector(vector: any): Box2;
    expandByScalar(scalar: any): Box2;
    containsPoint(point: any): boolean;
    containsBox(box: any): boolean;
    getParameter(point: any, optionalTarget: any): Vector2;
    intersectsBox(box: any): boolean;
    clampPoint(point: any, optionalTarget: any): Vector2;
    distanceToPoint(point: any): number;
    intersect(box: any): Box2;
    union(box: any): Box2;
    translate(offset: any): Box2;
    equals(box: any): boolean;
}
export { Box2 };
