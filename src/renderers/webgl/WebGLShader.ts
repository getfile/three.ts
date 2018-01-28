/**
 * @author mrdoob / http://mrdoob.com/
 */

function addLineNumbers( string: string ): string
{
	var lines = string.split( '\n' );

	for ( var i = 0; i < lines.length; i++ )
		lines[ i ] = ( i + 1 ) + ': ' + lines[ i ];
	return lines.join( '\n' );
}

//create shader object(1, 2type(vertex of fragment), 3shaderCode)
function webGLShader( gl: WebGLRenderingContext, type: number, code: string )
{
	var shader: WebGLShader = gl.createShader( type );

	gl.shaderSource( shader, code );
	gl.compileShader( shader );

	if ( gl.getShaderParameter( shader, gl.COMPILE_STATUS ) === false )
		console.error( 'THREE.WebGLShader: Shader couldn\'t compile.' );

	if ( gl.getShaderInfoLog( shader ) !== '' )
		console.warn( 'THREE.WebGLShader: gl.getShaderInfoLog()', //
			( type === gl.VERTEX_SHADER ? 'vertex' : 'fragment' ), //
			gl.getShaderInfoLog( shader ), //
			addLineNumbers( code ) );

	// --enable-privileged-webgl-extension
	// console.log( type, gl.getExtension( 'WEBGL_debug_shaders' ).getTranslatedShaderSource( shader ) );
	return shader;
}

export { webGLShader };
