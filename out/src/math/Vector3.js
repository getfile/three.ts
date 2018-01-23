define(["require", "exports", "./Math", "./Matrix4", "./Euler", "./Quaternion"], function (require, exports, Math_1, Matrix4_1, Euler_1, Quaternion_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Vector3 {
        constructor(x = 0, y = 0, z = 0) {
            this.isVector3 = true;
            this.x = x;
            this.y = y;
            this.z = z;
        }
        set(x, y, z) {
            this.x = x;
            this.y = y;
            this.z = z;
            return this;
        }
        setScalar(scalar) {
            this.x = scalar;
            this.y = scalar;
            this.z = scalar;
            return this;
        }
        setX(x) {
            this.x = x;
            return this;
        }
        setY(y) {
            this.y = y;
            return this;
        }
        setZ(z) {
            this.z = z;
            return this;
        }
        setComponent(index, value) {
            switch (index) {
                case 0:
                    this.x = value;
                    break;
                case 1:
                    this.y = value;
                    break;
                case 2:
                    this.z = value;
                    break;
                default: throw new Error('index is out of range: ' + index);
            }
            return this;
        }
        getComponent(index) {
            switch (index) {
                case 0: return this.x;
                case 1: return this.y;
                case 2: return this.z;
                default: throw new Error('index is out of range: ' + index);
            }
        }
        clone() {
            return new Vector3(this.x, this.y, this.z);
        }
        copy(v) {
            this.x = v.x;
            this.y = v.y;
            this.z = v.z;
            return this;
        }
        add(v, w) {
            if (w !== undefined) {
                console.warn('THREE.Vector3: .add() now only accepts one argument. Use .addVectors( a, b ) instead.');
                return this.addVectors(v, w);
            }
            this.x += v.x;
            this.y += v.y;
            this.z += v.z;
            return this;
        }
        addScalar(s) {
            this.x += s;
            this.y += s;
            this.z += s;
            return this;
        }
        addVectors(a, b) {
            this.x = a.x + b.x;
            this.y = a.y + b.y;
            this.z = a.z + b.z;
            return this;
        }
        addScaledVector(v, s) {
            this.x += v.x * s;
            this.y += v.y * s;
            this.z += v.z * s;
            return this;
        }
        sub(v, w) {
            if (w !== undefined) {
                console.warn('THREE.Vector3: .sub() now only accepts one argument. Use .subVectors( a, b ) instead.');
                return this.subVectors(v, w);
            }
            this.x -= v.x;
            this.y -= v.y;
            this.z -= v.z;
            return this;
        }
        subScalar(s) {
            this.x -= s;
            this.y -= s;
            this.z -= s;
            return this;
        }
        subVectors(a, b) {
            this.x = a.x - b.x;
            this.y = a.y - b.y;
            this.z = a.z - b.z;
            return this;
        }
        multiply(v, w) {
            if (w !== undefined) {
                console.warn('THREE.Vector3: .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead.');
                return this.multiplyVectors(v, w);
            }
            this.x *= v.x;
            this.y *= v.y;
            this.z *= v.z;
            return this;
        }
        multiplyScalar(scalar) {
            this.x *= scalar;
            this.y *= scalar;
            this.z *= scalar;
            return this;
        }
        multiplyVectors(a, b) {
            this.x = a.x * b.x;
            this.y = a.y * b.y;
            this.z = a.z * b.z;
            return this;
        }
        applyEuler(euler) {
            let quaternion = new Quaternion_1.Quaternion();
            if (!(euler instanceof Euler_1.Euler))
                console.error('THREE.Vector3: .applyEuler() now expects an Euler rotation rather than a Vector3 and order.');
            return this.applyQuaternion(quaternion.setFromEuler(euler));
        }
        applyAxisAngle(axis, angle) {
            let quaternion = new Quaternion_1.Quaternion();
            return this.applyQuaternion(quaternion.setFromAxisAngle(axis, angle));
        }
        applyMatrix3(m) {
            let x = this.x, y = this.y, z = this.z;
            let e = m.elements;
            this.x = e[0] * x + e[3] * y + e[6] * z;
            this.y = e[1] * x + e[4] * y + e[7] * z;
            this.z = e[2] * x + e[5] * y + e[8] * z;
            return this;
        }
        applyMatrix4(m) {
            let x = this.x, y = this.y, z = this.z;
            let e = m.elements;
            let w = 1 / (e[3] * x + e[7] * y + e[11] * z + e[15]);
            this.x = (e[0] * x + e[4] * y + e[8] * z + e[12]) * w;
            this.y = (e[1] * x + e[5] * y + e[9] * z + e[13]) * w;
            this.z = (e[2] * x + e[6] * y + e[10] * z + e[14]) * w;
            return this;
        }
        applyQuaternion(q) {
            let x = this.x, y = this.y, z = this.z;
            let qx = q.x, qy = q.y, qz = q.z, qw = q.w;
            let ix = qw * x + qy * z - qz * y;
            let iy = qw * y + qz * x - qx * z;
            let iz = qw * z + qx * y - qy * x;
            let iw = -qx * x - qy * y - qz * z;
            this.x = ix * qw + iw * -qx + iy * -qz - iz * -qy;
            this.y = iy * qw + iw * -qy + iz * -qx - ix * -qz;
            this.z = iz * qw + iw * -qz + ix * -qy - iy * -qx;
            return this;
        }
        project(camera) {
            let matrix = new Matrix4_1.Matrix4();
            matrix.multiplyMatrices(camera.projectionMatrix, matrix.getInverse(camera.matrixWorld));
            return this.applyMatrix4(matrix);
        }
        unproject(camera) {
            let matrix = new Matrix4_1.Matrix4();
            matrix.multiplyMatrices(camera.matrixWorld, matrix.getInverse(camera.projectionMatrix));
            return this.applyMatrix4(matrix);
        }
        transformDirection(m) {
            let x = this.x, y = this.y, z = this.z;
            let e = m.elements;
            this.x = e[0] * x + e[4] * y + e[8] * z;
            this.y = e[1] * x + e[5] * y + e[9] * z;
            this.z = e[2] * x + e[6] * y + e[10] * z;
            return this.normalize();
        }
        divide(v) {
            this.x /= v.x;
            this.y /= v.y;
            this.z /= v.z;
            return this;
        }
        divideScalar(scalar) {
            return this.multiplyScalar(1 / scalar);
        }
        min(v) {
            this.x = Math.min(this.x, v.x);
            this.y = Math.min(this.y, v.y);
            this.z = Math.min(this.z, v.z);
            return this;
        }
        max(v) {
            this.x = Math.max(this.x, v.x);
            this.y = Math.max(this.y, v.y);
            this.z = Math.max(this.z, v.z);
            return this;
        }
        clamp(min, max) {
            this.x = Math.max(min.x, Math.min(max.x, this.x));
            this.y = Math.max(min.y, Math.min(max.y, this.y));
            this.z = Math.max(min.z, Math.min(max.z, this.z));
            return this;
        }
        clampScalar(minVal, maxVal) {
            let min = new Vector3();
            let max = new Vector3();
            min.set(minVal, minVal, minVal);
            max.set(maxVal, maxVal, maxVal);
            return this.clamp(min, max);
        }
        clampLength(min, max) {
            let length = this.length();
            return this.divideScalar(length || 1).multiplyScalar(Math.max(min, Math.min(max, length)));
        }
        floor() {
            this.x = Math.floor(this.x);
            this.y = Math.floor(this.y);
            this.z = Math.floor(this.z);
            return this;
        }
        ceil() {
            this.x = Math.ceil(this.x);
            this.y = Math.ceil(this.y);
            this.z = Math.ceil(this.z);
            return this;
        }
        round() {
            this.x = Math.round(this.x);
            this.y = Math.round(this.y);
            this.z = Math.round(this.z);
            return this;
        }
        roundToZero() {
            this.x = (this.x < 0) ? Math.ceil(this.x) : Math.floor(this.x);
            this.y = (this.y < 0) ? Math.ceil(this.y) : Math.floor(this.y);
            this.z = (this.z < 0) ? Math.ceil(this.z) : Math.floor(this.z);
            return this;
        }
        negate() {
            this.x = -this.x;
            this.y = -this.y;
            this.z = -this.z;
            return this;
        }
        dot(v) {
            return this.x * v.x + this.y * v.y + this.z * v.z;
        }
        lengthSq() {
            return this.x * this.x + this.y * this.y + this.z * this.z;
        }
        length() {
            return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
        }
        manhattanLength() {
            return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
        }
        normalize() {
            return this.divideScalar(this.length() || 1);
        }
        setLength(length) {
            return this.normalize().multiplyScalar(length);
        }
        lerp(v, alpha) {
            this.x += (v.x - this.x) * alpha;
            this.y += (v.y - this.y) * alpha;
            this.z += (v.z - this.z) * alpha;
            return this;
        }
        lerpVectors(v1, v2, alpha) {
            return this.subVectors(v2, v1).multiplyScalar(alpha).add(v1);
        }
        cross(v, w) {
            if (w !== undefined) {
                console.warn('THREE.Vector3: .cross() now only accepts one argument. Use .crossVectors( a, b ) instead.');
                return this.crossVectors(v, w);
            }
            return this.crossVectors(this, v);
        }
        crossVectors(a, b) {
            let ax = a.x, ay = a.y, az = a.z;
            let bx = b.x, by = b.y, bz = b.z;
            this.x = ay * bz - az * by;
            this.y = az * bx - ax * bz;
            this.z = ax * by - ay * bx;
            return this;
        }
        projectOnVector(vector) {
            let scalar = vector.dot(this) / vector.lengthSq();
            return this.copy(vector).multiplyScalar(scalar);
        }
        projectOnPlane(planeNormal) {
            let v1 = new Vector3();
            v1.copy(this).projectOnVector(planeNormal);
            return this.sub(v1);
        }
        ;
        reflect(normal) {
            let v1 = new Vector3();
            return this.sub(v1.copy(normal).multiplyScalar(2 * this.dot(normal)));
        }
        angleTo(v) {
            let theta = this.dot(v) / (Math.sqrt(this.lengthSq() * v.lengthSq()));
            return Math.acos(Math_1._Math.clamp(theta, -1, 1));
        }
        distanceTo(v) {
            return Math.sqrt(this.distanceToSquared(v));
        }
        distanceToSquared(v) {
            let dx = this.x - v.x, dy = this.y - v.y, dz = this.z - v.z;
            return dx * dx + dy * dy + dz * dz;
        }
        manhattanDistanceTo(v) {
            return Math.abs(this.x - v.x) + Math.abs(this.y - v.y) + Math.abs(this.z - v.z);
        }
        setFromSpherical(s) {
            let sinPhiRadius = Math.sin(s.phi) * s.radius;
            this.x = sinPhiRadius * Math.sin(s.theta);
            this.y = Math.cos(s.phi) * s.radius;
            this.z = sinPhiRadius * Math.cos(s.theta);
            return this;
        }
        setFromCylindrical(c) {
            this.x = c.radius * Math.sin(c.theta);
            this.y = c.y;
            this.z = c.radius * Math.cos(c.theta);
            return this;
        }
        setFromMatrixPosition(m) {
            let e = m.elements;
            this.x = e[12];
            this.y = e[13];
            this.z = e[14];
            return this;
        }
        setFromMatrixScale(m) {
            let sx = this.setFromMatrixColumn(m, 0).length();
            let sy = this.setFromMatrixColumn(m, 1).length();
            let sz = this.setFromMatrixColumn(m, 2).length();
            this.x = sx;
            this.y = sy;
            this.z = sz;
            return this;
        }
        setFromMatrixColumn(m, index) {
            return this.fromArray(m.elements, index * 4);
        }
        equals(v) {
            return ((v.x === this.x) && (v.y === this.y) && (v.z === this.z));
        }
        fromArray(array, offset = 0) {
            this.x = array[offset];
            this.y = array[offset + 1];
            this.z = array[offset + 2];
            return this;
        }
        toArray(array, offset = 0) {
            if (array === undefined)
                array = [];
            array[offset] = this.x;
            array[offset + 1] = this.y;
            array[offset + 2] = this.z;
            return array;
        }
        fromBufferAttribute(attribute, index) {
            this.x = attribute.getX(index);
            this.y = attribute.getY(index);
            this.z = attribute.getZ(index);
            return this;
        }
    }
    exports.Vector3 = Vector3;
});
//# sourceMappingURL=Vector3.js.map