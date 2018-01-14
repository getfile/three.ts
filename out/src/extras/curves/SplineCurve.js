define(["require", "exports", "../core/Curve.js", "../core/Interpolations.js", "../../math/Vector2.js"], function (require, exports, Curve_js_1, Interpolations_js_1, Vector2_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class SplineCurve extends Curve_js_1.Curve {
        constructor(points) {
            super();
            this.type = 'SplineCurve';
            this.points = points || [];
        }
        getPoint(t, optionalTarget) {
            var point = optionalTarget || new Vector2_js_1.Vector2();
            var points = this.points;
            var p = (points.length - 1) * t;
            var intPoint = Math.floor(p);
            var weight = p - intPoint;
            var p0 = points[intPoint === 0 ? intPoint : intPoint - 1];
            var p1 = points[intPoint];
            var p2 = points[intPoint > points.length - 2 ? points.length - 1 : intPoint + 1];
            var p3 = points[intPoint > points.length - 3 ? points.length - 1 : intPoint + 2];
            point.set(Interpolations_js_1.CatmullRom(weight, p0.x, p1.x, p2.x, p3.x), Interpolations_js_1.CatmullRom(weight, p0.y, p1.y, p2.y, p3.y));
            return point;
        }
        ;
        copy(source) {
            super.copy(source);
            this.points = [];
            for (var i = 0, l = source.points.length; i < l; i++) {
                var point = source.points[i];
                this.points.push(point.clone());
            }
            return this;
        }
        ;
        toJSON() {
            var data = super.toJSON();
            data.points = [];
            for (var i = 0, l = this.points.length; i < l; i++) {
                var point = this.points[i];
                data.points.push(point.toArray());
            }
            return data;
        }
        fromJSON(json) {
            super.fromJSON(json);
            this.points = [];
            for (var i = 0, l = json.points.length; i < l; i++) {
                var point = json.points[i];
                this.points.push(new Vector2_js_1.Vector2().fromArray(point));
            }
            return this;
        }
    }
    exports.SplineCurve = SplineCurve;
});
//# sourceMappingURL=SplineCurve.js.map