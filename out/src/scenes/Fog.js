define(["require", "exports", "../math/Color"], function (require, exports, Color_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Fog {
        constructor(color, near, far) {
            this.name = '';
            this.color = new Color_1.Color(color);
            this.near = (near !== undefined) ? near : 1;
            this.far = (far !== undefined) ? far : 1000;
        }
        clone() {
            return new Fog(this.color.getHex(), this.near, this.far);
        }
        toJSON() {
            return {
                type: 'Fog',
                color: this.color.getHex(),
                near: this.near,
                far: this.far
            };
        }
    }
    exports.Fog = Fog;
});
//# sourceMappingURL=Fog.js.map