define(["require", "exports", "./Texture"], function (require, exports, Texture_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class CanvasTexture extends Texture_1.Texture {
        constructor(canvas, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy) {
            super(null, canvas, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy);
            this.needsUpdate = true;
        }
    }
    exports.CanvasTexture = CanvasTexture;
});
//# sourceMappingURL=CanvasTexture.js.map