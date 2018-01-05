define(["require", "exports", "./LightShadow", "../math/Math", "../cameras/PerspectiveCamera"], function (require, exports, LightShadow_1, Math_1, PerspectiveCamera_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class SpotLightShadow extends LightShadow_1.LightShadow {
        constructor() {
            super(new PerspectiveCamera_1.PerspectiveCamera(50, 1, 0.5, 500));
        }
        update(light) {
            var camera = this.camera;
            var fov = Math_1._Math.RAD2DEG * 2 * light.angle;
            var aspect = this.mapSize.width / this.mapSize.height;
            var far = light.distance || camera.far;
            if (fov !== camera.fov || aspect !== camera.aspect || far !== camera.far) {
                camera.fov = fov;
                camera.aspect = aspect;
                camera.far = far;
                camera.updateProjectionMatrix();
            }
        }
    }
    exports.SpotLightShadow = SpotLightShadow;
});
//# sourceMappingURL=SpotLightShadow.js.map