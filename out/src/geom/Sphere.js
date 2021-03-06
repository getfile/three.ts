define(["require", "exports", "./Box3", "../math/Vector3"], function (require, exports, Box3_1, Vector3_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Sphere {
        constructor(center, radius = 0) {
            this.center = (center !== undefined) ? center : new Vector3_1.Vector3();
            this.radius = radius;
        }
        set(center, radius) {
            this.center.copy(center);
            this.radius = radius;
            return this;
        }
        setFromPoints(points, optionalCenter) {
            var box = new Box3_1.Box3();
            var center = this.center;
            if (optionalCenter !== undefined)
                center.copy(optionalCenter);
            else
                box.setFromPoints(points).getCenter(center);
            var maxRadiusSq = 0;
            for (var i = 0, il = points.length; i < il; i++)
                maxRadiusSq = Math.max(maxRadiusSq, center.distanceToSquared(points[i]));
            this.radius = Math.sqrt(maxRadiusSq);
            return this;
        }
        clone() {
            return new Sphere().copy(this);
        }
        copy(sphere) {
            this.center.copy(sphere.center);
            this.radius = sphere.radius;
            return this;
        }
        empty() {
            return (this.radius <= 0);
        }
        containsPoint(point) {
            return (point.distanceToSquared(this.center) <= (this.radius * this.radius));
        }
        distanceToPoint(point) {
            return (point.distanceTo(this.center) - this.radius);
        }
        intersectsSphere(sphere) {
            var radiusSum = this.radius + sphere.radius;
            return sphere.center.distanceToSquared(this.center) <= (radiusSum * radiusSum);
        }
        intersectsBox(box) {
            return box.intersectsSphere(this);
        }
        intersectsPlane(plane) {
            return Math.abs(plane.distanceToPoint(this.center)) <= this.radius;
        }
        clampPoint(point, optionalTarget) {
            var deltaLengthSq = this.center.distanceToSquared(point);
            var result = optionalTarget || new Vector3_1.Vector3();
            result.copy(point);
            if (deltaLengthSq > (this.radius * this.radius)) {
                result.sub(this.center).normalize();
                result.multiplyScalar(this.radius).add(this.center);
            }
            return result;
        }
        getBoundingBox(optionalTarget) {
            var box = optionalTarget || new Box3_1.Box3();
            box.set(this.center, this.center);
            box.expandByScalar(this.radius);
            return box;
        }
        applyMatrix4(matrix) {
            this.center.applyMatrix4(matrix);
            this.radius = this.radius * matrix.getMaxScaleOnAxis();
            return this;
        }
        translate(offset) {
            this.center.add(offset);
            return this;
        }
        equals(sphere) {
            return sphere.center.equals(this.center) && (sphere.radius === this.radius);
        }
    }
    exports.Sphere = Sphere;
});
//# sourceMappingURL=Sphere.js.map