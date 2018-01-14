define(["require", "exports", "../../math/Vector2", "./CurvePath", "../curves/EllipseCurve", "../curves/SplineCurve", "../curves/CubicBezierCurve", "../curves/QuadraticBezierCurve", "../curves/LineCurve"], function (require, exports, Vector2_1, CurvePath_1, EllipseCurve_1, SplineCurve_1, CubicBezierCurve_1, QuadraticBezierCurve_1, LineCurve_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Path extends CurvePath_1.CurvePath {
        constructor(points) {
            super();
            this.type = 'Path';
            this.currentPoint = new Vector2_1.Vector2();
            if (points)
                this.setFromPoints(points);
        }
        setFromPoints(points) {
            this.moveTo(points[0].x, points[0].y);
            for (var i = 1, l = points.length; i < l; i++)
                this.lineTo(points[i].x, points[i].y);
        }
        moveTo(x, y) {
            this.currentPoint.set(x, y);
        }
        lineTo(x, y) {
            var curve = new LineCurve_1.LineCurve(this.currentPoint.clone(), new Vector2_1.Vector2(x, y));
            this.curves.push(curve);
            this.currentPoint.set(x, y);
        }
        quadraticCurveTo(aCPx, aCPy, aX, aY) {
            var curve = new QuadraticBezierCurve_1.QuadraticBezierCurve(this.currentPoint.clone(), new Vector2_1.Vector2(aCPx, aCPy), new Vector2_1.Vector2(aX, aY));
            this.curves.push(curve);
            this.currentPoint.set(aX, aY);
        }
        bezierCurveTo(aCP1x, aCP1y, aCP2x, aCP2y, aX, aY) {
            var curve = new CubicBezierCurve_1.CubicBezierCurve(this.currentPoint.clone(), new Vector2_1.Vector2(aCP1x, aCP1y), new Vector2_1.Vector2(aCP2x, aCP2y), new Vector2_1.Vector2(aX, aY));
            this.curves.push(curve);
            this.currentPoint.set(aX, aY);
        }
        splineThru(pts) {
            var npts = [this.currentPoint.clone()].concat(pts);
            var curve = new SplineCurve_1.SplineCurve(npts);
            this.curves.push(curve);
            this.currentPoint.copy(pts[pts.length - 1]);
        }
        arc(aX, aY, aRadius, aStartAngle, aEndAngle, aClockwise) {
            var x0 = this.currentPoint.x;
            var y0 = this.currentPoint.y;
            this.absarc(aX + x0, aY + y0, aRadius, aStartAngle, aEndAngle, aClockwise);
        }
        absarc(aX, aY, aRadius, aStartAngle, aEndAngle, aClockwise) {
            this.absellipse(aX, aY, aRadius, aRadius, aStartAngle, aEndAngle, aClockwise);
        }
        ellipse(aX, aY, xRadius, yRadius, aStartAngle, aEndAngle, aClockwise, aRotation) {
            var x0 = this.currentPoint.x;
            var y0 = this.currentPoint.y;
            this.absellipse(aX + x0, aY + y0, xRadius, yRadius, aStartAngle, aEndAngle, aClockwise, aRotation);
        }
        absellipse(aX, aY, xRadius, yRadius, aStartAngle, aEndAngle, aClockwise, aRotation) {
            var curve = new EllipseCurve_1.EllipseCurve(aX, aY, xRadius, yRadius, aStartAngle, aEndAngle, aClockwise, aRotation);
            if (this.curves.length > 0) {
                var firstPoint = curve.getPoint(0);
                if (!firstPoint.equals(this.currentPoint))
                    this.lineTo(firstPoint.x, firstPoint.y);
            }
            this.curves.push(curve);
            var lastPoint = curve.getPoint(1);
            this.currentPoint.copy(lastPoint);
        }
        copy(source) {
            super.copy(source);
            this.currentPoint.copy(source.currentPoint);
            return this;
        }
        toJSON() {
            var data = super.toJSON();
            data.currentPoint = this.currentPoint.toArray();
            return data;
        }
        fromJSON(json) {
            super.fromJSON(json);
            this.currentPoint.fromArray(json.currentPoint);
            return this;
        }
    }
    exports.Path = Path;
});
//# sourceMappingURL=Path.js.map