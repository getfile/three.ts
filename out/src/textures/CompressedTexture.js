define(["require", "exports", "./Texture"], function (require, exports, Texture_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class CompressedTexture extends Texture_1.Texture {
        constructor(mipmaps, width, height, format, type, mapping, wrapS, wrapT, magFilter, minFilter, anisotropy, encoding) {
            super(null, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy, encoding);
            this.image = { width: width, height: height };
            this.mipmaps = mipmaps;
            this.flipY = false;
            this.generateMipmaps = false;
        }
    }
    exports.CompressedTexture = CompressedTexture;
});
//# sourceMappingURL=CompressedTexture.js.map