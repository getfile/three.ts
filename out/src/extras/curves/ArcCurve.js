define(["require", "exports", "./EllipseCurve"], function (require, exports, EllipseCurve_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ArcCurve extends EllipseCurve_1.EllipseCurve {
        constructor(aX, aY, aRadius, aStartAngle, aEndAngle, aClockwise) {
            super(aX, aY, aRadius, aRadius, aStartAngle, aEndAngle, aClockwise);
            this.type = 'ArcCurve';
        }
    }
    exports.ArcCurve = ArcCurve;
});
//# sourceMappingURL=ArcCurve.js.map