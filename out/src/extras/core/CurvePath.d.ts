import { Curve } from './Curve';
declare class CurvePath extends Curve {
    curves: any;
    autoClose: any;
    cacheLengths: any;
    constructor();
    add(curve: any): void;
    closePath(): void;
    getPoint(t: any): any;
    getLength(): any;
    updateArcLengths(): void;
    getCurveLengths(): any;
    getSpacedPoints(divisions: any): any[];
    getPoints(divisions: any): any[];
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
export { CurvePath };
