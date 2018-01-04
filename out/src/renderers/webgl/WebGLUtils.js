define(["require", "exports", "../../constants.js"], function (require, exports, constants_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function WebGLUtils(gl, extensions) {
        function convert(p) {
            var extension;
            if (p === constants_js_1.RepeatWrapping)
                return gl.REPEAT;
            if (p === constants_js_1.ClampToEdgeWrapping)
                return gl.CLAMP_TO_EDGE;
            if (p === constants_js_1.MirroredRepeatWrapping)
                return gl.MIRRORED_REPEAT;
            if (p === constants_js_1.NearestFilter)
                return gl.NEAREST;
            if (p === constants_js_1.NearestMipMapNearestFilter)
                return gl.NEAREST_MIPMAP_NEAREST;
            if (p === constants_js_1.NearestMipMapLinearFilter)
                return gl.NEAREST_MIPMAP_LINEAR;
            if (p === constants_js_1.LinearFilter)
                return gl.LINEAR;
            if (p === constants_js_1.LinearMipMapNearestFilter)
                return gl.LINEAR_MIPMAP_NEAREST;
            if (p === constants_js_1.LinearMipMapLinearFilter)
                return gl.LINEAR_MIPMAP_LINEAR;
            if (p === constants_js_1.UnsignedByteType)
                return gl.UNSIGNED_BYTE;
            if (p === constants_js_1.UnsignedShort4444Type)
                return gl.UNSIGNED_SHORT_4_4_4_4;
            if (p === constants_js_1.UnsignedShort5551Type)
                return gl.UNSIGNED_SHORT_5_5_5_1;
            if (p === constants_js_1.UnsignedShort565Type)
                return gl.UNSIGNED_SHORT_5_6_5;
            if (p === constants_js_1.ByteType)
                return gl.BYTE;
            if (p === constants_js_1.ShortType)
                return gl.SHORT;
            if (p === constants_js_1.UnsignedShortType)
                return gl.UNSIGNED_SHORT;
            if (p === constants_js_1.IntType)
                return gl.INT;
            if (p === constants_js_1.UnsignedIntType)
                return gl.UNSIGNED_INT;
            if (p === constants_js_1.FloatType)
                return gl.FLOAT;
            if (p === constants_js_1.HalfFloatType) {
                extension = extensions.get('OES_texture_half_float');
                if (extension !== null)
                    return extension.HALF_FLOAT_OES;
            }
            if (p === constants_js_1.AlphaFormat)
                return gl.ALPHA;
            if (p === constants_js_1.RGBFormat)
                return gl.RGB;
            if (p === constants_js_1.RGBAFormat)
                return gl.RGBA;
            if (p === constants_js_1.LuminanceFormat)
                return gl.LUMINANCE;
            if (p === constants_js_1.LuminanceAlphaFormat)
                return gl.LUMINANCE_ALPHA;
            if (p === constants_js_1.DepthFormat)
                return gl.DEPTH_COMPONENT;
            if (p === constants_js_1.DepthStencilFormat)
                return gl.DEPTH_STENCIL;
            if (p === constants_js_1.AddEquation)
                return gl.FUNC_ADD;
            if (p === constants_js_1.SubtractEquation)
                return gl.FUNC_SUBTRACT;
            if (p === constants_js_1.ReverseSubtractEquation)
                return gl.FUNC_REVERSE_SUBTRACT;
            if (p === constants_js_1.ZeroFactor)
                return gl.ZERO;
            if (p === constants_js_1.OneFactor)
                return gl.ONE;
            if (p === constants_js_1.SrcColorFactor)
                return gl.SRC_COLOR;
            if (p === constants_js_1.OneMinusSrcColorFactor)
                return gl.ONE_MINUS_SRC_COLOR;
            if (p === constants_js_1.SrcAlphaFactor)
                return gl.SRC_ALPHA;
            if (p === constants_js_1.OneMinusSrcAlphaFactor)
                return gl.ONE_MINUS_SRC_ALPHA;
            if (p === constants_js_1.DstAlphaFactor)
                return gl.DST_ALPHA;
            if (p === constants_js_1.OneMinusDstAlphaFactor)
                return gl.ONE_MINUS_DST_ALPHA;
            if (p === constants_js_1.DstColorFactor)
                return gl.DST_COLOR;
            if (p === constants_js_1.OneMinusDstColorFactor)
                return gl.ONE_MINUS_DST_COLOR;
            if (p === constants_js_1.SrcAlphaSaturateFactor)
                return gl.SRC_ALPHA_SATURATE;
            if (p === constants_js_1.RGB_S3TC_DXT1_Format || p === constants_js_1.RGBA_S3TC_DXT1_Format ||
                p === constants_js_1.RGBA_S3TC_DXT3_Format || p === constants_js_1.RGBA_S3TC_DXT5_Format) {
                extension = extensions.get('WEBGL_compressed_texture_s3tc');
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
                extension = extensions.get('WEBGL_compressed_texture_pvrtc');
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
                extension = extensions.get('WEBGL_compressed_texture_etc1');
                if (extension !== null)
                    return extension.COMPRESSED_RGB_ETC1_WEBGL;
            }
            if (p === constants_js_1.MinEquation || p === constants_js_1.MaxEquation) {
                extension = extensions.get('EXT_blend_minmax');
                if (extension !== null) {
                    if (p === constants_js_1.MinEquation)
                        return extension.MIN_EXT;
                    if (p === constants_js_1.MaxEquation)
                        return extension.MAX_EXT;
                }
            }
            if (p === constants_js_1.UnsignedInt248Type) {
                extension = extensions.get('WEBGL_depth_texture');
                if (extension !== null)
                    return extension.UNSIGNED_INT_24_8_WEBGL;
            }
            return 0;
        }
        return { convert: convert };
    }
    exports.WebGLUtils = WebGLUtils;
});
//# sourceMappingURL=WebGLUtils.js.map