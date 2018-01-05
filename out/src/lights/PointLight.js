define(["require", "exports", "./Light", "../cameras/PerspectiveCamera", "./LightShadow"], function (require, exports, Light_1, PerspectiveCamera_1, LightShadow_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class PointLight extends Light_1.Light {
        constructor(color, intensity, distance, decay) {
            super(color, intensity);
            this.type = 'PointLight';
            this.distance = (distance !== undefined) ? distance : 0;
            this.decay = (decay !== undefined) ? decay : 1;
            this.shadow = new LightShadow_1.LightShadow(new PerspectiveCamera_1.PerspectiveCamera(90, 1, 0.5, 500));
        }
        get power() {
            return this.intensity * 4 * Math.PI;
        }
        set power(power) {
            this.intensity = power / (4 * Math.PI);
        }
        copy(source) {
            super.copy(source);
            this.distance = source.distance;
            this.decay = source.decay;
            this.shadow = source.shadow.clone();
            return this;
        }
    }
    exports.PointLight = PointLight;
});
//# sourceMappingURL=PointLight.js.map