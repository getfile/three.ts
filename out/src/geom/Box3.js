define(["require", "exports", "../math/Vector3", "./Sphere"], function (require, exports, Vector3_1, Sphere_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Box3 {
        constructor(min, max) {
            this.min = (min !== undefined) ? min : new Vector3_1.Vector3(+Infinity, +Infinity, +Infinity);
            this.max = (max !== undefined) ? max : new Vector3_1.Vector3(-Infinity, -Infinity, -Infinity);
        }
        set(min, max) {
            this.min.copy(min);
            this.max.copy(max);
            return this;
        }
        setFromArray(array) {
            let minX = +Infinity;
            let minY = +Infinity;
            let minZ = +Infinity;
            let maxX = -Infinity;
            let maxY = -Infinity;
            let maxZ = -Infinity;
            for (let i = 0, l = array.length; i < l; i += 3) {
                let x = array[i];
                let y = array[i + 1];
                let z = array[i + 2];
                if (x < minX)
                    minX = x;
                if (y < minY)
                    minY = y;
                if (z < minZ)
                    minZ = z;
                if (x > maxX)
                    maxX = x;
                if (y > maxY)
                    maxY = y;
                if (z > maxZ)
                    maxZ = z;
            }
            this.min.set(minX, minY, minZ);
            this.max.set(maxX, maxY, maxZ);
            return this;
        }
        setFromBufferAttribute(attribute) {
            let minX = +Infinity;
            let minY = +Infinity;
            let minZ = +Infinity;
            let maxX = -Infinity;
            let maxY = -Infinity;
            let maxZ = -Infinity;
            for (let i = 0, l = attribute.count; i < l; i++) {
                let x = attribute.getX(i);
                let y = attribute.getY(i);
                let z = attribute.getZ(i);
                if (x < minX)
                    minX = x;
                if (y < minY)
                    minY = y;
                if (z < minZ)
                    minZ = z;
                if (x > maxX)
                    maxX = x;
                if (y > maxY)
                    maxY = y;
                if (z > maxZ)
                    maxZ = z;
            }
            this.min.set(minX, minY, minZ);
            this.max.set(maxX, maxY, maxZ);
            return this;
        }
        setFromPoints(points) {
            this.makeEmpty();
            for (let i = 0, il = points.length; i < il; i++)
                this.expandByPoint(points[i]);
            return this;
        }
        setFromCenterAndSize(center, size) {
            let v1 = new Vector3_1.Vector3();
            let halfSize = v1.copy(size).multiplyScalar(0.5);
            this.min.copy(center).sub(halfSize);
            this.max.copy(center).add(halfSize);
            return this;
        }
        setFromObject(object) {
            this.makeEmpty();
            return this.expandByObject(object);
        }
        clone() {
            return new Box3().copy(this);
        }
        copy(box) {
            this.min.copy(box.min);
            this.max.copy(box.max);
            return this;
        }
        makeEmpty() {
            this.min.x = this.min.y = this.min.z = +Infinity;
            this.max.x = this.max.y = this.max.z = -Infinity;
            return this;
        }
        isEmpty() {
            return (this.max.x < this.min.x) || (this.max.y < this.min.y) || (this.max.z < this.min.z);
        }
        getCenter(optionalTarget) {
            let result = optionalTarget || new Vector3_1.Vector3();
            return this.isEmpty() ? result.set(0, 0, 0) : result.addVectors(this.min, this.max).multiplyScalar(0.5);
        }
        getSize(optionalTarget) {
            let result = optionalTarget || new Vector3_1.Vector3();
            return this.isEmpty() ? result.set(0, 0, 0) : result.subVectors(this.max, this.min);
        }
        expandByPoint(point) {
            this.min.min(point);
            this.max.max(point);
            return this;
        }
        expandByVector(vector) {
            this.min.sub(vector);
            this.max.add(vector);
            return this;
        }
        expandByScalar(scalar) {
            this.min.addScalar(-scalar);
            this.max.addScalar(scalar);
            return this;
        }
        traverse(node) {
            let i, l;
            let v1 = new Vector3_1.Vector3();
            let geometry = node.geometry;
            if (geometry !== undefined) {
                if (geometry.isGeometry) {
                    let vertices = geometry.vertices;
                    for (i = 0, l = vertices.length; i < l; i++) {
                        v1.copy(vertices[i]);
                        v1.applyMatrix4(node.matrixWorld);
                        this.expandByPoint(v1);
                    }
                }
                else if (geometry.isBufferGeometry) {
                    let attribute = geometry.attributes.position;
                    if (attribute !== undefined) {
                        for (i = 0, l = attribute.count; i < l; i++) {
                            v1.fromBufferAttribute(attribute, i).applyMatrix4(node.matrixWorld);
                            this.expandByPoint(v1);
                        }
                    }
                }
            }
        }
        expandByObject(object) {
            return this;
        }
        ;
        containsPoint(point) {
            return point.x < this.min.x || point.x > this.max.x ||
                point.y < this.min.y || point.y > this.max.y ||
                point.z < this.min.z || point.z > this.max.z ? false : true;
        }
        containsBox(box) {
            return this.min.x <= box.min.x && box.max.x <= this.max.x &&
                this.min.y <= box.min.y && box.max.y <= this.max.y &&
                this.min.z <= box.min.z && box.max.z <= this.max.z;
        }
        getParameter(point, optionalTarget) {
            let result = optionalTarget || new Vector3_1.Vector3();
            return result.set((point.x - this.min.x) / (this.max.x - this.min.x), (point.y - this.min.y) / (this.max.y - this.min.y), (point.z - this.min.z) / (this.max.z - this.min.z));
        }
        intersectsBox(box) {
            return box.max.x < this.min.x || box.min.x > this.max.x ||
                box.max.y < this.min.y || box.min.y > this.max.y ||
                box.max.z < this.min.z || box.min.z > this.max.z ? false : true;
        }
        intersectsSphere(sphere) {
            let closestPoint = new Vector3_1.Vector3();
            this.clampPoint(sphere.center, closestPoint);
            return closestPoint.distanceToSquared(sphere.center) <= (sphere.radius * sphere.radius);
        }
        intersectsPlane(plane) {
            let min, max;
            if (plane.normal.x > 0) {
                min = plane.normal.x * this.min.x;
                max = plane.normal.x * this.max.x;
            }
            else {
                min = plane.normal.x * this.max.x;
                max = plane.normal.x * this.min.x;
            }
            if (plane.normal.y > 0) {
                min += plane.normal.y * this.min.y;
                max += plane.normal.y * this.max.y;
            }
            else {
                min += plane.normal.y * this.max.y;
                max += plane.normal.y * this.min.y;
            }
            if (plane.normal.z > 0) {
                min += plane.normal.z * this.min.z;
                max += plane.normal.z * this.max.z;
            }
            else {
                min += plane.normal.z * this.max.z;
                max += plane.normal.z * this.min.z;
            }
            return (min <= plane.constant && max >= plane.constant);
        }
        clampPoint(point, optionalTarget) {
            let result = optionalTarget || new Vector3_1.Vector3();
            return result.copy(point).clamp(this.min, this.max);
        }
        distanceToPoint(point) {
            let v1 = new Vector3_1.Vector3();
            let clampedPoint = v1.copy(point).clamp(this.min, this.max);
            return clampedPoint.sub(point).length();
        }
        getBoundingSphere(optionalTarget) {
            let v1 = new Vector3_1.Vector3();
            let result = optionalTarget || new Sphere_1.Sphere();
            this.getCenter(result.center);
            result.radius = this.getSize(v1).length() * 0.5;
            return result;
        }
        intersect(box) {
            this.min.max(box.min);
            this.max.min(box.max);
            if (this.isEmpty())
                this.makeEmpty();
            return this;
        }
        union(box) {
            this.min.min(box.min);
            this.max.max(box.max);
            return this;
        }
        applyMatrix4(matrix) {
            let points = [
                new Vector3_1.Vector3(),
                new Vector3_1.Vector3(),
                new Vector3_1.Vector3(),
                new Vector3_1.Vector3(),
                new Vector3_1.Vector3(),
                new Vector3_1.Vector3(),
                new Vector3_1.Vector3(),
                new Vector3_1.Vector3()
            ];
            if (this.isEmpty())
                return this;
            points[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(matrix);
            points[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(matrix);
            points[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(matrix);
            points[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(matrix);
            points[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(matrix);
            points[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(matrix);
            points[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(matrix);
            points[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(matrix);
            this.setFromPoints(points);
            return this;
        }
        ;
        translate(offset) {
            this.min.add(offset);
            this.max.add(offset);
            return this;
        }
        equals(box) {
            return box.min.equals(this.min) && box.max.equals(this.max);
        }
    }
    exports.Box3 = Box3;
});
//# sourceMappingURL=Box3.js.map