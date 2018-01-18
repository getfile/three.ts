/**
 * @author mikael emtinger / http://gomo.se/
 * @author alteredq / http://alteredqualia.com/
 */

import { Box2 } from '../../geom/Box2';
import { Vector2 } from '../../math/Vector2';
import { Vector3 } from '../../math/Vector3';

class WebGLFlareRenderer
{
	renderer;
	gl;
	state;
	textures;
	capabilities;

	vertexBuffer;
	elementBuffer;
	shader;
	program;
	attributes;
	uniforms;
	tempTexture;
	occlusionTexture;

	constructor( renderer, gl, state, textures, capabilities )
	{
		this.renderer = renderer;
		this.gl = gl;
		this.state = state;
		this.textures = textures;
		this.capabilities = capabilities;
	}

	init()
	{
		let vertices = new Float32Array( [
			- 1, - 1, 0, 0,
			1, - 1, 1, 0,
			1, 1, 1, 1,
			- 1, 1, 0, 1
		] );

		let faces = new Uint16Array( [
			0, 1, 2,
			0, 2, 3
		] );

		// buffers

		this.vertexBuffer = this.gl.createBuffer();
		this.elementBuffer = this.gl.createBuffer();

		this.gl.bindBuffer( this.gl.ARRAY_BUFFER, this.vertexBuffer );
		this.gl.bufferData( this.gl.ARRAY_BUFFER, vertices, this.gl.STATIC_DRAW );

		this.gl.bindBuffer( this.gl.ELEMENT_ARRAY_BUFFER, this.elementBuffer );
		this.gl.bufferData( this.gl.ELEMENT_ARRAY_BUFFER, faces, this.gl.STATIC_DRAW );

		// textures

		this.tempTexture = this.gl.createTexture();
		this.occlusionTexture = this.gl.createTexture();

		this.state.bindTexture( this.gl.TEXTURE_2D, this.tempTexture );
		this.gl.texImage2D( this.gl.TEXTURE_2D, 0, this.gl.RGB, 16, 16, 0, this.gl.RGB, this.gl.UNSIGNED_BYTE, null );
		this.gl.texParameteri( this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE );
		this.gl.texParameteri( this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE );
		this.gl.texParameteri( this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST );
		this.gl.texParameteri( this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST );

		this.state.bindTexture( this.gl.TEXTURE_2D, this.occlusionTexture );
		this.gl.texImage2D( this.gl.TEXTURE_2D, 0, this.gl.RGBA, 16, 16, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, null );
		this.gl.texParameteri( this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE );
		this.gl.texParameteri( this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE );
		this.gl.texParameteri( this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST );
		this.gl.texParameteri( this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST );

		this.shader = {

			vertexShader: [

				'uniform lowp int renderType;',

				'uniform vec3 screenPosition;',
				'uniform vec2 scale;',
				'uniform float rotation;',

				'uniform sampler2D occlusionMap;',

				'attribute vec2 position;',
				'attribute vec2 uv;',

				'varying vec2 vUV;',
				'varying float vVisibility;',

				'void main() {',

				'	vUV = uv;',

				'	vec2 pos = position;',

				'	if ( renderType == 2 ) {',

				'		vec4 visibility = texture2D( occlusionMap, vec2( 0.1, 0.1 ) );',
				'		visibility += texture2D( occlusionMap, vec2( 0.5, 0.1 ) );',
				'		visibility += texture2D( occlusionMap, vec2( 0.9, 0.1 ) );',
				'		visibility += texture2D( occlusionMap, vec2( 0.9, 0.5 ) );',
				'		visibility += texture2D( occlusionMap, vec2( 0.9, 0.9 ) );',
				'		visibility += texture2D( occlusionMap, vec2( 0.5, 0.9 ) );',
				'		visibility += texture2D( occlusionMap, vec2( 0.1, 0.9 ) );',
				'		visibility += texture2D( occlusionMap, vec2( 0.1, 0.5 ) );',
				'		visibility += texture2D( occlusionMap, vec2( 0.5, 0.5 ) );',

				'		vVisibility =        visibility.r / 9.0;',
				'		vVisibility *= 1.0 - visibility.g / 9.0;',
				'		vVisibility *=       visibility.b / 9.0;',
				'		vVisibility *= 1.0 - visibility.a / 9.0;',

				'		pos.x = cos( rotation ) * position.x - sin( rotation ) * position.y;',
				'		pos.y = sin( rotation ) * position.x + cos( rotation ) * position.y;',

				'	}',

				'	gl_Position = vec4( ( pos * scale + screenPosition.xy ).xy, screenPosition.z, 1.0 );',

				'}'

			].join( '\n' ),

			fragmentShader: [

				'uniform lowp int renderType;',

				'uniform sampler2D map;',
				'uniform float opacity;',
				'uniform vec3 color;',

				'varying vec2 vUV;',
				'varying float vVisibility;',

				'void main() {',

				// pink square

				'	if ( renderType == 0 ) {',

				'		gl_FragColor = vec4( 1.0, 0.0, 1.0, 0.0 );',

				// restore

				'	} else if ( renderType == 1 ) {',

				'		gl_FragColor = texture2D( map, vUV );',

				// flare

				'	} else {',

				'		vec4 texture = texture2D( map, vUV );',
				'		texture.a *= opacity * vVisibility;',
				'		gl_FragColor = texture;',
				'		gl_FragColor.rgb *= color;',

				'	}',

				'}'

			].join( '\n' )

		};

		this.program = this.createProgram( this.shader );

		this.attributes = {
			vertex: this.gl.getAttribLocation( this.program, 'position' ),
			uv: this.gl.getAttribLocation( this.program, 'uv' )
		};

		this.uniforms = {
			renderType: this.gl.getUniformLocation( this.program, 'renderType' ),
			map: this.gl.getUniformLocation( this.program, 'map' ),
			occlusionMap: this.gl.getUniformLocation( this.program, 'occlusionMap' ),
			opacity: this.gl.getUniformLocation( this.program, 'opacity' ),
			color: this.gl.getUniformLocation( this.program, 'color' ),
			scale: this.gl.getUniformLocation( this.program, 'scale' ),
			rotation: this.gl.getUniformLocation( this.program, 'rotation' ),
			screenPosition: this.gl.getUniformLocation( this.program, 'screenPosition' )
		};
	}

