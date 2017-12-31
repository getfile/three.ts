define(["require", "exports", "./Interpolant"], function (require, exports, Interpolant_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class LinearInterpolant extends Interpolant_1.Interpolant {
        constructor(parameterPositions, sampleValues, sampleSize, resultBuffer) {
            super(parameterPositions, sampleValues, sampleSize, resultBuffer);
        }
        interpolate_(i1, t0, t, t1) {
            var result = this.resultBuffer, values = this.sampleValues, stride = this.valueSize, offset1 = i1 * stride, offset0 = offset1 - stride, weight1 = (t - t0) / (t1 - t0), weight0 = 1 - weight1;
            for (var i = 0; i !== stride; ++i) {
                result[i] =
                    values[offset0 + i] * weight0 +
                        values[offset1 + i] * weight1;
            }
            return result;
        }
    }
    exports.LinearInterpolant = LinearInterpolant;
});
//# sourceMappingURL=LinearInterpolant.js.map