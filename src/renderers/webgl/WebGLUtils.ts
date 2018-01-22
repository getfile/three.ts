/**
 * @author thespite / http://www.twitter.com/thespite
 */

import * as Constant from '../../constants.js';


class WebGLUtils
{
	gl;
	extensions;

	constructor( gl, extensions )
	{
		this.gl = gl;
		this.extensions = extensions;
	}

	convert( p )
	{
		var extension;

		if ( p === Constant.RepeatWrapping ) return this.gl.REPEAT;
		if ( p === Constant.ClampToEdgeWrapping ) return this.gl.CLAMP_TO_EDGE;
		if ( p === Constant.MirroredRepeatWrapping ) return this.gl.MIRRORED_REPEAT;

		if ( p === Constant.NearestFilter ) return this.gl.NEAREST;
		if ( p === Constant.NearestMipMapNearestFilter ) return this.gl.NEAREST_MIPMAP_NEAREST;
		if ( p === Constant.NearestMipMapLinearFilter ) return this.gl.NEAREST_MIPMAP_LINEAR;

		if ( p === Constant.LinearFilter ) return this.gl.LINEAR;
		if ( p === Constant.LinearMipMapNearestFilter ) return this.gl.LINEAR_MIPMAP_NEAREST;
		if ( p === Constant.LinearMipMapLinearFilter ) return this.gl.LINEAR_MIPMAP_LINEAR;

		if ( p === Constant.UnsignedByteType ) return this.gl.UNSIGNED_BYTE;
		if ( p === Constant.UnsignedShort4444Type ) return this.gl.UNSIGNED_SHORT_4_4_4_4;
		if ( p === Constant.UnsignedShort5551Type ) return this.gl.UNSIGNED_SHORT_5_5_5_1;
		if ( p === Constant.UnsignedShort565Type ) return this.gl.UNSIGNED_SHORT_5_6_5;

		if ( p === Constant.ByteType ) return this.gl.BYTE;
		if ( p === Constant.ShortType ) return this.gl.SHORT;
		if ( p === Constant.UnsignedShortType ) return this.gl.UNSIGNED_SHORT;
		if ( p === Constant.IntType ) return this.gl.INT;
		if ( p === Constant.UnsignedIntType ) return this.gl.UNSIGNED_INT;
		if ( p === Constant.FloatType ) return this.gl.FLOAT;

		if ( p === Constant.HalfFloatType )
		{
			extension = this.extensions.get( 'OES_texture_half_float' );
			if ( extension !== null )
				return extension.HALF_FLOAT_OES;
		}

		if ( p === Constant.AlphaFormat ) return this.gl.ALPHA;
		if ( p === Constant.RGBFormat ) return this.gl.RGB;
		if ( p === Constant.RGBAFormat ) return this.gl.RGBA;
		if ( p === Constant.LuminanceFormat ) return this.gl.LUMINANCE;
		if ( p === Constant.LuminanceAlphaFormat ) return this.gl.LUMINANCE_ALPHA;
		if ( p === Constant.DepthFormat ) return this.gl.DEPTH_COMPONENT;
		if ( p === Constant.DepthStencilFormat ) return this.gl.DEPTH_STENCIL;

		if ( p === Constant.AddEquation ) return this.gl.FUNC_ADD;
		if ( p === Constant.SubtractEquation ) return this.gl.FUNC_SUBTRACT;
		if ( p === Constant.ReverseSubtractEquation ) return this.gl.FUNC_REVERSE_SUBTRACT;

		if ( p === Constant.ZeroFactor ) return this.gl.ZERO;
		if ( p === Constant.OneFactor ) return this.gl.ONE;
		if ( p === Constant.SrcColorFactor ) return this.gl.SRC_COLOR;
		if ( p === Constant.OneMinusSrcColorFactor ) return this.gl.ONE_MINUS_SRC_COLOR;
		if ( p === Constant.SrcAlphaFactor ) return this.gl.SRC_ALPHA;
		if ( p === Constant.OneMinusSrcAlphaFactor ) return this.gl.ONE_MINUS_SRC_ALPHA;
		if ( p === Constant.DstAlphaFactor ) return this.gl.DST_ALPHA;
		if ( p === Constant.OneMinusDstAlphaFactor ) return this.gl.ONE_MINUS_DST_ALPHA;

		if ( p === Constant.DstColorFactor ) return this.gl.DST_COLOR;
		if ( p === Constant.OneMinusDstColorFactor ) return this.gl.ONE_MINUS_DST_COLOR;
		if ( p === Constant.SrcAlphaSaturateFactor ) return this.gl.SRC_ALPHA_SATURATE;

		if ( p === Constant.RGB_S3TC_DXT1_Format || p === Constant.RGBA_S3TC_DXT1_Format ||
			p === Constant.RGBA_S3TC_DXT3_Format || p === Constant.RGBA_S3TC_DXT5_Format )
		{
			extension = this.extensions.get( 'WEBGL_compressed_texture_s3tc' );
			if ( extension !== null )
			{
				if ( p === Constant.RGB_S3TC_DXT1_Format ) return extension.COMPRESSED_RGB_S3TC_DXT1_EXT;
				if ( p === Constant.RGBA_S3TC_DXT1_Format ) return extension.COMPRESSED_RGBA_S3TC_DXT1_EXT;
				if ( p === Constant.RGBA_S3TC_DXT3_Format ) return extension.COMPRESSED_RGBA_S3TC_DXT3_EXT;
				if ( p === Constant.RGBA_S3TC_DXT5_Format ) return extension.COMPRESSED_RGBA_S3TC_DXT5_EXT;
			}
		}

		if ( p === Constant.RGB_PVRTC_4BPPV1_Format || p === Constant.RGB_PVRTC_2BPPV1_Format ||
			p === Constant.RGBA_PVRTC_4BPPV1_Format || p === Constant.RGBA_PVRTC_2BPPV1_Format )
		{
			extension = this.extensions.get( 'WEBGL_compressed_texture_pvrtc' );
			if ( extension !== null )
			{
				if ( p === Constant.RGB_PVRTC_4BPPV1_Format ) return extension.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
				if ( p === Constant.RGB_PVRTC_2BPPV1_Format ) return extension.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
				if ( p === Constant.RGBA_PVRTC_4BPPV1_Format ) return extension.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
				if ( p === Constant.RGBA_PVRTC_2BPPV1_Format ) return extension.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;
			}
		}

		if ( p === Constant.RGB_ETC1_Format )
		{
			extension = this.extensions.get( 'WEBGL_compressed_texture_etc1' );
			if ( extension !== null ) return extension.COMPRESSED_RGB_ETC1_WEBGL;
		}

		if ( p === Constant.MinEquation || p === Constant.MaxEquation )
		{
			extension = this.extensions.get( 'EXT_blend_minmax' );
			if ( extension !== null )
			{
				if ( p === Constant.MinEquation ) return extension.MIN_EXT;
				if ( p === Constant.MaxEquation ) return extension.MAX_EXT;
			}
		}

		if ( p === Constant.UnsignedInt248Type )
		{
			extension = this.extensions.get( 'WEBGL_depth_texture' );
			if ( extension !== null ) return extension.UNSIGNED_INT_24_8_WEBGL;
		}

		return 0;
	}


}

export { WebGLUtils };
