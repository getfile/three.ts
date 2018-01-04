define(["require", "exports", "./Texture", "../constants"], function (require, exports, Texture_1, constants_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class DataTexture extends Texture_1.Texture {
        constructor(data, width, height, format, type, mapping, wrapS, wrapT, magFilter, minFilter, anisotropy, encoding) {
            super(null, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy, encoding);
            this.image = { data: data, width: width, height: height };
            this.magFilter = magFilter !== undefined ? magFilter : constants_1.NearestFilter;
            this.minFilter = minFilter !== undefined ? minFilter : constants_1.NearestFilter;
            this.generateMipmaps = false;
            this.flipY = false;
            this.unpackAlignment = 1;
        }
    }
    exports.DataTexture = DataTexture;
});
//# sourceMappingURL=DataTexture.js.map