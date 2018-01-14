define(["require", "exports", "../../math/Math.js", "../../math/Vector3.js", "../../math/Matrix4.js"], function (require, exports, Math_js_1, Vector3_js_1, Matrix4_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Curve {
        constructor() {
            this.type = 'Curve';
            this.arcLengthDivisions = 200;
        }
        getPoint(t, optionalTarget) {
            console.warn('THREE.Curve: .getPoint() not implemented.');
            return null;
        }
        getPointAt(u, optionalTarget) {
            var t = this.getUtoTmapping(u);
            return this.getPoint(t, optionalTarget);
        }
        getPoints(divisions) {
            if (divisions === undefined)
                divisions = 5;
            var points = [];
            for (var d = 0; d <= divisions; d++)
                points.push(this.getPoint(d / divisions));
            return points;
        }
        getSpacedPoints(divisions) {
            if (divisions === undefined)
                divisions = 5;
            var points = [];
            for (var d = 0; d <= divisions; d++)
                points.push(this.getPointAt(d / divisions));
            return points;
        }
        getLength() {
            var lengths = this.getLengths();
            return lengths[lengths.length - 1];
        }
        getLengths(divisions) {
            if (divisions === undefined)
                divisions = this.arcLengthDivisions;
            if (this.cacheArcLengths &&
                (this.cacheArcLengths.length === divisions + 1) &&
                !this.needsUpdate) {
                return this.cacheArcLengths;
            }
            this.needsUpdate = false;
            var cache = [];
            var current, last = this.getPoint(0);
            var p, sum = 0;
            cache.push(0);
            for (p = 1; p <= divisions; p++) {
                current = this.getPoint(p / divisions);
                sum += current.distanceTo(last);
                cache.push(sum);
                last = current;
            }
            this.cacheArcLengths = cache;
            return cache;
        }
        updateArcLengths() {
            this.needsUpdate = true;
            this.getLengths();
        }
        getUtoTmapping(u, distance) {
            var arcLengths = this.getLengths();
            var i = 0, il = arcLengths.length;
            var targetArcLength;
            if (distance)
                targetArcLength = distance;
            else
                targetArcLength = u * arcLengths[il - 1];
            var low = 0, high = il - 1, comparison;
            while (low <= high) {
                i = Math.floor(low + (high - low) / 2);
                comparison = arcLengths[i] - targetArcLength;
                if (comparison < 0)
                    low = i + 1;
                else if (comparison > 0)
                    high = i - 1;
                else {
                    high = i;
                    break;
                }
            }
            i = high;
            if (arcLengths[i] === targetArcLength)
                return i / (il - 1);
            var lengthBefore = arcLengths[i];
            var lengthAfter = arcLengths[i + 1];
            var segmentLength = lengthAfter - lengthBefore;
            var segmentFraction = (targetArcLength - lengthBefore) / segmentLength;
            var t = (i + segmentFraction) / (il - 1);
            return t;
        }
        getTangent(t) {
            var delta = 0.0001;
            var t1 = t - delta;
            var t2 = t + delta;
            if (t1 < 0)
                t1 = 0;
            if (t2 > 1)
                t2 = 1;
            var pt1 = this.getPoint(t1);
            var pt2 = this.getPoint(t2);
            var vec = pt2.clone().sub(pt1);
            return vec.normalize();
        }
        getTangentAt(u) {
            var t = this.getUtoTmapping(u);
            return this.getTangent(t);
        }
        computeFrenetFrames(segments, closed) {
            var normal = new Vector3_js_1.Vector3();
            var tangents = [];
            var normals = [];
            var binormals = [];
            var vec = new Vector3_js_1.Vector3();
            var mat = new Matrix4_js_1.Matrix4();
            var i, u, theta;
            for (i = 0; i <= segments; i++) {
                u = i / segments;
                tangents[i] = this.getTangentAt(u);
                tangents[i].normalize();
            }
            normals[0] = new Vector3_js_1.Vector3();
            binormals[0] = new Vector3_js_1.Vector3();
            var min = Number.MAX_VALUE;
            var tx = Math.abs(tangents[0].x);
            var ty = Math.abs(tangents[0].y);
            var tz = Math.abs(tangents[0].z);
            if (tx <= min) {
                min = tx;
                normal.set(1, 0, 0);
            }
            if (ty <= min) {
                min = ty;
                normal.set(0, 1, 0);
            }
            if (tz <= min)
                normal.set(0, 0, 1);
            vec.crossVectors(tangents[0], normal).normalize();
            normals[0].crossVectors(tangents[0], vec);
            binormals[0].crossVectors(tangents[0], normals[0]);
            for (i = 1; i <= segments; i++) {
                normals[i] = normals[i - 1].clone();
                binormals[i] = binormals[i - 1].clone();
                vec.crossVectors(tangents[i - 1], tangents[i]);
                if (vec.length() > Number.EPSILON) {
                    vec.normalize();
                    theta = Math.acos(Math_js_1._Math.clamp(tangents[i - 1].dot(tangents[i]), -1, 1));
                    normals[i].applyMatrix4(mat.makeRotationAxis(vec, theta));
                }
                binormals[i].crossVectors(tangents[i], normals[i]);
            }
            if (closed === true) {
                theta = Math.acos(Math_js_1._Math.clamp(normals[0].dot(normals[segments]), -1, 1));
                theta /= segments;
                if (tangents[0].dot(vec.crossVectors(normals[0], normals[segments])) > 0)
                    theta = -theta;
                for (i = 1; i <= segments; i++) {
                    normals[i].applyMatrix4(mat.makeRotationAxis(tangents[i], theta * i));
                    binormals[i].crossVectors(tangents[i], normals[i]);
                }
            }
            return {
                tangents: tangents,
                normals: normals,
                binormals: binormals
            };
        }
        clone() {
            return new Curve().copy(this);
        }
        copy(source) {
            this.arcLengthDivisions = source.arcLengthDivisions;
            return this;
        }
        toJSON() {
            var data = {
                metadata: {
                    version: 4.5,
                    type: 'Curve',
                    generator: 'Curve.toJSON'
                }
            };
            data.arcLengthDivisions = this.arcLengthDivisions;
            data.type = this.type;
            return data;
        }
        fromJSON(json) {
            this.arcLengthDivisions = json.arcLengthDivisions;
            return this;
        }
    }
    exports.Curve = Curve;
});
//# sourceMappingURL=Curve.js.map