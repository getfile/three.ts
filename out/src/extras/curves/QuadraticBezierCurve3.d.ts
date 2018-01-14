import { Curve } from '../core/Curve';
declare class QuadraticBezierCurve3 extends Curve {
    v0: any;
    v1: any;
    v2: any;
    constructor(v0: any, v1: any, v2: any);
    getPoint(t: any, optionalTarget: any): any;
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
export { QuadraticBezierCurve3 };
