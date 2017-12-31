define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Vector4 {
        constructor(x = 0, y = 0, z = 0, w = 1) {
            this.x = x;
            this.y = y;
            this.z = z;
            this.w = w;
        }
        set(x, y, z, w) {
            this.x = x;
            this.y = y;
            this.z = z;
            this.w = w;
            return this;
        }
        setScalar(scalar) {
            this.x = scalar;
            this.y = scalar;
            this.z = scalar;
            this.w = scalar;
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
        setW(w) {
            this.w = w;
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
                case 3:
                    this.w = value;
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
                case 3: return this.w;
                default: throw new Error('index is out of range: ' + index);
            }
        }
        clone() {
            return new Vector4(this.x, this.y, this.z, this.w);
        }
        copy(v) {
            this.x = v.x;
            this.y = v.y;
            this.z = v.z;
            this.w = (v.w !== undefined) ? v.w : 1;
            return this;
        }
        add(v, w) {
            if (w !== undefined) {
                console.warn('THREE.Vector4: .add() now only accepts one argument. Use .addVectors( a, b ) instead.');
                return this.addVectors(v, w);
            }
            this.x += v.x;
            this.y += v.y;
            this.z += v.z;
            this.w += v.w;
            return this;
        }
        addScalar(s) {
            this.x += s;
            this.y += s;
            this.z += s;
            this.w += s;
            return this;
        }
        addVectors(a, b) {
            this.x = a.x + b.x;
            this.y = a.y + b.y;
            this.z = a.z + b.z;
            this.w = a.w + b.w;
            return this;
        }
        addScaledVector(v, s) {
            this.x += v.x * s;
            this.y += v.y * s;
            this.z += v.z * s;
            this.w += v.w * s;
            return this;
        }
        sub(v, w) {
            if (w !== undefined) {
                console.warn('THREE.Vector4: .sub() now only accepts one argument. Use .subVectors( a, b ) instead.');
                return this.subVectors(v, w);
            }
            this.x -= v.x;
            this.y -= v.y;
            this.z -= v.z;
            this.w -= v.w;
            return this;
        }
        subScalar(s) {
            this.x -= s;
            this.y -= s;
            this.z -= s;
            this.w -= s;
            return this;
        }
        subVectors(a, b) {
            this.x = a.x - b.x;
            this.y = a.y - b.y;
            this.z = a.z - b.z;
            this.w = a.w - b.w;
            return this;
        }
        multiplyScalar(scalar) {
            this.x *= scalar;
            this.y *= scalar;
            this.z *= scalar;
            this.w *= scalar;
            return this;
        }
        applyMatrix4(m) {
            let x = this.x, y = this.y, z = this.z, w = this.w;
            let e = m.elements;
            this.x = e[0] * x + e[4] * y + e[8] * z + e[12] * w;
            this.y = e[1] * x + e[5] * y + e[9] * z + e[13] * w;
            this.z = e[2] * x + e[6] * y + e[10] * z + e[14] * w;
            this.w = e[3] * x + e[7] * y + e[11] * z + e[15] * w;
            return this;
        }
        divideScalar(scalar) {
            return this.multiplyScalar(1 / scalar);
        }
        setAxisAngleFromQuaternion(q) {
            this.w = 2 * Math.acos(q.w);
            let s = Math.sqrt(1 - q.w * q.w);
            if (s < 0.0001) {
                this.x = 1;
                this.y = 0;
                this.z = 0;
            }
            else {
                this.x = q.x / s;
                this.y = q.y / s;
                this.z = q.z / s;
            }
            return this;
        }
        setAxisAngleFromRotationMatrix(m) {
            let angle, x, y, z, epsilon = 0.01, epsilon2 = 0.1, te = m.elements, m11 = te[0], m12 = te[4], m13 = te[8], m21 = te[1], m22 = te[5], m23 = te[9], m31 = te[2], m32 = te[6], m33 = te[10];
            if ((Math.abs(m12 - m21) < epsilon) &&
                (Math.abs(m13 - m31) < epsilon) &&
                (Math.abs(m23 - m32) < epsilon)) {
                if ((Math.abs(m12 + m21) < epsilon2) &&
                    (Math.abs(m13 + m31) < epsilon2) &&
                    (Math.abs(m23 + m32) < epsilon2) &&
                    (Math.abs(m11 + m22 + m33 - 3) < epsilon2)) {
                    this.set(1, 0, 0, 0);
                    return this;
                }
                angle = Math.PI;
                let xx = (m11 + 1) / 2;
                let yy = (m22 + 1) / 2;
                let zz = (m33 + 1) / 2;
                let xy = (m12 + m21) / 4;
                let xz = (m13 + m31) / 4;
                let yz = (m23 + m32) / 4;
                if ((xx > yy) && (xx > zz)) {
                    if (xx < epsilon) {
                        x = 0;
                        y = 0.707106781;
                        z = 0.707106781;
                    }
                    else {
                        x = Math.sqrt(xx);
                        y = xy / x;
                        z = xz / x;
                    }
                }
                else if (yy > zz) {
                    if (yy < epsilon) {
                        x = 0.707106781;
                        y = 0;
                        z = 0.707106781;
                    }
                    else {
                        y = Math.sqrt(yy);
                        x = xy / y;
                        z = yz / y;
                    }
                }
                else {
                    if (zz < epsilon) {
                        x = 0.707106781;
                        y = 0.707106781;
                        z = 0;
                    }
                    else {
                        z = Math.sqrt(zz);
                        x = xz / z;
                        y = yz / z;
                    }
                }
                this.set(x, y, z, angle);
                return this;
            }
            let s = Math.sqrt((m32 - m23) * (m32 - m23) +
                (m13 - m31) * (m13 - m31) +
                (m21 - m12) * (m21 - m12));
            if (Math.abs(s) < 0.001)
                s = 1;
            this.x = (m32 - m23) / s;
            this.y = (m13 - m31) / s;
            this.z = (m21 - m12) / s;
            this.w = Math.acos((m11 + m22 + m33 - 1) / 2);
            return this;
        }
        min(v) {
            this.x = Math.min(this.x, v.x);
            this.y = Math.min(this.y, v.y);
            this.z = Math.min(this.z, v.z);
            this.w = Math.min(this.w, v.w);
            return this;
        }
        max(v) {
            this.x = Math.max(this.x, v.x);
            this.y = Math.max(this.y, v.y);
            this.z = Math.max(this.z, v.z);
            this.w = Math.max(this.w, v.w);
            return this;
        }
        clamp(min, max) {
            this.x = Math.max(min.x, Math.min(max.x, this.x));
            this.y = Math.max(min.y, Math.min(max.y, this.y));
            this.z = Math.max(min.z, Math.min(max.z, this.z));
            this.w = Math.max(min.w, Math.min(max.w, this.w));
            return this;
        }
        clampScalar(minVal, maxVal) {
            let min, max;
            if (min === undefined) {
                min = new Vector4();
                max = new Vector4();
            }
            min.set(minVal, minVal, minVal, minVal);
            max.set(maxVal, maxVal, maxVal, maxVal);
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
            this.w = Math.floor(this.w);
            return this;
        }
        ceil() {
            this.x = Math.ceil(this.x);
            this.y = Math.ceil(this.y);
            this.z = Math.ceil(this.z);
            this.w = Math.ceil(this.w);
            return this;
        }
        round() {
            this.x = Math.round(this.x);
            this.y = Math.round(this.y);
            this.z = Math.round(this.z);
            this.w = Math.round(this.w);
            return this;
        }
        roundToZero() {
            this.x = (this.x < 0) ? Math.ceil(this.x) : Math.floor(this.x);
            this.y = (this.y < 0) ? Math.ceil(this.y) : Math.floor(this.y);
            this.z = (this.z < 0) ? Math.ceil(this.z) : Math.floor(this.z);
            this.w = (this.w < 0) ? Math.ceil(this.w) : Math.floor(this.w);
            return this;
        }
        negate() {
            this.x = -this.x;
            this.y = -this.y;
            this.z = -this.z;
            this.w = -this.w;
            return this;
        }
        dot(v) {
            return this.x * v.x + this.y * v.y + this.z * v.z + this.w * v.w;
        }
        lengthSq() {
            return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
        }
        length() {
            return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
        }
        manhattanLength() {
            return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w);
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
            this.w += (v.w - this.w) * alpha;
            return this;
        }
        lerpVectors(v1, v2, alpha) {
            return this.subVectors(v2, v1).multiplyScalar(alpha).add(v1);
        }
        equals(v) {
            return ((v.x === this.x) && (v.y === this.y) && (v.z === this.z) && (v.w === this.w));
        }
        fromArray(array, offset) {
            if (offset === undefined)
                offset = 0;
            this.x = array[offset];
            this.y = array[offset + 1];
            this.z = array[offset + 2];
            this.w = array[offset + 3];
            return this;
        }
        toArray(array, offset) {
            if (array === undefined)
                array = [];
            if (offset === undefined)
                offset = 0;
            array[offset] = this.x;
            array[offset + 1] = this.y;
            array[offset + 2] = this.z;
            array[offset + 3] = this.w;
            return array;
        }
        fromBufferAttribute(attribute, index, offset) {
            if (offset !== undefined)
                console.warn('THREE.Vector4: offset has been removed from .fromBufferAttribute().');
            this.x = attribute.getX(index);
            this.y = attribute.getY(index);
            this.z = attribute.getZ(index);
            this.w = attribute.getW(index);
            return this;
        }
    }
    exports.Vector4 = Vector4;
});
//# sourceMappingURL=Vector4.js.map