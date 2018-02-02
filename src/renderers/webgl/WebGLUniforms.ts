/**
 * @author tschw
 */

import { CubeTexture } from '../../textures/CubeTexture';
import { Texture } from '../../textures/Texture';
import { Vector4 } from '../../math/Vector4';
import { WebGLRenderer } from '../WebGLRenderer';

let emptyTexture = new Texture();
let emptyCubeTexture = new CubeTexture();


// --- Utilities ---

// Array Caches (provide typed arrays for temporary by size)
let arrayCacheF32 = [];
let arrayCacheI32 = [];

// Float32Array caches used for uploading Matrix uniforms
let mat4array = new Float32Array( 16 );
let mat3array = new Float32Array( 9 );

/** Flattening for arrays of vectors and matrices */
function flatten( array, nBlocks, blockSize )
{
    let firstElem = array[0];
    if ( firstElem <= 0 || firstElem > 0 ) return array;
    // unoptimized: ! isNaN( firstElem )
    // see http://jacksondunstan.com/articles/983
    let n = nBlocks * blockSize,
        r = arrayCacheF32[n];

    if ( r === undefined )
    {
        r = new Float32Array( n );
        arrayCacheF32[n] = r;
    }

    if ( nBlocks !== 0 )
    {
        firstElem.toArray( r, 0 );
        for ( let i = 1, offset = 0; i !== nBlocks; ++i )
        {
            offset += blockSize;
            array[i].toArray( r, offset );
        }
    }

    return r;
}

// Texture unit allocation
function allocTexUnits( renderer: WebGLRenderer, n )
{
    let r = arrayCacheI32[n];
    if ( r === undefined )
    {
        r = new Int32Array( n );
        arrayCacheI32[n] = r;
    }

    for ( let i = 0; i !== n; ++i )
        r[i] = renderer.allocTextureUnit();

    return r;
}

// set with Single scalar 
function setValue1f( gl: WebGLRenderingContext, v: number )
{
    gl.uniform1f( this.addr, v );
}

function setValue1i( gl: WebGLRenderingContext, v: number )
{
    gl.uniform1i( this.addr, v );
}

/** set with number[] | Vector2 | Vector3 */
function setValue2fv( gl: WebGLRenderingContext, v )
{
    if ( v.x === undefined )
        gl.uniform2fv( this.addr, v );
    else
        gl.uniform2f( this.addr, v.x, v.y );
}

/** set with number[] | Vector3 | Color */
function setValue3fv( gl: WebGLRenderingContext, v )
{
    if ( v.x !== undefined )
        gl.uniform3f( this.addr, v.x, v.y, v.z );
    else if ( v.r !== undefined )
        gl.uniform3f( this.addr, v.r, v.g, v.b );
    else
        gl.uniform3fv( this.addr, v );
}

/** set with number[] | Vector4 */
function setValue4fv( gl: WebGLRenderingContext, v: any )
{
    if ( v.x === undefined )
        gl.uniform4fv( this.addr, v );
    else
        gl.uniform4f( this.addr, v.x, v.y, v.z, v.w );
}

/** set matrix with Matrix3 | number[] */
function setValue2fm( gl: WebGLRenderingContext, v )
{
    gl.uniformMatrix2fv( this.addr, false, v.elements || v );
}

/** set matrix with Matrix3 | number[] */
function setValue3fm( gl: WebGLRenderingContext, v )
{
    if ( v.elements === undefined )
        gl.uniformMatrix3fv( this.addr, false, v );
    else
    {
        mat3array.set( v.elements );
        gl.uniformMatrix3fv( this.addr, false, mat3array );
    }
}

/** set matrix with Matrix4 | number[] */
function setValue4fm( gl: WebGLRenderingContext, v )
{
    if ( v.elements === undefined )
        gl.uniformMatrix4fv( this.addr, false, v );
    else
    {
        mat4array.set( v.elements );
        gl.uniformMatrix4fv( this.addr, false, mat4array );
    }
}

/** set Single texture (2D / Cube) */
function setValueT1( gl: WebGLRenderingContext, v, renderer )
{
    let unit = renderer.allocTextureUnit();
    gl.uniform1i( this.addr, unit );
    renderer.setTexture2D( v || emptyTexture, unit );
}

/** set cube texture */
function setValueT6( gl: WebGLRenderingContext, v, renderer )
{
    let unit = renderer.allocTextureUnit();
    gl.uniform1i( this.addr, unit );
    renderer.setTextureCube( v || emptyCubeTexture, unit );
}

function setValue2iv( gl: WebGLRenderingContext, v: number[] | Int32Array )
{
    gl.uniform2iv( this.addr, v );
}

function setValue3iv( gl: WebGLRenderingContext, v: number[] | Int32Array )
{
    gl.uniform3iv( this.addr, v );
}

