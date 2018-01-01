import { Vector3 } from '../math/Vector3';
declare class Triangle {
    a: Vector3;
    b: Vector3;
    c: Vector3;
    constructor(a?: Vector3, b?: Vector3, c?: Vector3);
    static normal(a: any, b: any, c: any, optionalTarget: any): any;
    static barycoordFromPoint(point: any, a: any, b: any, c: any, optionalTarget: any): any;
    static containsPoint(point: any, a: any, b: any, c: any): boolean;
    set(a: any, b: any, c: any): this;
    setFromPointsAndIndices(points: any, i0: any, i1: any, i2: any): this;
    clone(): Triangle;
    copy(triangle: any): this;
    area(): number;
    midpoint(optionalTarget: any): any;
    normal(optionalTarget: any): any;
    plane(optionalTarget: any): any;
    barycoordFromPoint(point: any, optionalTarget: any): any;
    containsPoint(point: any): boolean;
    closestPointToPoint(point: any, optionalTarget: any): any;
    equals(triangle: any): any;
}
export { Triangle };
