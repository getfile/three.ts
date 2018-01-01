define(["require", "exports", "../math/Vector3", "../math/Math"], function (require, exports, Vector3_1, Math_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Line3 {
        constructor(start, end) {
            this.start = (start !== undefined) ? start : new Vector3_1.Vector3();
            this.end = (end !== undefined) ? end : new Vector3_1.Vector3();
        }
        set(start, end) {
            this.start.copy(start);
            this.end.copy(end);
            return this;
        }
        clone() {
            return new Line3().copy(this);
        }
        copy(line) {
            this.start.copy(line.start);
            this.end.copy(line.end);
            return this;
        }
        getCenter(optionalTarget) {
            var result = optionalTarget || new Vector3_1.Vector3();
            return result.addVectors(this.start, this.end).multiplyScalar(0.5);
        }
        delta(optionalTarget) {
            var result = optionalTarget || new Vector3_1.Vector3();
            return result.subVectors(this.end, this.start);
        }
        distanceSq() {
            return this.start.distanceToSquared(this.end);
        }
        distance() {
            return this.start.distanceTo(this.end);
        }
        at(t, optionalTarget) {
            var result = optionalTarget || new Vector3_1.Vector3();
            return this.delta(result).multiplyScalar(t).add(this.start);
        }
        closestPointToPointParameter(point, clampToLine) {
            var startP = new Vector3_1.Vector3();
            var startEnd = new Vector3_1.Vector3();
            startP.subVectors(point, this.start);
            startEnd.subVectors(this.end, this.start);
            var startEnd2 = startEnd.dot(startEnd);
            var startEnd_startP = startEnd.dot(startP);
            var t = startEnd_startP / startEnd2;
            if (clampToLine)
                t = Math_1._Math.clamp(t, 0, 1);
            return t;
        }
        ;
        closestPointToPoint(point, clampToLine, optionalTarget) {
            var t = this.closestPointToPointParameter(point, clampToLine);
            var result = optionalTarget || new Vector3_1.Vector3();
            return this.delta(result).multiplyScalar(t).add(this.start);
        }
        applyMatrix4(matrix) {
            this.start.applyMatrix4(matrix);
            this.end.applyMatrix4(matrix);
            return this;
        }
        equals(line) {
            return line.start.equals(this.start) && line.end.equals(this.end);
        }
    }
    exports.Line3 = Line3;
});
//# sourceMappingURL=Line3.js.map