import { Curve } from '../core/Curve.js';
declare class SplineCurve extends Curve {
    points: any;
    constructor(points: any);
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
export { SplineCurve };
