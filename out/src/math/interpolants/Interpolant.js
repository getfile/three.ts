define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Interpolant {
        constructor(parameterPositions, sampleValues, sampleSize, resultBuffer) {
            this.DefaultSettings_ = {};
            this.parameterPositions = parameterPositions;
            this._cachedIndex = 0;
            this.resultBuffer = resultBuffer !== undefined ? resultBuffer : new sampleValues.constructor(sampleSize);
            this.sampleValues = sampleValues;
            this.valueSize = sampleSize;
        }
        evaluate(t) {
            let pp = this.parameterPositions, i1 = this._cachedIndex, t1 = pp[i1], t0 = pp[i1 - 1];
            validate_interval: {
                seek: {
                    let right;
                    linear_scan: {
                        forward_scan: if (!(t < t1)) {
                            for (let giveUpAt = i1 + 2;;) {
                                if (t1 === undefined) {
                                    if (t < t0)
                                        break forward_scan;
                                    i1 = pp.length;
                                    this._cachedIndex = i1;
                                    return this.afterEnd_(i1 - 1, t, t0);
                                }
                                if (i1 === giveUpAt)
                                    break;
                                t0 = t1;
                                t1 = pp[++i1];
                                if (t < t1) {
                                    break seek;
                                }
                            }
                            right = pp.length;
                            break linear_scan;
                        }
                        if (!(t >= t0)) {
                            let t1global = pp[1];
                            if (t < t1global) {
                                i1 = 2;
                                t0 = t1global;
                            }
                            for (let giveUpAt = i1 - 2;;) {
                                if (t0 === undefined) {
                                    this._cachedIndex = 0;
                                    return this.beforeStart_(0, t, t1);
                                }
                                if (i1 === giveUpAt)
                                    break;
                                t1 = t0;
                                t0 = pp[--i1 - 1];
                                if (t >= t0) {
                                    break seek;
                                }
                            }
                            right = i1;
                            i1 = 0;
                            break linear_scan;
                        }
                        break validate_interval;
                    }
                    while (i1 < right) {
                        let mid = (i1 + right) >>> 1;
                        if (t < pp[mid])
                            right = mid;
                        else
                            i1 = mid + 1;
                    }
                    t1 = pp[i1];
                    t0 = pp[i1 - 1];
                    if (t0 === undefined) {
                        this._cachedIndex = 0;
                        return this.beforeStart_(0, t, t1);
                    }
                    if (t1 === undefined) {
                        i1 = pp.length;
                        this._cachedIndex = i1;
                        return this.afterEnd_(i1 - 1, t0, t);
                    }
                }
                this._cachedIndex = i1;
                this.intervalChanged_(i1, t0, t1);
            }
            return this.interpolate_(i1, t0, t, t1);
        }
        getSettings_() {
            return this.settings || this.DefaultSettings_;
        }
        copySampleValue_(index) {
            let result = this.resultBuffer, values = this.sampleValues, stride = this.valueSize, offset = index * stride;
            for (let i = 0; i !== stride; ++i)
                result[i] = values[offset + i];
            return result;
        }
        interpolate_(i1, t0, t, t1) {
            throw new Error('call to abstract method');
        }
        intervalChanged_() {
        }
        beforeStart() {
        }
        afterEnd() {
        }
    }
    exports.Interpolant = Interpolant;
});
//# sourceMappingURL=Interpolant.js.map