	/*
	 * Render lens flares
	 * Method: renders 16x16 0xff00ff-colored points scattered over the light source area,
	 *         reads these back and calculates occlusion.
	 */
	render( flares, scene, camera, viewport )
	{
		if ( flares.length === 0 ) return;

		let tempPosition = new Vector3();

		let invAspect = viewport.w / viewport.z,
			halfViewportWidth = viewport.z * 0.5,
			halfViewportHeight = viewport.w * 0.5;

		let size = 16 / viewport.w,
			scale = new Vector2( size * invAspect, size );

		let screenPosition = new Vector3( 1, 1, 0 ),
			screenPositionPixels = new Vector2( 1, 1 );

		let validArea = new Box2();

		validArea.min.set( viewport.x, viewport.y );
		validArea.max.set( viewport.x + ( viewport.z - 16 ), viewport.y + ( viewport.w - 16 ) );

		if ( this.program === undefined )
			this.init();

		this.state.useProgram( this.program );
		this.state.initAttributes();
		this.state.enableAttribute( this.attributes.vertex );
		this.state.enableAttribute( this.attributes.uv );
		this.state.disableUnusedAttributes();

		// loop through all lens flares to update their occlusion and positions
		// setup gl and common used attribs/uniforms
		this.gl.uniform1i( this.uniforms.occlusionMap, 0 );
		this.gl.uniform1i( this.uniforms.map, 1 );

		this.gl.bindBuffer( this.gl.ARRAY_BUFFER, this.vertexBuffer );
		this.gl.vertexAttribPointer( this.attributes.vertex, 2, this.gl.FLOAT, false, 2 * 8, 0 );
		this.gl.vertexAttribPointer( this.attributes.uv, 2, this.gl.FLOAT, false, 2 * 8, 8 );

		this.gl.bindBuffer( this.gl.ELEMENT_ARRAY_BUFFER, this.elementBuffer );

		this.state.disable( this.gl.CULL_FACE );
		this.state.buffers.depth.setMask( false );

		for ( let i = 0, l = flares.length; i < l; i++ )
		{
			size = 16 / viewport.w;
			scale.set( size * invAspect, size );

			// calc object screen position
			let flare = flares[ i ];

			tempPosition.set( flare.matrixWorld.elements[ 12 ], flare.matrixWorld.elements[ 13 ], flare.matrixWorld.elements[ 14 ] );

			tempPosition.applyMatrix4( camera.matrixWorldInverse );
			tempPosition.applyMatrix4( camera.projectionMatrix );

			// setup arrays for gl programs
			screenPosition.copy( tempPosition );

			// horizontal and vertical coordinate of the lower left corner of the pixels to copy
			screenPositionPixels.x = viewport.x + ( screenPosition.x * halfViewportWidth ) + halfViewportWidth - 8;
			screenPositionPixels.y = viewport.y + ( screenPosition.y * halfViewportHeight ) + halfViewportHeight - 8;

			// screen cull
			if ( validArea.containsPoint( screenPositionPixels ) === true )
			{
				// save current RGB to temp texture
				this.state.activeTexture( this.gl.TEXTURE0 );
				this.state.bindTexture( this.gl.TEXTURE_2D, null );
				this.state.activeTexture( this.gl.TEXTURE1 );
				this.state.bindTexture( this.gl.TEXTURE_2D, this.tempTexture );
				this.gl.copyTexImage2D( this.gl.TEXTURE_2D, 0, this.gl.RGB, screenPositionPixels.x, screenPositionPixels.y, 16, 16, 0 );

				// render pink quad
				this.gl.uniform1i( this.uniforms.renderType, 0 );
				this.gl.uniform2f( this.uniforms.scale, scale.x, scale.y );
				this.gl.uniform3f( this.uniforms.screenPosition, screenPosition.x, screenPosition.y, screenPosition.z );

				this.state.disable( this.gl.BLEND );
				this.state.enable( this.gl.DEPTH_TEST );

				this.gl.drawElements( this.gl.TRIANGLES, 6, this.gl.UNSIGNED_SHORT, 0 );

				// copy result to occlusionMap
				this.state.activeTexture( this.gl.TEXTURE0 );
				this.state.bindTexture( this.gl.TEXTURE_2D, this.occlusionTexture );
				this.gl.copyTexImage2D( this.gl.TEXTURE_2D, 0, this.gl.RGBA, screenPositionPixels.x, screenPositionPixels.y, 16, 16, 0 );

				// restore graphics
				this.gl.uniform1i( this.uniforms.renderType, 1 );
				this.state.disable( this.gl.DEPTH_TEST );

				this.state.activeTexture( this.gl.TEXTURE1 );
				this.state.bindTexture( this.gl.TEXTURE_2D, this.tempTexture );
				this.gl.drawElements( this.gl.TRIANGLES, 6, this.gl.UNSIGNED_SHORT, 0 );

				// update object positions
				flare.positionScreen.copy( screenPosition );

				if ( flare.customUpdateCallback )
					flare.customUpdateCallback( flare );
				else
					flare.updateLensFlares();

				// render flares
				this.gl.uniform1i( this.uniforms.renderType, 2 );
				this.state.enable( this.gl.BLEND );

				for ( let j = 0, jl = flare.lensFlares.length; j < jl; j++ )
				{
					let sprite = flare.lensFlares[ j ];

					if ( sprite.opacity > 0.001 && sprite.scale > 0.001 )
					{
						screenPosition.x = sprite.x;
						screenPosition.y = sprite.y;
						screenPosition.z = sprite.z;

						size = sprite.size * sprite.scale / viewport.w;

						scale.x = size * invAspect;
						scale.y = size;

						this.gl.uniform3f( this.uniforms.screenPosition, screenPosition.x, screenPosition.y, screenPosition.z );
						this.gl.uniform2f( this.uniforms.scale, scale.x, scale.y );
						this.gl.uniform1f( this.uniforms.rotation, sprite.rotation );

						this.gl.uniform1f( this.uniforms.opacity, sprite.opacity );
						this.gl.uniform3f( this.uniforms.color, sprite.color.r, sprite.color.g, sprite.color.b );

						this.state.setBlending( sprite.blending, sprite.blendEquation, sprite.blendSrc, sprite.blendDst );

						this.textures.setTexture2D( sprite.texture, 1 );

						this.gl.drawElements( this.gl.TRIANGLES, 6, this.gl.UNSIGNED_SHORT, 0 );
					}
				}
			}
		}

		// restore gl
		this.state.enable( this.gl.CULL_FACE );
		this.state.enable( this.gl.DEPTH_TEST );
		this.state.buffers.depth.setMask( true );

		this.state.reset();
	}

	createProgram( shader )
	{
		let program = this.gl.createProgram();

		let fragmentShader = this.gl.createShader( this.gl.FRAGMENT_SHADER );
		let vertexShader = this.gl.createShader( this.gl.VERTEX_SHADER );

		let prefix = 'precision ' + this.capabilities.precision + ' float;\n';

		this.gl.shaderSource( fragmentShader, prefix + shader.fragmentShader );
		this.gl.shaderSource( vertexShader, prefix + shader.vertexShader );

		this.gl.compileShader( fragmentShader );
		this.gl.compileShader( vertexShader );

		this.gl.attachShader( program, fragmentShader );
		this.gl.attachShader( program, vertexShader );

		this.gl.linkProgram( program );

		return program;
	}

}


export { WebGLFlareRenderer };
