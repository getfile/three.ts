import { Vector2 } from '../../math/Vector2.js';
import { Curve } from '../core/Curve.js';
declare class LineCurve extends Curve {
    v1: Vector2;
    v2: Vector2;
    constructor(v1: any, v2: any);
    getPoint(t: any, optionalTarget: any): any;
    getPointAt(u: any, optionalTarget: any): any;
    getTangent(): Vector2;
    copy(source: any): this;
    toJSON(): any;
    fromJSON(json: any): this;
}
export { LineCurve };
