define(["require", "exports", "./Curve", "../curves/Curves"], function (require, exports, Curve_1, Curves) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class CurvePath extends Curve_1.Curve {
        constructor() {
            super();
            this.type = 'CurvePath';
            this.curves = [];
            this.autoClose = false;
        }
        add(curve) {
            this.curves.push(curve);
        }
        closePath() {
            var startPoint = this.curves[0].getPoint(0);
            var endPoint = this.curves[this.curves.length - 1].getPoint(1);
            if (!startPoint.equals(endPoint))
                this.curves.push(new Curves['LineCurve'](endPoint, startPoint));
        }
        getPoint(t) {
            var d = t * this.getLength();
            var curveLengths = this.getCurveLengths();
            var i = 0;
            while (i < curveLengths.length) {
                if (curveLengths[i] >= d) {
                    var diff = curveLengths[i] - d;
                    var curve = this.curves[i];
                    var segmentLength = curve.getLength();
                    var u = segmentLength === 0 ? 0 : 1 - diff / segmentLength;
                    return curve.getPointAt(u);
                }
                i++;
            }
            return null;
        }
        getLength() {
            var lens = this.getCurveLengths();
            return lens[lens.length - 1];
        }
        updateArcLengths() {
            this.needsUpdate = true;
            this.cacheLengths = null;
            this.getCurveLengths();
        }
        getCurveLengths() {
            if (this.cacheLengths && this.cacheLengths.length === this.curves.length)
                return this.cacheLengths;
            var lengths = [], sums = 0;
            for (var i = 0, l = this.curves.length; i < l; i++) {
                sums += this.curves[i].getLength();
                lengths.push(sums);
            }
            this.cacheLengths = lengths;
            return lengths;
        }
        getSpacedPoints(divisions) {
            if (divisions === undefined)
                divisions = 40;
            var points = [];
            for (var i = 0; i <= divisions; i++)
                points.push(this.getPoint(i / divisions));
            if (this.autoClose)
                points.push(points[0]);
            return points;
        }
        getPoints(divisions) {
            divisions = divisions || 12;
            var points = [], last;
            for (var i = 0, curves = this.curves; i < curves.length; i++) {
                var curve = curves[i];
                var resolution = (curve && curve.isEllipseCurve) ? divisions * 2
                    : (curve && curve.isLineCurve) ? 1
                        : (curve && curve.isSplineCurve) ? divisions * curve.points.length
                            : divisions;
                var pts = curve.getPoints(resolution);
                for (var j = 0; j < pts.length; j++) {
                    var point = pts[j];
                    if (last && last.equals(point))
                        continue;
                    points.push(point);
                    last = point;
                }
            }
            if (this.autoClose && points.length > 1 && !points[points.length - 1].equals(points[0]))
                points.push(points[0]);
            return points;
        }
        copy(source) {
            super.copy(source);
            this.curves = [];
            for (var i = 0, l = source.curves.length; i < l; i++) {
                var curve = source.curves[i];
                this.curves.push(curve.clone());
            }
            this.autoClose = source.autoClose;
            return this;
        }
        toJSON() {
            var data = super.toJSON();
            data.autoClose = this.autoClose;
            data.curves = [];
            for (var i = 0, l = this.curves.length; i < l; i++) {
                var curve = this.curves[i];
                data.curves.push(curve.toJSON());
            }
            return data;
        }
        fromJSON(json) {
            super.fromJSON(json);
            this.autoClose = json.autoClose;
            this.curves = [];
            for (var i = 0, l = json.curves.length; i < l; i++) {
                var curve = json.curves[i];
                this.curves.push(new Curves[curve.type]().fromJSON(curve));
            }
            return this;
        }
    }
    exports.CurvePath = CurvePath;
});
//# sourceMappingURL=CurvePath.js.map