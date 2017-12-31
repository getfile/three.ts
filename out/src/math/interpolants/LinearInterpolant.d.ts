import { Interpolant } from './Interpolant';
declare class LinearInterpolant extends Interpolant {
    constructor(parameterPositions: any, sampleValues: any, sampleSize: any, resultBuffer: any);
    interpolate_(i1: any, t0: any, t: any, t1: any): any;
}
export { LinearInterpolant };
