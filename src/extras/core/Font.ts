/**
 * @author zz85 / http://www.lab4games.net/zz85/blog
 * @author mrdoob / http://mrdoob.com/
 */

import { QuadraticBezier, CubicBezier } from './Interpolations';
import { ShapePath } from './ShapePath';


class Font
{
	type;
	data;

	constructor( data )
	{
		this.type = 'Font';
		this.data = data;
	}

	size;
	divisions;

	createPaths( text )
	{
		let chars = String( text ).split( '' );
		let scale = this.size / this.data.resolution;
		let line_height = ( this.data.boundingBox.yMax - this.data.boundingBox.yMin + this.data.underlineThickness ) * scale;

		let offsetX = 0, offsetY = 0;
		let paths = [];

		for ( let i = 0; i < chars.length; i++ )
		{
			let char = chars[ i ];
			if ( char === '\n' )
			{
				offsetX = 0;
				offsetY -= line_height;
			} else
			{
				let ret = this.createPath( char, scale, offsetX, offsetY );
				offsetX += ret.offsetX;
				paths.push( ret.path );
			}
		}
		return paths;
	}

	createPath( c, scale, offsetX, offsetY )
	{
		let glyph = this.data.glyphs[ c ] || this.data.glyphs[ '?' ];

		if ( !glyph ) return;

		let path = new ShapePath();
		let pts = [];
		let x, y, cpx, cpy, cpx0, cpy0, cpx1, cpy1, cpx2, cpy2, laste;

		if ( glyph.o )
		{
			let outline = glyph._cachedOutline || ( glyph._cachedOutline = glyph.o.split( ' ' ) );
			for ( let i = 0, l = outline.length; i < l; )
			{
				let action = outline[ i++ ];
				switch ( action )
				{
					case 'm': // moveTo
						x = outline[ i++ ] * scale + offsetX;
						y = outline[ i++ ] * scale + offsetY;
						path.moveTo( x, y );
						break;

					case 'l': // lineTo
						x = outline[ i++ ] * scale + offsetX;
						y = outline[ i++ ] * scale + offsetY;
						path.lineTo( x, y );
						break;

					case 'q': // quadraticCurveTo
						cpx = outline[ i++ ] * scale + offsetX;
						cpy = outline[ i++ ] * scale + offsetY;
						cpx1 = outline[ i++ ] * scale + offsetX;
						cpy1 = outline[ i++ ] * scale + offsetY;

						path.quadraticCurveTo( cpx1, cpy1, cpx, cpy );
						laste = pts[ pts.length - 1 ];

						if ( laste )
						{
							cpx0 = laste.x;
							cpy0 = laste.y;

							for ( let i2 = 1; i2 <= this.divisions; i2++ )
							{
								let t = i2 / this.divisions;
								QuadraticBezier( t, cpx0, cpx1, cpx );
								QuadraticBezier( t, cpy0, cpy1, cpy );
							}
						}
						break;

					case 'b': // bezierCurveTo
						cpx = outline[ i++ ] * scale + offsetX;
						cpy = outline[ i++ ] * scale + offsetY;
						cpx1 = outline[ i++ ] * scale + offsetX;
						cpy1 = outline[ i++ ] * scale + offsetY;
						cpx2 = outline[ i++ ] * scale + offsetX;
						cpy2 = outline[ i++ ] * scale + offsetY;

						path.bezierCurveTo( cpx1, cpy1, cpx2, cpy2, cpx, cpy );
						laste = pts[ pts.length - 1 ];

						if ( laste )
						{
							cpx0 = laste.x;
							cpy0 = laste.y;
							for ( let i2 = 1; i2 <= this.divisions; i2++ )
							{
								let t = i2 / this.divisions;
								CubicBezier( t, cpx0, cpx1, cpx2, cpx );
								CubicBezier( t, cpy0, cpy1, cpy2, cpy );
							}
						}
						break;
				}
			}
		}
		return { offsetX: glyph.ha * scale, path: path };
	}

	generateShapes( text, size: number = 100, divisions: number = 4 )
	{
		//
		this.size = size;
		this.divisions = divisions;

		let paths = this.createPaths( text );
		let shapes = [];

		for ( let p = 0, pl = paths.length; p < pl; p++ )
			Array.prototype.push.apply( shapes, paths[ p ].toShapes() );

		return shapes;
	}

}


export { Font };