function setValue4iv( gl: WebGLRenderingContext, v: number[] | Int32Array )
{
    gl.uniform4iv( this.addr, v );
}

// Helper to pick the right setter for the singular case
/**get set Function */
function getSingularSetter( type )
{
    switch ( type )
    {
        case 0x1406: return setValue1f; // FLOAT
        case 0x8b50: return setValue2fv; // _VEC2
        case 0x8b51: return setValue3fv; // _VEC3
        case 0x8b52: return setValue4fv; // _VEC4

        case 0x8b5a: return setValue2fm; // _MAT2
        case 0x8b5b: return setValue3fm; // _MAT3
        case 0x8b5c: return setValue4fm; // _MAT4

        case 0x8b5e: case 0x8d66: return setValueT1; // SAMPLER_2D, SAMPLER_EXTERNAL_OES
        case 0x8b60: return setValueT6; // SAMPLER_CUBE

        case 0x1404: case 0x8b56: return setValue1i; // INT, BOOL
        case 0x8b53: case 0x8b57: return setValue2iv; // _VEC2
        case 0x8b54: case 0x8b58: return setValue3iv; // _VEC3
        case 0x8b55: case 0x8b59: return setValue4iv; // _VEC4
    }
}

// Array of scalars
function setValue1fv( gl: WebGLRenderingContext, v )
{
    gl.uniform1fv( this.addr, v );
}

function setValue1iv( gl: WebGLRenderingContext, v )
{
    gl.uniform1iv( this.addr, v );
}

// Array of vectors (flat or from THREE classes)
function setValueV2a( gl: WebGLRenderingContext, v )
{
    gl.uniform2fv( this.addr, flatten( v, this.size, 2 ) );
}

function setValueV3a( gl: WebGLRenderingContext, v )
{
    gl.uniform3fv( this.addr, flatten( v, this.size, 3 ) );
}

function setValueV4a( gl: WebGLRenderingContext, v )
{
    gl.uniform4fv( this.addr, flatten( v, this.size, 4 ) );
}

// Array of matrices (flat or from THREE clases)
function setValueM2a( gl: WebGLRenderingContext, v )
{
    gl.uniformMatrix2fv( this.addr, false, flatten( v, this.size, 4 ) );
}

function setValueM3a( gl: WebGLRenderingContext, v )
{
    gl.uniformMatrix3fv( this.addr, false, flatten( v, this.size, 9 ) );
}

function setValueM4a( gl: WebGLRenderingContext, v )
{
    gl.uniformMatrix4fv( this.addr, false, flatten( v, this.size, 16 ) );
}

// Array of textures (2D / Cube)
function setValueT1a( gl: WebGLRenderingContext, v, renderer )
{
    let n = v.length,
        units = allocTexUnits( renderer, n );

    gl.uniform1iv( this.addr, units );
    for ( let i = 0; i !== n; ++i )
        renderer.setTexture2D( v[i] || emptyTexture, units[i] );
}

function setValueT6a( gl: WebGLRenderingContext, v, renderer )
{
    let n = v.length,
        units = allocTexUnits( renderer, n );

    gl.uniform1iv( this.addr, units );
    for ( let i = 0; i !== n; ++i )
        renderer.setTextureCube( v[i] || emptyCubeTexture, units[i] );
}

// Helper to pick the right setter for a pure (bottom-level) array
function getPureArraySetter( type )
{
    switch ( type )
    {
        case 0x1406: return setValue1fv; // FLOAT
        case 0x8b50: return setValueV2a; // _VEC2
        case 0x8b51: return setValueV3a; // _VEC3
        case 0x8b52: return setValueV4a; // _VEC4

        case 0x8b5a: return setValueM2a; // _MAT2
        case 0x8b5b: return setValueM3a; // _MAT3
        case 0x8b5c: return setValueM4a; // _MAT4

        case 0x8b5e: return setValueT1a; // SAMPLER_2D
        case 0x8b60: return setValueT6a; // SAMPLER_CUBE

        case 0x1404: case 0x8b56: return setValue1iv; // INT, BOOL
        case 0x8b53: case 0x8b57: return setValue2iv; // _VEC2
        case 0x8b54: case 0x8b58: return setValue3iv; // _VEC3
        case 0x8b55: case 0x8b59: return setValue4iv; // _VEC4
    }
}

/** 单一uniform对象 */
class SingleUniform
{
    id;
    addr;
    setValue;
    constructor( id: number, activeInfo: WebGLActiveInfo, addr: WebGLUniformLocation )
    {
        this.id = id;
        this.addr = addr;
        this.setValue = getSingularSetter( activeInfo.type );
        // this.path = activeInfo.name; // DEBUG
    }
}

