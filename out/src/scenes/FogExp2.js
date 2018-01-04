define(["require", "exports", "../math/Color.js"], function (require, exports, Color_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class FogExp2 {
        constructor(color, density) {
            this.name = '';
            this.color = new Color_js_1.Color(color);
            this.density = (density !== undefined) ? density : 0.00025;
        }
        clone() {
            return new FogExp2(this.color.getHex(), this.density);
        }
        toJSON() {
            return {
                type: 'FogExp2',
                color: this.color.getHex(),
                density: this.density
            };
        }
    }
    exports.FogExp2 = FogExp2;
});
//# sourceMappingURL=FogExp2.js.map