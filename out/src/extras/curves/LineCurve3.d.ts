import { Vector3 } from '../../math/Vector3.js';
import { Curve } from '../core/Curve.js';
declare class LineCurve3 extends Curve {
    v1: Vector3;
    v2: Vector3;
    constructor(v1: any, v2: any);
    getPoint(t: any, optionalTarget: any): any;
    getPointAt(u: any, optionalTarget: any): any;
    copy(source: any): this;
    toJSON(): {
        metadata: {
            version: number;
            type: string;
            generator: string;
        };
    };
    fromJSON(json: any): this;
}
export { LineCurve3 };
