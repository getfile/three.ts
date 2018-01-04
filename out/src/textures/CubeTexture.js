define(["require", "exports", "./Texture", "../constants"], function (require, exports, Texture_1, constants_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class CubeTexture extends Texture_1.Texture {
        constructor(images, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy, encoding) {
            images = images !== undefined ? images : [];
            mapping = mapping !== undefined ? mapping : constants_1.CubeReflectionMapping;
            super(images, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy, encoding);
            this.flipY = false;
        }
        get images() {
            return this.image;
        }
        set images(value) {
            this.image = value;
        }
    }
    exports.CubeTexture = CubeTexture;
});
//# sourceMappingURL=CubeTexture.js.map