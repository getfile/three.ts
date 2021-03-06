define(["require", "exports", "../math/Math"], function (require, exports, Math_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Spherical {
        constructor(radius = 1.0, phi = 0, theta = 0) {
            this.radius = radius;
            this.phi = phi;
            this.theta = theta;
        }
        set(radius, phi, theta) {
            this.radius = radius;
            this.phi = phi;
            this.theta = theta;
            return this;
        }
        clone() {
            return new Spherical().copy(this);
        }
        copy(other) {
            this.radius = other.radius;
            this.phi = other.phi;
            this.theta = other.theta;
            return this;
        }
        makeSafe() {
            var EPS = 0.000001;
            this.phi = Math.max(EPS, Math.min(Math.PI - EPS, this.phi));
            return this;
        }
        setFromVector3(vec3) {
            this.radius = vec3.length();
            if (this.radius === 0) {
                this.theta = 0;
                this.phi = 0;
            }
            else {
                this.theta = Math.atan2(vec3.x, vec3.z);
                this.phi = Math.acos(Math_1._Math.clamp(vec3.y / this.radius, -1, 1));
            }
            return this;
        }
    }
    exports.Spherical = Spherical;
});
//# sourceMappingURL=Spherical.js.map