define(["require", "exports", "../math/Vector3", "./Line3", "./Plane"], function (require, exports, Vector3_1, Line3_1, Plane_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Triangle {
        constructor(a, b, c) {
            this.a = (a !== undefined) ? a : new Vector3_1.Vector3();
            this.b = (b !== undefined) ? b : new Vector3_1.Vector3();
            this.c = (c !== undefined) ? c : new Vector3_1.Vector3();
        }
        static normal(a, b, c, optionalTarget) {
            var v0 = new Vector3_1.Vector3();
            var result = optionalTarget || new Vector3_1.Vector3();
            result.subVectors(c, b);
            v0.subVectors(a, b);
            result.cross(v0);
            var resultLengthSq = result.lengthSq();
            if (resultLengthSq > 0)
                return result.multiplyScalar(1 / Math.sqrt(resultLengthSq));
            return result.set(0, 0, 0);
        }
        static barycoordFromPoint(point, a, b, c, optionalTarget) {
            var v0 = new Vector3_1.Vector3();
            var v1 = new Vector3_1.Vector3();
            var v2 = new Vector3_1.Vector3();
            v0.subVectors(c, a);
            v1.subVectors(b, a);
            v2.subVectors(point, a);
            var dot00 = v0.dot(v0);
            var dot01 = v0.dot(v1);
            var dot02 = v0.dot(v2);
            var dot11 = v1.dot(v1);
            var dot12 = v1.dot(v2);
            var denom = (dot00 * dot11 - dot01 * dot01);
            var result = optionalTarget || new Vector3_1.Vector3();
            if (denom === 0) {
                return result.set(-2, -1, -1);
            }
            var invDenom = 1 / denom;
            var u = (dot11 * dot02 - dot01 * dot12) * invDenom;
            var v = (dot00 * dot12 - dot01 * dot02) * invDenom;
            return result.set(1 - u - v, v, u);
        }
        static containsPoint(point, a, b, c) {
            var v1 = new Vector3_1.Vector3();
            var result = Triangle.barycoordFromPoint(point, a, b, c, v1);
            return (result.x >= 0) && (result.y >= 0) && ((result.x + result.y) <= 1);
        }
        set(a, b, c) {
            this.a.copy(a);
            this.b.copy(b);
            this.c.copy(c);
            return this;
        }
        setFromPointsAndIndices(points, i0, i1, i2) {
            this.a.copy(points[i0]);
            this.b.copy(points[i1]);
            this.c.copy(points[i2]);
            return this;
        }
        clone() {
            return new Triangle().copy(this);
        }
        copy(triangle) {
            this.a.copy(triangle.a);
            this.b.copy(triangle.b);
            this.c.copy(triangle.c);
            return this;
        }
        area() {
            var v0 = new Vector3_1.Vector3();
            var v1 = new Vector3_1.Vector3();
            v0.subVectors(this.c, this.b);
            v1.subVectors(this.a, this.b);
            return v0.cross(v1).length() * 0.5;
        }
        midpoint(optionalTarget) {
            var result = optionalTarget || new Vector3_1.Vector3();
            return result.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3);
        }
        normal(optionalTarget) {
            return Triangle.normal(this.a, this.b, this.c, optionalTarget);
        }
        plane(optionalTarget) {
            var result = optionalTarget || new Plane_1.Plane();
            return result.setFromCoplanarPoints(this.a, this.b, this.c);
        }
        barycoordFromPoint(point, optionalTarget) {
            return Triangle.barycoordFromPoint(point, this.a, this.b, this.c, optionalTarget);
        }
        containsPoint(point) {
            return Triangle.containsPoint(point, this.a, this.b, this.c);
        }
        closestPointToPoint(point, optionalTarget) {
            var plane = new Plane_1.Plane();
            var edgeList = [new Line3_1.Line3(), new Line3_1.Line3(), new Line3_1.Line3()];
            var projectedPoint = new Vector3_1.Vector3();
            var closestPoint = new Vector3_1.Vector3();
            var result = optionalTarget || new Vector3_1.Vector3();
            var minDistance = Infinity;
            plane.setFromCoplanarPoints(this.a, this.b, this.c);
            plane.projectPoint(point, projectedPoint);
            if (this.containsPoint(projectedPoint) === true) {
                result.copy(projectedPoint);
            }
            else {
                edgeList[0].set(this.a, this.b);
                edgeList[1].set(this.b, this.c);
                edgeList[2].set(this.c, this.a);
                for (var i = 0; i < edgeList.length; i++) {
                    edgeList[i].closestPointToPoint(projectedPoint, true, closestPoint);
                    var distance = projectedPoint.distanceToSquared(closestPoint);
                    if (distance < minDistance) {
                        minDistance = distance;
                        result.copy(closestPoint);
                    }
                }
            }
            return result;
        }
        equals(triangle) {
            return triangle.a.equals(this.a) && triangle.b.equals(this.b) && triangle.c.equals(this.c);
        }
    }
    exports.Triangle = Triangle;
});
//# sourceMappingURL=Triangle.js.map