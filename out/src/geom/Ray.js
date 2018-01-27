define(["require", "exports", "../math/Vector3"], function (require, exports, Vector3_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Ray {
        constructor(origin, direction) {
            this.origin = origin || new Vector3_1.Vector3();
            this.direction = direction || new Vector3_1.Vector3();
        }
        set(origin, direction) {
            this.origin.copy(origin);
            this.direction.copy(direction);
            return this;
        }
        clone() {
            return new Ray().copy(this);
        }
        copy(ray) {
            this.origin.copy(ray.origin);
            this.direction.copy(ray.direction);
            return this;
        }
        at(t, optionalTarget) {
            var result = optionalTarget || new Vector3_1.Vector3();
            return result.copy(this.direction).multiplyScalar(t).add(this.origin);
        }
        lookAt(v) {
            this.direction.copy(v).sub(this.origin).normalize();
            return this;
        }
        recast(t) {
            var v1 = new Vector3_1.Vector3();
            this.origin.copy(this.at(t, v1));
            return this;
        }
        closestPointToPoint(point, optionalTarget) {
            var result = optionalTarget || new Vector3_1.Vector3();
            result.subVectors(point, this.origin);
            var directionDistance = result.dot(this.direction);
            if (directionDistance < 0)
                return result.copy(this.origin);
            return result.copy(this.direction).multiplyScalar(directionDistance).add(this.origin);
        }
        distanceToPoint(point) {
            return Math.sqrt(this.distanceSqToPoint(point));
        }
        distanceSqToPoint(point) {
            var v1 = new Vector3_1.Vector3();
            var directionDistance = v1.subVectors(point, this.origin).dot(this.direction);
            if (directionDistance < 0)
                return this.origin.distanceToSquared(point);
            v1.copy(this.direction).multiplyScalar(directionDistance).add(this.origin);
            return v1.distanceToSquared(point);
        }
        distanceSqToSegment(v0, v1, optionalPointOnRay, optionalPointOnSegment) {
            var segCenter = new Vector3_1.Vector3();
            var segDir = new Vector3_1.Vector3();
            var diff = new Vector3_1.Vector3();
            segCenter.copy(v0).add(v1).multiplyScalar(0.5);
            segDir.copy(v1).sub(v0).normalize();
            diff.copy(this.origin).sub(segCenter);
            var segExtent = v0.distanceTo(v1) * 0.5;
            var a01 = -this.direction.dot(segDir);
            var b0 = diff.dot(this.direction);
            var b1 = -diff.dot(segDir);
            var c = diff.lengthSq();
            var det = Math.abs(1 - a01 * a01);
            var s0, s1, sqrDist, extDet;
            if (det > 0) {
                s0 = a01 * b1 - b0;
                s1 = a01 * b0 - b1;
                extDet = segExtent * det;
                if (s0 >= 0) {
                    if (s1 >= -extDet) {
                        if (s1 <= extDet) {
                            var invDet = 1 / det;
                            s0 *= invDet;
                            s1 *= invDet;
                            sqrDist = s0 * (s0 + a01 * s1 + 2 * b0) + s1 * (a01 * s0 + s1 + 2 * b1) + c;
                        }
                        else {
                            s1 = segExtent;
                            s0 = Math.max(0, -(a01 * s1 + b0));
                            sqrDist = -s0 * s0 + s1 * (s1 + 2 * b1) + c;
                        }
                    }
                    else {
                        s1 = -segExtent;
                        s0 = Math.max(0, -(a01 * s1 + b0));
                        sqrDist = -s0 * s0 + s1 * (s1 + 2 * b1) + c;
                    }
                }
                else {
                    if (s1 <= -extDet) {
                        s0 = Math.max(0, -(-a01 * segExtent + b0));
                        s1 = (s0 > 0) ? -segExtent : Math.min(Math.max(-segExtent, -b1), segExtent);
                        sqrDist = -s0 * s0 + s1 * (s1 + 2 * b1) + c;
                    }
                    else if (s1 <= extDet) {
                        s0 = 0;
                        s1 = Math.min(Math.max(-segExtent, -b1), segExtent);
                        sqrDist = s1 * (s1 + 2 * b1) + c;
                    }
                    else {
                        s0 = Math.max(0, -(a01 * segExtent + b0));
                        s1 = (s0 > 0) ? segExtent : Math.min(Math.max(-segExtent, -b1), segExtent);
                        sqrDist = -s0 * s0 + s1 * (s1 + 2 * b1) + c;
                    }
                }
            }
            else {
                s1 = (a01 > 0) ? -segExtent : segExtent;
                s0 = Math.max(0, -(a01 * s1 + b0));
                sqrDist = -s0 * s0 + s1 * (s1 + 2 * b1) + c;
            }
            if (optionalPointOnRay)
                optionalPointOnRay.copy(this.direction).multiplyScalar(s0).add(this.origin);
            if (optionalPointOnSegment)
                optionalPointOnSegment.copy(segDir).multiplyScalar(s1).add(segCenter);
            return sqrDist;
        }
        intersectSphere(sphere, optionalTarget) {
            var v1 = new Vector3_1.Vector3();
            v1.subVectors(sphere.center, this.origin);
            var tca = v1.dot(this.direction);
            var d2 = v1.dot(v1) - tca * tca;
            var radius2 = sphere.radius * sphere.radius;
            if (d2 > radius2)
                return null;
            var thc = Math.sqrt(radius2 - d2);
            var t0 = tca - thc;
            var t1 = tca + thc;
            if (t0 < 0 && t1 < 0)
                return null;
            if (t0 < 0)
                return this.at(t1, optionalTarget);
            return this.at(t0, optionalTarget);
        }
        intersectsSphere(sphere) {
            return this.distanceToPoint(sphere.center) <= sphere.radius;
        }
        distanceToPlane(plane) {
            var denominator = plane.normal.dot(this.direction);
            if (denominator === 0) {
                if (plane.distanceToPoint(this.origin) === 0)
                    return 0;
                return null;
            }
            var t = -(this.origin.dot(plane.normal) + plane.constant) / denominator;
            return t >= 0 ? t : null;
        }
        intersectPlane(plane, optionalTarget) {
            var t = this.distanceToPlane(plane);
            if (t === null)
                return null;
            return this.at(t, optionalTarget);
        }
        intersectsPlane(plane) {
            var distToPoint = plane.distanceToPoint(this.origin);
            if (distToPoint === 0)
                return true;
            var denominator = plane.normal.dot(this.direction);
            if (denominator * distToPoint < 0)
                return true;
            return false;
        }
        intersectBox(box, optionalTarget) {
            var tmin, tmax, tymin, tymax, tzmin, tzmax;
            var invdirx = 1 / this.direction.x, invdiry = 1 / this.direction.y, invdirz = 1 / this.direction.z;
            var origin = this.origin;
            if (invdirx >= 0) {
                tmin = (box.min.x - origin.x) * invdirx;
                tmax = (box.max.x - origin.x) * invdirx;
            }
            else {
                tmin = (box.max.x - origin.x) * invdirx;
                tmax = (box.min.x - origin.x) * invdirx;
            }
            if (invdiry >= 0) {
                tymin = (box.min.y - origin.y) * invdiry;
                tymax = (box.max.y - origin.y) * invdiry;
            }
            else {
                tymin = (box.max.y - origin.y) * invdiry;
                tymax = (box.min.y - origin.y) * invdiry;
            }
            if ((tmin > tymax) || (tymin > tmax))
                return null;
            if (tymin > tmin || tmin !== tmin)
                tmin = tymin;
            if (tymax < tmax || tmax !== tmax)
                tmax = tymax;
            if (invdirz >= 0) {
                tzmin = (box.min.z - origin.z) * invdirz;
                tzmax = (box.max.z - origin.z) * invdirz;
            }
            else {
                tzmin = (box.max.z - origin.z) * invdirz;
                tzmax = (box.min.z - origin.z) * invdirz;
            }
            if ((tmin > tzmax) || (tzmin > tmax))
                return null;
            if (tzmin > tmin || tmin !== tmin)
                tmin = tzmin;
            if (tzmax < tmax || tmax !== tmax)
                tmax = tzmax;
            if (tmax < 0)
                return null;
            return this.at(tmin >= 0 ? tmin : tmax, optionalTarget);
        }
        intersectsBox(box) {
            var v = new Vector3_1.Vector3();
            return this.intersectBox(box, v) !== null;
        }
        intersectTriangle(a, b, c, backfaceCulling, optionalTarget) {
            var diff = new Vector3_1.Vector3();
            var edge1 = new Vector3_1.Vector3();
            var edge2 = new Vector3_1.Vector3();
            var normal = new Vector3_1.Vector3();
            edge1.subVectors(b, a);
            edge2.subVectors(c, a);
            normal.crossVectors(edge1, edge2);
            var DdN = this.direction.dot(normal);
            var sign;
            if (DdN > 0) {
                if (backfaceCulling)
                    return null;
                sign = 1;
            }
            else if (DdN < 0) {
                sign = -1;
                DdN = -DdN;
            }
            else
                return null;
            diff.subVectors(this.origin, a);
            var DdQxE2 = sign * this.direction.dot(edge2.crossVectors(diff, edge2));
            if (DdQxE2 < 0)
                return null;
            var DdE1xQ = sign * this.direction.dot(edge1.cross(diff));
            if (DdE1xQ < 0)
                return null;
            if (DdQxE2 + DdE1xQ > DdN)
                return null;
            var QdN = -sign * diff.dot(normal);
            if (QdN < 0)
                return null;
            return this.at(QdN / DdN, optionalTarget);
        }
        applyMatrix4(matrix4) {
            this.origin.applyMatrix4(matrix4);
            this.direction.transformDirection(matrix4);
            return this;
        }
        equals(ray) {
            return ray.origin.equals(this.origin) && ray.direction.equals(this.direction);
        }
    }
    exports.Ray = Ray;
});
//# sourceMappingURL=Ray.js.map