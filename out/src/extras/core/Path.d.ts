import { CurvePath } from './CurvePath';
declare class Path extends CurvePath {
    currentPoint: any;
    constructor(points?: any);
    setFromPoints(points: any): void;
    moveTo(x: any, y: any): void;
    lineTo(x: any, y: any): void;
    quadraticCurveTo(aCPx: any, aCPy: any, aX: any, aY: any): void;
    bezierCurveTo(aCP1x: any, aCP1y: any, aCP2x: any, aCP2y: any, aX: any, aY: any): void;
    splineThru(pts: any): void;
    arc(aX: any, aY: any, aRadius: any, aStartAngle: any, aEndAngle: any, aClockwise: any): void;
    absarc(aX: any, aY: any, aRadius: any, aStartAngle: any, aEndAngle: any, aClockwise: any): void;
    ellipse(aX: any, aY: any, xRadius: any, yRadius: any, aStartAngle: any, aEndAngle: any, aClockwise: any, aRotation: any): void;
    absellipse(aX: any, aY: any, xRadius: any, yRadius: any, aStartAngle: any, aEndAngle: any, aClockwise: any, aRotation?: any): void;
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
export { Path };
