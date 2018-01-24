import { Box3 } from './Box3';
import { Vector3 } from '../math/Vector3';
import { Plane } from './Plane';
import { Matrix4 } from '../math/Matrix4';
declare class Sphere {
    center: Vector3;
    radius: number;
    constructor(center?: Vector3, radius?: number);
    set(center: Vector3, radius: number): Sphere;
    setFromPoints(points: Vector3[], optionalCenter?: Vector3): Sphere;
    clone(): Sphere;
    copy(sphere: Sphere): Sphere;
    empty(): boolean;
    containsPoint(point: any): boolean;
    distanceToPoint(point: Vector3): number;
    intersectsSphere(sphere: Sphere): boolean;
    intersectsBox(box: Box3): boolean;
    intersectsPlane(plane: Plane): boolean;
    clampPoint(point: Vector3, optionalTarget?: Vector3): Vector3;
    getBoundingBox(optionalTarget?: Box3): Box3;
    applyMatrix4(matrix: Matrix4): Sphere;
    translate(offset: Vector3): Sphere;
    equals(sphere: Sphere): boolean;
}
export { Sphere };
