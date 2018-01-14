declare class Curve {
    type: any;
    arcLengthDivisions: any;
    constructor();
    getPoint(t: any, optionalTarget?: any): any;
    getPointAt(u: any, optionalTarget?: any): any;
    getPoints(divisions: any): any[];
    getSpacedPoints(divisions: any): any[];
    getLength(): any;
    getLengths(divisions?: any): any;
    needsUpdate: any;
    cacheArcLengths: any;
    updateArcLengths(): void;
    getUtoTmapping(u: any, distance?: any): number;
    getTangent(t: any): any;
    getTangentAt(u: any): any;
    computeFrenetFrames(segments: any, closed: any): {
        tangents: any[];
        normals: any[];
        binormals: any[];
    };
    clone(): Curve;
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
export { Curve };
