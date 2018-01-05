define(["require", "exports", "./Light", "./SpotLightShadow", "../core/Object3D"], function (require, exports, Light_1, SpotLightShadow_1, Object3D_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class SpotLight extends Light_1.Light {
        constructor(color, intensity, distance, angle, penumbra, decay) {
            super(color, intensity);
            this.type = 'SpotLight';
            this.position.copy(Object3D_1.Object3D.DefaultUp);
            this.updateMatrix();
            this.target = new Object3D_1.Object3D();
            this.distance = (distance !== undefined) ? distance : 0;
            this.angle = (angle !== undefined) ? angle : Math.PI / 3;
            this.penumbra = (penumbra !== undefined) ? penumbra : 0;
            this.decay = (decay !== undefined) ? decay : 1;
            this.shadow = new SpotLightShadow_1.SpotLightShadow();
        }
        get power() {
            return this.intensity * Math.PI;
        }
        set power(power) {
            this.intensity = power / Math.PI;
        }
        copy(source) {
            super.copy(source);
            this.distance = source.distance;
            this.angle = source.angle;
            this.penumbra = source.penumbra;
            this.decay = source.decay;
            this.target = source.target.clone();
            this.shadow = source.shadow.clone();
            return this;
        }
    }
    exports.SpotLight = SpotLight;
});
//# sourceMappingURL=SpotLight.js.map