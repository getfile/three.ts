import { Curve } from '../core/Curve';
declare class EllipseCurve extends Curve {
    aX: any;
    aY: any;
    xRadius: any;
    yRadius: any;
    aStartAngle: any;
    aEndAngle: any;
    aClockwise: any;
    aRotation: any;
    constructor(aX: any, aY: any, xRadius: any, yRadius: any, aStartAngle: any, aEndAngle: any, aClockwise: any, aRotation?: any);
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
export { EllipseCurve };
