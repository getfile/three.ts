define(["require", "exports", "./Texture.js", "../constants.js"], function (require, exports, Texture_js_1, constants_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class DepthTexture extends Texture_js_1.Texture {
        constructor(width, height, type, mapping, wrapS, wrapT, magFilter, minFilter, anisotropy, format) {
            format = format !== undefined ? format : constants_js_1.DepthFormat;
            if (format !== constants_js_1.DepthFormat && format !== constants_js_1.DepthStencilFormat)
                throw new Error('DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat');
            if (type === undefined && format === constants_js_1.DepthFormat)
                type = constants_js_1.UnsignedShortType;
            if (type === undefined && format === constants_js_1.DepthStencilFormat)
                type = constants_js_1.UnsignedInt248Type;
            super(null, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy);
            this.image = { width: width, height: height };
            this.magFilter = magFilter !== undefined ? magFilter : constants_js_1.NearestFilter;
            this.minFilter = minFilter !== undefined ? minFilter : constants_js_1.NearestFilter;
            this.flipY = false;
            this.generateMipmaps = false;
        }
    }
    exports.DepthTexture = DepthTexture;
});
//# sourceMappingURL=DepthTexture.js.map