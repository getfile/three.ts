define(["require", "exports", "./Light", "../math/Color", "../core/Object3D"], function (require, exports, Light_1, Color_1, Object3D_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class HemisphereLight extends Light_1.Light {
        constructor(skyColor, groundColor, intensity) {
            super(skyColor, intensity);
            this.type = 'HemisphereLight';
            this.castShadow = undefined;
            this.position.copy(Object3D_1.Object3D.DefaultUp);
            this.updateMatrix();
            this.groundColor = new Color_1.Color(groundColor);
        }
        copy(source) {
            super.copy(source);
            this.groundColor.copy(source.groundColor);
            return this;
        }
    }
    exports.HemisphereLight = HemisphereLight;
});
//# sourceMappingURL=HemisphereLight.js.map