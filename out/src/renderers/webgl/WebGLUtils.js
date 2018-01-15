define(["require", "exports", "../../constants.js"], function (require, exports, constants_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class WebGLUtils {
        constructor(gl, extensions) {
            this.gl = gl;
            this.extensions = extensions;
        }
        convert(p) {
            var extension;
            if (p === constants_js_1.RepeatWrapping)
                return this.gl.REPEAT;
            if (p === constants_js_1.ClampToEdgeWrapping)
                return this.gl.CLAMP_TO_EDGE;
            if (p === constants_js_1.MirroredRepeatWrapping)
                return this.gl.MIRRORED_REPEAT;
            if (p === constants_js_1.NearestFilter)
                return this.gl.NEAREST;
            if (p === constants_js_1.NearestMipMapNearestFilter)
                return this.gl.NEAREST_MIPMAP_NEAREST;
            if (p === constants_js_1.NearestMipMapLinearFilter)
                return this.gl.NEAREST_MIPMAP_LINEAR;
            if (p === constants_js_1.LinearFilter)
                return this.gl.LINEAR;
            if (p === constants_js_1.LinearMipMapNearestFilter)
                return this.gl.LINEAR_MIPMAP_NEAREST;
            if (p === constants_js_1.LinearMipMapLinearFilter)
                return this.gl.LINEAR_MIPMAP_LINEAR;
            if (p === constants_js_1.UnsignedByteType)
                return this.gl.UNSIGNED_BYTE;
            if (p === constants_js_1.UnsignedShort4444Type)
                return this.gl.UNSIGNED_SHORT_4_4_4_4;
            if (p === constants_js_1.UnsignedShort5551Type)
                return this.gl.UNSIGNED_SHORT_5_5_5_1;
            if (p === constants_js_1.UnsignedShort565Type)
                return this.gl.UNSIGNED_SHORT_5_6_5;
            if (p === constants_js_1.ByteType)
                return this.gl.BYTE;
            if (p === constants_js_1.ShortType)
                return this.gl.SHORT;
            if (p === constants_js_1.UnsignedShortType)
                return this.gl.UNSIGNED_SHORT;
            if (p === constants_js_1.IntType)
                return this.gl.INT;
            if (p === constants_js_1.UnsignedIntType)
                return this.gl.UNSIGNED_INT;
            if (p === constants_js_1.FloatType)
                return this.gl.FLOAT;
            if (p === constants_js_1.HalfFloatType) {
                extension = this.extensions.get('OES_texture_half_float');
                if (extension !== null)
                    return extension.HALF_FLOAT_OES;
            }
            if (p === constants_js_1.AlphaFormat)
                return this.gl.ALPHA;
            if (p === constants_js_1.RGBFormat)
                return this.gl.RGB;
            if (p === constants_js_1.RGBAFormat)
                return this.gl.RGBA;
            if (p === constants_js_1.LuminanceFormat)
                return this.gl.LUMINANCE;
            if (p === constants_js_1.LuminanceAlphaFormat)
                return this.gl.LUMINANCE_ALPHA;
            if (p === constants_js_1.DepthFormat)
                return this.gl.DEPTH_COMPONENT;
            if (p === constants_js_1.DepthStencilFormat)
                return this.gl.DEPTH_STENCIL;
            if (p === constants_js_1.AddEquation)
                return this.gl.FUNC_ADD;
            if (p === constants_js_1.SubtractEquation)
                return this.gl.FUNC_SUBTRACT;
            if (p === constants_js_1.ReverseSubtractEquation)
                return this.gl.FUNC_REVERSE_SUBTRACT;
            if (p === constants_js_1.ZeroFactor)
                return this.gl.ZERO;
            if (p === constants_js_1.OneFactor)
                return this.gl.ONE;
            if (p === constants_js_1.SrcColorFactor)
                return this.gl.SRC_COLOR;
            if (p === constants_js_1.OneMinusSrcColorFactor)
                return this.gl.ONE_MINUS_SRC_COLOR;
            if (p === constants_js_1.SrcAlphaFactor)
                return this.gl.SRC_ALPHA;
            if (p === constants_js_1.OneMinusSrcAlphaFactor)
                return this.gl.ONE_MINUS_SRC_ALPHA;
            if (p === constants_js_1.DstAlphaFactor)
                return this.gl.DST_ALPHA;
            if (p === constants_js_1.OneMinusDstAlphaFactor)
                return this.gl.ONE_MINUS_DST_ALPHA;
            if (p === constants_js_1.DstColorFactor)
                return this.gl.DST_COLOR;
            if (p === constants_js_1.OneMinusDstColorFactor)
                return this.gl.ONE_MINUS_DST_COLOR;
            if (p === constants_js_1.SrcAlphaSaturateFactor)
                return this.gl.SRC_ALPHA_SATURATE;
            if (p === constants_js_1.RGB_S3TC_DXT1_Format || p === constants_js_1.RGBA_S3TC_DXT1_Format ||
                p === constants_js_1.RGBA_S3TC_DXT3_Format || p === constants_js_1.RGBA_S3TC_DXT5_Format) {
                extension = this.extensions.get('WEBGL_compressed_texture_s3tc');
                if (extension !== null) {
                    if (p === constants_js_1.RGB_S3TC_DXT1_Format)
                        return extension.COMPRESSED_RGB_S3TC_DXT1_EXT;
                    if (p === constants_js_1.RGBA_S3TC_DXT1_Format)
                        return extension.COMPRESSED_RGBA_S3TC_DXT1_EXT;
                    if (p === constants_js_1.RGBA_S3TC_DXT3_Format)
                        return extension.COMPRESSED_RGBA_S3TC_DXT3_EXT;
                    if (p === constants_js_1.RGBA_S3TC_DXT5_Format)
                        return extension.COMPRESSED_RGBA_S3TC_DXT5_EXT;
                }
            }
            if (p === constants_js_1.RGB_PVRTC_4BPPV1_Format || p === constants_js_1.RGB_PVRTC_2BPPV1_Format ||
                p === constants_js_1.RGBA_PVRTC_4BPPV1_Format || p === constants_js_1.RGBA_PVRTC_2BPPV1_Format) {
                extension = this.extensions.get('WEBGL_compressed_texture_pvrtc');
                if (extension !== null) {
                    if (p === constants_js_1.RGB_PVRTC_4BPPV1_Format)
                        return extension.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
                    if (p === constants_js_1.RGB_PVRTC_2BPPV1_Format)
                        return extension.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
                    if (p === constants_js_1.RGBA_PVRTC_4BPPV1_Format)
                        return extension.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
                    if (p === constants_js_1.RGBA_PVRTC_2BPPV1_Format)
                        return extension.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;
                }
            }
            if (p === constants_js_1.RGB_ETC1_Format) {
                extension = this.extensions.get('WEBGL_compressed_texture_etc1');
                if (extension !== null)
                    return extension.COMPRESSED_RGB_ETC1_WEBGL;
            }
            if (p === constants_js_1.MinEquation || p === constants_js_1.MaxEquation) {
                extension = this.extensions.get('EXT_blend_minmax');
                if (extension !== null) {
                    if (p === constants_js_1.MinEquation)
                        return extension.MIN_EXT;
                    if (p === constants_js_1.MaxEquation)
                        return extension.MAX_EXT;
                }
            }
            if (p === constants_js_1.UnsignedInt248Type) {
                extension = this.extensions.get('WEBGL_depth_texture');
                if (extension !== null)
                    return extension.UNSIGNED_INT_24_8_WEBGL;
            }
            return 0;
        }
    }
    exports.WebGLUtils = WebGLUtils;
});
//# sourceMappingURL=WebGLUtils.js.map