define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.REVISION = '89';
    exports.MOUSE = { LEFT: 0, MIDDLE: 1, RIGHT: 2 };
    exports.CullFaceNone = 0;
    exports.CullFaceBack = 1;
    exports.CullFaceFront = 2;
    exports.CullFaceFrontBack = 3;
    exports.FrontFaceDirectionCW = 0;
    exports.FrontFaceDirectionCCW = 1;
    exports.BasicShadowMap = 0;
    exports.PCFShadowMap = 1;
    exports.PCFSoftShadowMap = 2;
    exports.FrontSide = 0;
    exports.BackSide = 1;
    exports.DoubleSide = 2;
    exports.FlatShading = 1;
    exports.SmoothShading = 2;
    exports.NoColors = 0;
    exports.FaceColors = 1;
    exports.VertexColors = 2;
    exports.NoBlending = 0;
    exports.NormalBlending = 1;
    exports.AdditiveBlending = 2;
    exports.SubtractiveBlending = 3;
    exports.MultiplyBlending = 4;
    exports.CustomBlending = 5;
    exports.AddEquation = 100;
    exports.SubtractEquation = 101;
    exports.ReverseSubtractEquation = 102;
    exports.MinEquation = 103;
    exports.MaxEquation = 104;
    exports.ZeroFactor = 200;
    exports.OneFactor = 201;
    exports.SrcColorFactor = 202;
    exports.OneMinusSrcColorFactor = 203;
    exports.SrcAlphaFactor = 204;
    exports.OneMinusSrcAlphaFactor = 205;
    exports.DstAlphaFactor = 206;
    exports.OneMinusDstAlphaFactor = 207;
    exports.DstColorFactor = 208;
    exports.OneMinusDstColorFactor = 209;
    exports.SrcAlphaSaturateFactor = 210;
    exports.NeverDepth = 0;
    exports.AlwaysDepth = 1;
    exports.LessDepth = 2;
    exports.LessEqualDepth = 3;
    exports.EqualDepth = 4;
    exports.GreaterEqualDepth = 5;
    exports.GreaterDepth = 6;
    exports.NotEqualDepth = 7;
    exports.MultiplyOperation = 0;
    exports.MixOperation = 1;
    exports.AddOperation = 2;
    exports.NoToneMapping = 0;
    exports.LinearToneMapping = 1;
    exports.ReinhardToneMapping = 2;
    exports.Uncharted2ToneMapping = 3;
    exports.CineonToneMapping = 4;
    exports.UVMapping = 300;
    exports.CubeReflectionMapping = 301;
    exports.CubeRefractionMapping = 302;
    exports.EquirectangularReflectionMapping = 303;
    exports.EquirectangularRefractionMapping = 304;
    exports.SphericalReflectionMapping = 305;
    exports.CubeUVReflectionMapping = 306;
    exports.CubeUVRefractionMapping = 307;
    exports.RepeatWrapping = 1000;
    exports.ClampToEdgeWrapping = 1001;
    exports.MirroredRepeatWrapping = 1002;
    exports.NearestFilter = 1003;
    exports.NearestMipMapNearestFilter = 1004;
    exports.NearestMipMapLinearFilter = 1005;
    exports.LinearFilter = 1006;
    exports.LinearMipMapNearestFilter = 1007;
    exports.LinearMipMapLinearFilter = 1008;
    exports.UnsignedByteType = 1009;
    exports.ByteType = 1010;
    exports.ShortType = 1011;
    exports.UnsignedShortType = 1012;
    exports.IntType = 1013;
    exports.UnsignedIntType = 1014;
    exports.FloatType = 1015;
    exports.HalfFloatType = 1016;
    exports.UnsignedShort4444Type = 1017;
    exports.UnsignedShort5551Type = 1018;
    exports.UnsignedShort565Type = 1019;
    exports.UnsignedInt248Type = 1020;
    exports.AlphaFormat = 1021;
    exports.RGBFormat = 1022;
    exports.RGBAFormat = 1023;
    exports.LuminanceFormat = 1024;
    exports.LuminanceAlphaFormat = 1025;
    exports.RGBEFormat = exports.RGBAFormat;
    exports.DepthFormat = 1026;
    exports.DepthStencilFormat = 1027;
    exports.RGB_S3TC_DXT1_Format = 2001;
    exports.RGBA_S3TC_DXT1_Format = 2002;
    exports.RGBA_S3TC_DXT3_Format = 2003;
    exports.RGBA_S3TC_DXT5_Format = 2004;
    exports.RGB_PVRTC_4BPPV1_Format = 2100;
    exports.RGB_PVRTC_2BPPV1_Format = 2101;
    exports.RGBA_PVRTC_4BPPV1_Format = 2102;
    exports.RGBA_PVRTC_2BPPV1_Format = 2103;
    exports.RGB_ETC1_Format = 2151;
    exports.LoopOnce = 2200;
    exports.LoopRepeat = 2201;
    exports.LoopPingPong = 2202;
    exports.InterpolateDiscrete = 2300;
    exports.InterpolateLinear = 2301;
    exports.InterpolateSmooth = 2302;
    exports.ZeroCurvatureEnding = 2400;
    exports.ZeroSlopeEnding = 2401;
    exports.WrapAroundEnding = 2402;
    exports.TrianglesDrawMode = 0;
    exports.TriangleStripDrawMode = 1;
    exports.TriangleFanDrawMode = 2;
    exports.LinearEncoding = 3000;
    exports.sRGBEncoding = 3001;
    exports.GammaEncoding = 3007;
    exports.RGBEEncoding = 3002;
    exports.LogLuvEncoding = 3003;
    exports.RGBM7Encoding = 3004;
    exports.RGBM16Encoding = 3005;
    exports.RGBDEncoding = 3006;
    exports.BasicDepthPacking = 3200;
    exports.RGBADepthPacking = 3201;
});
//# sourceMappingURL=constants.js.map