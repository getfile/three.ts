declare class Interpolant {
    parameterPositions: any;
    private _cachedIndex;
    resultBuffer: any;
    sampleValues: any;
    valueSize: any;
    constructor(parameterPositions: any, sampleValues: any, sampleSize: any, resultBuffer: any);
    evaluate(t: any): any;
    DefaultSettings_: {};
    settings: any;
    getSettings_(): any;
    copySampleValue_(index: any): any;
    interpolate_(i1: any, t0: any, t: any, t1: any): void;
    intervalChanged_(): void;
    beforeStart(): void;
    afterEnd(): void;
}
export { Interpolant };