/** 数组uniform对象 */
class PureArrayUniform
{
    id;
    addr;
    size;
    setValue;
    constructor( id: number, activeInfo: WebGLActiveInfo, addr: WebGLUniformLocation )
    {
        this.id = id;
        this.addr = addr;
        this.size = activeInfo.size;
        this.setValue = getPureArraySetter( activeInfo.type );
        // this.path = activeInfo.name; // DEBUG
    }
}

// --- Base for inner nodes (including the root) ---
/** 集合和映射表 */
class UniformContainer
{
    seq;
    map;
    constructor()
    {
        this.seq = [];
        this.map = {};
    }
}

/** 组合uniform对象 */
class StructuredUniform extends UniformContainer
{
    id;

    constructor( id )
    {
        super(); // mix-in
        this.id = id;
    }

    setValue( gl: WebGLRenderingContext, value )
    {
        let seq = this.seq;
        for ( let i = 0, n = seq.length; i !== n; ++i )
        {
            let u = seq[i];
            u.setValue( gl, value[u.id] );
        }
    }

}


// --- Top-level ---

// Parser - builds up the property tree from the path strings

// extracts
// 	- the identifier (member name or array index)
//  - followed by an optional right bracket (found when array index)
//  - followed by an optional left bracket or dot (type of subscript)
//
// Note: These portions can be read in a non-overlapping fashion and
// allow straightforward parsing of the hierarchy that WebGL encodes
// in the uniform names.

// Root Container

/**着色器参数集管理 */
class WebGLUniforms extends UniformContainer
{
    renderer: WebGLRenderer;

    constructor( gl: WebGLRenderingContext, program, renderer )
    {
        super();

        this.renderer = renderer;

        let n = gl.getProgramParameter( program, gl.ACTIVE_UNIFORMS );
        for ( let i = 0; i < n; ++i )
        {
            let info = gl.getActiveUniform( program, i ),
                path: string = info.name,
                addr: WebGLUniformLocation = gl.getUniformLocation( program, path );

            WebGLUniforms.parseUniform( info, addr, this );
        }
    }

    setValue( gl: WebGLRenderingContext, name, value )
    {
        let u = this.map[name];
        if ( u !== undefined ) u.setValue( gl, value, this.renderer );
    }

    setOptional( gl: WebGLRenderingContext, object, name )
    {
        let v = object[name];
        if ( v !== undefined ) this.setValue( gl, name, v );
    }

    static upload( gl: WebGLRenderingContext, seq, values, renderer )
    {
        for ( let i = 0, n = seq.length; i !== n; ++i )
        {
            let u = seq[i],
                v = values[u.id];

            if ( v.needsUpdate !== false )
            {
                // note: always updating when .needsUpdate is undefined
                u.setValue( gl, v.value, renderer );
            }
        }
    }

    static seqWithValue( seq, values )
    {
        let r = [];
        for ( let i = 0, n = seq.length; i !== n; ++i )
        {
            let u = seq[i];
            if ( u.id in values ) r.push( u );
        }
        return r;
    }

    static RePathPart = /([\w\d_]+)(\])?(\[|\.)?/g;

    static addUniform( container: UniformContainer, uniformObject: SingleUniform | PureArrayUniform | StructuredUniform )
    {
        container.seq.push( uniformObject );
        container.map[uniformObject.id] = uniformObject;
    }

    /** 解析activeInfo， 生成uniform对象集 */
    static parseUniform( activeInfo: WebGLActiveInfo, addr: WebGLUniformLocation, container: UniformContainer )
    {
        let path: string = activeInfo.name,
            pathLength = path.length;

        // reset RegExp object, because of the early exit of a previous run
        WebGLUniforms.RePathPart.lastIndex = 0;

        for ( ; ; )
        {
            let match = WebGLUniforms.RePathPart.exec( path ),
                matchEnd = WebGLUniforms.RePathPart.lastIndex,
                id: number,
                ids = match[1],
                idIsIndex = match[2] === ']',
                subscript = match[3];

            if ( idIsIndex ) id = Number.parseFloat( ids ); // convert to integer

            if ( subscript === undefined || subscript === '[' && matchEnd + 2 === pathLength )
            {
                // bare name or "pure" bottom-level array "[0]" suffix
                WebGLUniforms.addUniform( container, subscript === undefined ?
                    new SingleUniform( id, activeInfo, addr ) :
                    new PureArrayUniform( id, activeInfo, addr ) );
                break;
            } else
            {
                // step into inner node / create it in case it doesn't exist
                let map = container.map, next = map[id];
                if ( next === undefined )
                {
                    next = new StructuredUniform( id );
                    WebGLUniforms.addUniform( container, next );
                }
                container = next;
            }
        }
    }


}

export { SingleUniform, PureArrayUniform, UniformContainer, StructuredUniform, WebGLUniforms };
