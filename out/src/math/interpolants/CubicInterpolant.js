define(["require", "exports", "./Interpolant", "../../constants"], function (require, exports, Interpolant_1, constants_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function CubicInterpolant(parameterPositions, sampleValues, sampleSize, resultBuffer) {
        Interpolant_1.Interpolant.call(this, parameterPositions, sampleValues, sampleSize, resultBuffer);
        this._weightPrev = -0;
        this._offsetPrev = -0;
        this._weightNext = -0;
        this._offsetNext = -0;
    }
    exports.CubicInterpolant = CubicInterpolant;
    CubicInterpolant.prototype = Object.assign(Object.create(Interpolant_1.Interpolant.prototype), {
        constructor: CubicInterpolant,
        DefaultSettings_: {
            endingStart: constants_1.ZeroCurvatureEnding,
            endingEnd: constants_1.ZeroCurvatureEnding
        },
        intervalChanged_: function (i1, t0, t1) {
            var pp = this.parameterPositions, iPrev = i1 - 2, iNext = i1 + 1, tPrev = pp[iPrev], tNext = pp[iNext];
            if (tPrev === undefined) {
                switch (this.getSettings_().endingStart) {
                    case constants_1.ZeroSlopeEnding:
                        iPrev = i1;
                        tPrev = 2 * t0 - t1;
                        break;
                    case constants_1.WrapAroundEnding:
                        iPrev = pp.length - 2;
                        tPrev = t0 + pp[iPrev] - pp[iPrev + 1];
                        break;
                    default:
                        iPrev = i1;
                        tPrev = t1;
                }
            }
            if (tNext === undefined) {
                switch (this.getSettings_().endingEnd) {
                    case constants_1.ZeroSlopeEnding:
                        iNext = i1;
                        tNext = 2 * t1 - t0;
                        break;
                    case constants_1.WrapAroundEnding:
                        iNext = 1;
                        tNext = t1 + pp[1] - pp[0];
                        break;
                    default:
                        iNext = i1 - 1;
                        tNext = t0;
                }
            }
            var halfDt = (t1 - t0) * 0.5, stride = this.valueSize;
            this._weightPrev = halfDt / (t0 - tPrev);
            this._weightNext = halfDt / (tNext - t1);
            this._offsetPrev = iPrev * stride;
            this._offsetNext = iNext * stride;
        },
        interpolate_: function (i1, t0, t, t1) {
            var result = this.resultBuffer, values = this.sampleValues, stride = this.valueSize, o1 = i1 * stride, o0 = o1 - stride, oP = this._offsetPrev, oN = this._offsetNext, wP = this._weightPrev, wN = this._weightNext, p = (t - t0) / (t1 - t0), pp = p * p, ppp = pp * p;
            var sP = -wP * ppp + 2 * wP * pp - wP * p;
            var s0 = (1 + wP) * ppp + (-1.5 - 2 * wP) * pp + (-0.5 + wP) * p + 1;
            var s1 = (-1 - wN) * ppp + (1.5 + wN) * pp + 0.5 * p;
            var sN = wN * ppp - wN * pp;
            for (var i = 0; i !== stride; ++i) {
                result[i] =
                    sP * values[oP + i] +
                        s0 * values[o0 + i] +
                        s1 * values[o1 + i] +
                        sN * values[oN + i];
            }
            return result;
        }
    });
});
//# sourceMappingURL=CubicInterpolant.js.map