define(["require", "exports", "../core/Object3D", "../math/Color"], function (require, exports, Object3D_1, Color_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Light extends Object3D_1.Object3D {
        constructor(color, intensity) {
            super();
            this.type = 'Light';
            this.color = new Color_1.Color(color);
            this.intensity = intensity !== undefined ? intensity : 1;
            this.receiveShadow = undefined;
        }
        copy(source) {
            super.copy(source);
            this.color.copy(source.color);
            this.intensity = source.intensity;
            return this;
        }
        toJSON(meta) {
            var data = super.toJSON(meta);
            data.object.color = this.color.getHex();
            data.object.intensity = this.intensity;
            if (this.groundColor !== undefined)
                data.object.groundColor = this.groundColor.getHex();
            if (this.distance !== undefined)
                data.object.distance = this.distance;
            if (this.angle !== undefined)
                data.object.angle = this.angle;
            if (this.decay !== undefined)
                data.object.decay = this.decay;
            if (this.penumbra !== undefined)
                data.object.penumbra = this.penumbra;
            if (this.shadow !== undefined)
                data.object.shadow = this.shadow.toJSON();
            return data;
        }
    }
    exports.Light = Light;
});
//# sourceMappingURL=Light.js.map