import { Plane } from './Plane';
declare class Frustum {
    planes: Array<Plane>;
    constructor(p0?: Plane, p1?: Plane, p2?: Plane, p3?: Plane, p4?: Plane, p5?: Plane);
    set(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): this;
    clone(): Frustum;
    copy(frustum: any): this;
    setFromMatrix(m: any): this;
    intersectsObject(object: any): boolean;
    intersectsSprite(sprite: any): boolean;
    intersectsSphere(sphere: any): boolean;
    intersectsBox(box: any): boolean;
    containsPoint(point: any): boolean;
}
export { Frustum };
