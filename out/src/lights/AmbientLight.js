define(["require", "exports", "./Light"], function (require, exports, Light_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class AmbientLight extends Light_1.Light {
        constructor(color, intensity) {
            super(color, intensity);
            this.type = 'AmbientLight';
            this.castShadow = undefined;
        }
    }
    exports.AmbientLight = AmbientLight;
});
//# sourceMappingURL=AmbientLight.js.map