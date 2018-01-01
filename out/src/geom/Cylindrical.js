define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Cylindrical {
        constructor(radius, theta, y) {
            this.radius = (radius !== undefined) ? radius : 1.0;
            this.theta = (theta !== undefined) ? theta : 0;
            this.y = (y !== undefined) ? y : 0;
            return this;
        }
        set(radius, theta, y) {
            this.radius = radius;
            this.theta = theta;
            this.y = y;
            return this;
        }
        clone() {
            return new Cylindrical().copy(this);
        }
        copy(other) {
            this.radius = other.radius;
            this.theta = other.theta;
            this.y = other.y;
            return this;
        }
        setFromVector3(vec3) {
            this.radius = Math.sqrt(vec3.x * vec3.x + vec3.z * vec3.z);
            this.theta = Math.atan2(vec3.x, vec3.z);
            this.y = vec3.y;
            return this;
        }
    }
    exports.Cylindrical = Cylindrical;
});
//# sourceMappingURL=Cylindrical.js.map