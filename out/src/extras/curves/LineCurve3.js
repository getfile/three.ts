define(["require", "exports", "../../math/Vector3.js", "../core/Curve.js"], function (require, exports, Vector3_js_1, Curve_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class LineCurve3 extends Curve_js_1.Curve {
        constructor(v1, v2) {
            super();
            this.type = 'LineCurve3';
            this.v1 = v1 || new Vector3_js_1.Vector3();
            this.v2 = v2 || new Vector3_js_1.Vector3();
        }
        getPoint(t, optionalTarget) {
            var point = optionalTarget || new Vector3_js_1.Vector3();
            if (t === 1) {
                point.copy(this.v2);
            }
            else {
                point.copy(this.v2).sub(this.v1);
                point.multiplyScalar(t).add(this.v1);
            }
            return point;
        }
        getPointAt(u, optionalTarget) {
            return this.getPoint(u, optionalTarget);
        }
        copy(source) {
            super.copy(source);
            this.v1.copy(source.v1);
            this.v2.copy(source.v2);
            return this;
        }
        toJSON() {
            var data = super.toJSON();
            data.v1 = this.v1.toArray();
            data.v2 = this.v2.toArray();
            return data;
        }
        fromJSON(json) {
            super.fromJSON(json);
            this.v1.fromArray(json.v1);
            this.v2.fromArray(json.v2);
            return this;
        }
    }
    exports.LineCurve3 = LineCurve3;
});
//# sourceMappingURL=LineCurve3.js.map