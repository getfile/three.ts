define(["require", "exports", "./Light"], function (require, exports, Light_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class RectAreaLight extends Light_1.Light {
        constructor(color, intensity, width, height) {
            super(color, intensity);
            this.type = 'RectAreaLight';
            this.position.set(0, 1, 0);
            this.updateMatrix();
            this.width = (width !== undefined) ? width : 10;
            this.height = (height !== undefined) ? height : 10;
        }
        copy(source) {
            super.copy(source);
            this.width = source.width;
            this.height = source.height;
            return this;
        }
        toJSON(meta) {
            var data = super.toJSON(meta);
            data.object.width = this.width;
            data.object.height = this.height;
            return data;
        }
    }
    exports.RectAreaLight = RectAreaLight;
});
//# sourceMappingURL=RectAreaLight.js.map