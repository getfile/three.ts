import { Vector3 } from '../math/Vector3';
declare class Line3 {
    start: Vector3;
    end: Vector3;
    constructor(start?: Vector3, end?: Vector3);
    set(start: any, end: any): Line3;
    clone(): Line3;
    copy(line: any): Line3;
    getCenter(optionalTarget: any): any;
    delta(optionalTarget: any): any;
    distanceSq(): number;
    distance(): number;
    at(t: any, optionalTarget: any): any;
    closestPointToPointParameter(point: any, clampToLine: any): number;
    closestPointToPoint(point: any, clampToLine: any, optionalTarget: any): any;
    applyMatrix4(matrix: any): Line3;
    equals(line: any): any;
}
export { Line3 };
