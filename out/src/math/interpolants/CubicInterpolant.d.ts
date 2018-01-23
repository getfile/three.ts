import { Interpolant } from './Interpolant';
declare class CubicInterpolant extends Interpolant {
    _weightPrev: number;
    _weightNext: number;
    _offsetPrev: number;
    _offsetNext: number;
    constructor(parameterPositions: any, sampleValues: any, sampleSize: any, resultBuffer: any);
    intervalChanged_(i1: any, t0: any, t1: any): void;
    interpolate_(i1: any, t0: any, t: any, t1: any): any;
}
export { CubicInterpolant };
