declare class Interpolant {
    parameterPositions: any;
    sampleValues: any;
    valueSize: number;
    defaultSettings_: {};
    settings: any;
    resultBuffer: any;
    private _cachedIndex;
    constructor(parameterPositions: any, sampleValues: any, sampleSize: number, resultBuffer?: any);
    evaluate(t: number): any;
    getSettings_(): any;
    copySampleValue_(index: any): any;
    interpolate_(i1: any, t0: any, t: any, t1: any): void;
    intervalChanged_(i1: any, t0: any, t1: any): void;
}
export { Interpolant };
