define(["require", "exports", "../core/Curve", "../core/Interpolations", "../../math/Vector2"], function (require, exports, Curve_1, Interpolations_1, Vector2_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class QuadraticBezierCurve extends Curve_1.Curve {
        constructor(v0, v1, v2) {
            super();
            this.type = 'QuadraticBezierCurve';
            this.v0 = v0 || new Vector2_1.Vector2();
            this.v1 = v1 || new Vector2_1.Vector2();
            this.v2 = v2 || new Vector2_1.Vector2();
        }
        getPoint(t, optionalTarget) {
            var point = optionalTarget || new Vector2_1.Vector2();
            var v0 = this.v0, v1 = this.v1, v2 = this.v2;
            point.set(Interpolations_1.QuadraticBezier(t, v0.x, v1.x, v2.x), Interpolations_1.QuadraticBezier(t, v0.y, v1.y, v2.y));
            return point;
        }
        copy(source) {
            super.copy(source);
            this.v0.copy(source.v0);
            this.v1.copy(source.v1);
            this.v2.copy(source.v2);
            return this;
        }
        toJSON() {
            var data = super.toJSON();
            data.v0 = this.v0.toArray();
            data.v1 = this.v1.toArray();
            data.v2 = this.v2.toArray();
            return data;
        }
        fromJSON(json) {
            super.fromJSON(json);
            this.v0.fromArray(json.v0);
            this.v1.fromArray(json.v1);
            this.v2.fromArray(json.v2);
            return this;
        }
    }
    exports.QuadraticBezierCurve = QuadraticBezierCurve;
});
//# sourceMappingURL=QuadraticBezierCurve.js.map