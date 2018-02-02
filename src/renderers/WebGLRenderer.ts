import * as Constant from '../constants';
import { Frustum } from '../geom/Frustum';
import { Sphere } from "../geom/Sphere";
import { Vector4 } from '../math/Vector4';
import { Vector3 } from '../math/Vector3';
import { Color } from '../math/Color';
import { _Math } from '../math/Math';
import { Matrix4 } from '../math/Matrix4';
import { Camera } from "../cameras/Camera";
import { Scene } from "../scenes/Scene";
import { DataTexture } from '../textures/DataTexture';
import { UniformsLib } from './shaders/UniformsLib';
import { UniformsUtils } from './shaders/UniformsUtils';
import { ShaderLib } from './shaders/ShaderLib';
import { WebGLUniforms } from './webgl/WebGLUniforms';
import { WebGLFlareRenderer } from './webgl/WebGLFlareRenderer';
import { WebGLSpriteRenderer } from './webgl/WebGLSpriteRenderer';
import { WebGLShadowMap } from './webgl/WebGLShadowMap';
import { WebGLAttributes } from './webgl/WebGLAttributes';
import { WebGLBackground } from './webgl/WebGLBackground';
import { WebGLRenderLists, WebGLRenderList, RenderItem } from './webgl/WebGLRenderLists';
import { WebGLMorphtargets } from './webgl/WebGLMorphtargets';
import { WebGLIndexedBufferRenderer } from './webgl/WebGLIndexedBufferRenderer';
import { WebGLBufferRenderer } from './webgl/WebGLBufferRenderer';
import { WebGLGeometries } from './webgl/WebGLGeometries';
import { WebGLLights } from './webgl/WebGLLights';
import { WebGLObjects } from './webgl/WebGLObjects';
import { WebGLPrograms } from './webgl/WebGLPrograms';
import { WebGLTextures } from './webgl/WebGLTextures';
import { WebGLProperties } from './webgl/WebGLProperties';
import { WebGLState } from './webgl/WebGLState';
import { WebGLCapabilities } from './webgl/WebGLCapabilities';
import { WebVRManager } from './webvr/WebVRManager';
import { WebGLExtensions } from './webgl/WebGLExtensions';
import { WebGLClipping } from './webgl/WebGLClipping';
import { WebGLUtils } from './webgl/WebGLUtils';
import { WebGLRenderTarget } from './WebGLRenderTarget';
import { WebGLRenderTargetCube } from './WebGLRenderTargetCube';
import { ArrayCamera } from '../cameras/ArrayCamera';
import { PerspectiveCamera } from '../cameras/PerspectiveCamera';
import { Light } from '../lights/Light';
import { Sprite } from '../objects/Sprite';
import { Object3D } from '../core/Object3D';
import { TWebGLProgram } from './webgl/WebGLProgram';

/**
 * @author supereggbert / http://www.paulbrunt.co.uk/
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 * @author szimek / https://github.com/szimek/
 * @author tschw
 */

class WebGLRenderer
{
    domElement;
    autoClear; autoClearColor; autoClearDepth; autoClearStencil;
    sortObjects; clippingPlanes; localClippingEnabled;
    gammaFactor: number; gammaInput: boolean; gammaOutput: boolean;
    physicallyCorrectLights: boolean;
    toneMapping; toneMappingExposure; toneMappingWhitePoint;
    maxMorphTargets; maxMorphNormals;

    currentRenderList: WebGLRenderList;
    lightsArray: Light[];
    shadowsArray;
    spritesArray: Sprite[];
    flaresArray;

    _gl: WebGLRenderingContext;
    _sphere: Sphere;
    _isContextLost: boolean;

    _currentRenderTarget: WebGLRenderTarget;
    _currentFramebuffer: WebGLFramebuffer;
    _currentMaterialId: number;
    _currentGeometryProgram: string;
    _currentCamera: Camera;
    _currentArrayCamera: ArrayCamera;
    _currentViewport: Vector4;
    _currentScissor: Vector4;
    _currentScissorTest;
    _usedTextureUnits;

    _width: number;
    _height: number;
    _pixelRatio: number;

    _viewport: Vector4;
    _scissor: Vector4;
    _scissorTest: boolean;
    _frustum: Frustum;
    _clipping: WebGLClipping;
    _clippingEnabled: boolean;
    _localClippingEnabled: boolean;
    _projScreenMatrix: Matrix4;
    _vector3: Vector3;

    _infoMemory: any;
    _infoRender: any;
    info: any;
    _canvas: HTMLCanvasElement;

    shadowMap: WebGLShadowMap;
    vr: WebVRManager;
    capabilities: WebGLCapabilities;
    state: WebGLState;
    utils: WebGLUtils;

    properties: WebGLProperties;
    textures: WebGLTextures;
    attributes: WebGLAttributes;
    geometries: WebGLGeometries;

    objects: WebGLObjects;
    morphtargets: WebGLMorphtargets;
    programCache: WebGLPrograms;
    lights: WebGLLights;
    renderLists: WebGLRenderLists;
    background: WebGLBackground;

    bufferRenderer: WebGLBufferRenderer;
    indexedBufferRenderer: WebGLIndexedBufferRenderer;

    flareRenderer: WebGLFlareRenderer;
    spriteRenderer: WebGLSpriteRenderer;

    parameters;
    onAnimationFrame;
    isAnimating;

    extensions: WebGLExtensions;
    _premultipliedAlpha;


    constructor( parameters )
    {
        console.log( 'THREE.WebGLRenderer', Constant.REVISION );

        this.parameters = parameters || {};

        this._canvas = parameters.canvas !== undefined ? parameters.canvas : document.createElementNS( 'http://www.w3.org/1999/xhtml', 'canvas' );
        this._premultipliedAlpha = parameters.premultipliedAlpha !== undefined ? parameters.premultipliedAlpha : true;

        let _context = parameters.context !== undefined ? parameters.context : null,
            _alpha = parameters.alpha !== undefined ? parameters.alpha : false,
            _depth = parameters.depth !== undefined ? parameters.depth : true,
            _stencil = parameters.stencil !== undefined ? parameters.stencil : true,
            _antialias = parameters.antialias !== undefined ? parameters.antialias : false,
            _preserveDrawingBuffer = parameters.preserveDrawingBuffer !== undefined ? parameters.preserveDrawingBuffer : false,
            _powerPreference = parameters.powerPreference !== undefined ? parameters.powerPreference : 'default';

        this.lightsArray = [];
        this.shadowsArray = [];

        this.currentRenderList = null;

        this.spritesArray = [];
        this.flaresArray = [];

        // public properties
        this.domElement = this._canvas;

        // clearing
        this.autoClear = true;
        this.autoClearColor = true;
        this.autoClearDepth = true;
        this.autoClearStencil = true;

        // scene graph
        this.sortObjects = true;

        // user-defined clipping
        this.clippingPlanes = [];
        this.localClippingEnabled = false;

        // physically based shading
        this.gammaFactor = 2.0;	// for backwards compatibility
        this.gammaInput = false;
        this.gammaOutput = false;

        // physical lights
        this.physicallyCorrectLights = false;

        // tone mapping
        this.toneMapping = Constant.LinearToneMapping;
        this.toneMappingExposure = 1.0;
        this.toneMappingWhitePoint = 1.0;

        // morphs
        this.maxMorphTargets = 8;
        this.maxMorphNormals = 4;

        // internal properties
        this._isContextLost = false;

        // internal state cache
        this._currentRenderTarget = null;
        this._currentFramebuffer = null;
        this._currentMaterialId = - 1;
        this._currentGeometryProgram = '';
        this._currentCamera = null;
        this._currentArrayCamera = null;
        this._currentViewport = new Vector4();
        this._currentScissor = new Vector4();
        this._currentScissorTest = null;

        //
        this._usedTextureUnits = 0;

        //
        this._width = this._canvas.width;
        this._height = this._canvas.height;

        this._pixelRatio = 1;

        this._viewport = new Vector4( 0, 0, this._width, this._height );
        this._scissor = new Vector4( 0, 0, this._width, this._height );
        this._scissorTest = false;

        // frustum
        this._frustum = new Frustum();

        // clipping
        this._clipping = new WebGLClipping();
        this._clippingEnabled = false;
        this._localClippingEnabled = false;

        // camera matrices cache
        this._projScreenMatrix = new Matrix4();

        this._vector3 = new Vector3();

        // info
        this._infoMemory = {
            geometries: 0,
            textures: 0
        };

        this._infoRender = {
            frame: 0,
            calls: 0,
            vertices: 0,
            faces: 0,
            points: 0
        };

        this.info = {
            render: this._infoRender,
            memory: this._infoMemory,
            programs: null
        };


        // initialize
        try
        {
            let contextAttributes = {
                alpha: _alpha,
                depth: _depth,
                stencil: _stencil,
                antialias: _antialias,
                premultipliedAlpha: this._premultipliedAlpha,
                preserveDrawingBuffer: _preserveDrawingBuffer,
                powerPreference: _powerPreference
            };

            // event listeners must be registered before WebGL context is created, see #12753

            this._canvas.addEventListener( 'webglcontextlost', this.onContextLost, false );
            this._canvas.addEventListener( 'webglcontextrestored', this.onContextRestore, false );

            this._gl = _context || this._canvas.getContext( 'webgl', contextAttributes ) || this._canvas.getContext( 'experimental-webgl', contextAttributes );
            if ( this._gl === null )
            {
                if ( this._canvas.getContext( 'webgl' ) !== null )
                    throw new Error( 'Error creating WebGL context with your selected this.attributes.' );
                else
                    throw new Error( 'Error creating WebGL context.' );
            }

            // Some experimental-webgl implementations do not have getShaderPrecisionFormat

            if ( this._gl.getShaderPrecisionFormat === undefined )
            {
                this._gl.getShaderPrecisionFormat = function ()
                {
                    return { 'rangeMin': 1, 'rangeMax': 1, 'precision': 1 };
                };
            }
        } catch ( error )
        {
            console.error( 'THREE.WebGLRenderer: ' + error.message );
        }

        this.initGLContext();

        //vr
        this.vr = new WebVRManager( this );

        //shadow map
        this.shadowMap = new WebGLShadowMap( this, this.objects, this.capabilities.maxTextureSize );
        this.isAnimating = false;
        this.onAnimationFrame = null;
        this._sphere = new Sphere();
    }

    getTargetPixelRatio()
    {
        return this._currentRenderTarget === null ? this._pixelRatio : 1;
    }

    initGLContext()
    {
        this.extensions = new WebGLExtensions( this._gl );
        this.extensions.get( 'WEBGL_depth_texture' );
        this.extensions.get( 'OES_texture_float' );
        this.extensions.get( 'OES_texture_float_linear' );
        this.extensions.get( 'OES_texture_half_float' );
        this.extensions.get( 'OES_texture_half_float_linear' );
        this.extensions.get( 'OES_standard_derivatives' );
        this.extensions.get( 'OES_element_index_uint' );
        this.extensions.get( 'ANGLE_instanced_arrays' );

        this.utils = new WebGLUtils( this._gl, this.extensions );

        this.capabilities = new WebGLCapabilities( this._gl, this.extensions, this.parameters );

        this.state = new WebGLState( this._gl, this.extensions, this.utils );
        this.state.scissor( this._currentScissor.copy( this._scissor ).multiplyScalar( this._pixelRatio ) );
        this.state.viewport( this._currentViewport.copy( this._viewport ).multiplyScalar( this._pixelRatio ) );

        this.properties = new WebGLProperties();
        this.textures = new WebGLTextures( this._gl, this.extensions, this.state, this.properties, this.capabilities, this.utils, this._infoMemory );
        this.attributes = new WebGLAttributes( this._gl );
        this.geometries = new WebGLGeometries( this._gl, this.attributes, this._infoMemory );
        this.objects = new WebGLObjects( this.geometries, this._infoRender );
        this.morphtargets = new WebGLMorphtargets( this._gl );
        this.programCache = new WebGLPrograms( this, this.extensions, this.capabilities );
        this.lights = new WebGLLights();
        this.renderLists = new WebGLRenderLists();

        this.background = new WebGLBackground( this, this.state, this.geometries, this._premultipliedAlpha );

        this.bufferRenderer = new WebGLBufferRenderer( this._gl, this.extensions, this._infoRender );
        this.indexedBufferRenderer = new WebGLIndexedBufferRenderer( this._gl, this.extensions, this._infoRender );

        this.flareRenderer = new WebGLFlareRenderer( this, this._gl, this.state, this.textures, this.capabilities );
        this.spriteRenderer = new WebGLSpriteRenderer( this, this._gl, this.state, this.textures, this.capabilities );

        this.info.programs = this.programCache.programs;
    }


    getContext()
    {
        return this._gl;
    }

    getContextAttributes()
    {
        return this._gl.getContextAttributes();
    }

    forceContextLoss()
    {
        let extension = this.extensions.get( 'WEBGL_lose_context' );
        if ( extension ) extension.loseContext();
    }

    forceContextRestore()
    {
        let extension = this.extensions.get( 'WEBGL_lose_context' );
        if ( extension ) extension.restoreContext();
    }

    getPixelRatio()
    {
        return this._pixelRatio;
    }

    setPixelRatio( value: number )
    {
        if ( value === undefined ) return;
        this._pixelRatio = value;
        this.setSize( this._width, this._height, false );
    }

    getSize(): { width: number, height: number }
    {
        return {
            width: this._width,
            height: this._height
        };
    }

    setSize( width: number, height: number, updateStyle: boolean = false )
    {
        let device = this.vr.getDevice();
        if ( device && device.isPresenting )
        {
            console.warn( 'THREE.WebGLRenderer: Can\'t change size while VR device is presenting.' );
            return;
        }

        this._width = width;
        this._height = height;

        this._canvas.width = width * this._pixelRatio;
        this._canvas.height = height * this._pixelRatio;

        if ( updateStyle !== false )
        {
            this._canvas.style.width = width + 'px';
            this._canvas.style.height = height + 'px';
        }

        this.setViewport( 0, 0, width, height );
    }

    getDrawingBufferSize()
    {
        return {
            width: this._width * this._pixelRatio,
            height: this._height * this._pixelRatio
        };
    }

    setDrawingBufferSize( width, height, pixelRatio )
    {
        this._width = width;
        this._height = height;

        this._pixelRatio = pixelRatio;

        this._canvas.width = width * pixelRatio;
        this._canvas.height = height * pixelRatio;

        this.setViewport( 0, 0, width, height );
    }

    setViewport( x, y, width, height )
    {
        this._viewport.set( x, this._height - y - height, width, height );
        this.state.viewport( this._currentViewport.copy( this._viewport ).multiplyScalar( this._pixelRatio ) );
    }

    setScissor( x, y, width, height )
    {
        this._scissor.set( x, this._height - y - height, width, height );
        this.state.scissor( this._currentScissor.copy( this._scissor ).multiplyScalar( this._pixelRatio ) );
    }

    setScissorTest( boolean )
    {
        this.state.setScissorTest( this._scissorTest = boolean );
    }

    // Clearing

    getClearColor(): Color
    {
        return this.background.getClearColor();
    }

    setClearColor()
    {
        this.background.setClearColor( arguments );
    }

    getClearAlpha()
    {
        return this.background.getClearAlpha();
    }

    setClearAlpha()
    {
        this.background.setClearAlpha( arguments );
    }

    clear( color: boolean = true, depth: boolean = true, stencil: boolean = true )
    {
        let bits: GLbitfield = 0;

        if ( color ) bits |= this._gl.COLOR_BUFFER_BIT;
        if ( depth ) bits |= this._gl.DEPTH_BUFFER_BIT;
        if ( stencil ) bits |= this._gl.STENCIL_BUFFER_BIT;

        this._gl.clear( bits );
    }

    clearColor()
    {
        this.clear( true, false, false );
    }

    clearDepth()
    {
        this.clear( false, true, false );
    }

    clearStencil()
    {
        this.clear( false, false, true );
    }

    clearTarget( renderTarget, color, depth, stencil )
    {
        this.setRenderTarget( renderTarget );
        this.clear( color, depth, stencil );
    }

    dispose()
    {
        this._canvas.removeEventListener( 'webglcontextlost', this.onContextLost, false );
        this._canvas.removeEventListener( 'webglcontextrestored', this.onContextRestore, false );

        this.renderLists.dispose();
        this.vr.dispose();
    }

    // Events

    onContextLost( event )
    {
        event.preventDefault();
        console.log( 'THREE.WebGLRenderer: Context Lost.' );
        this._isContextLost = true;
    }

    onContextRestore( /* event */ )
    {
        console.log( 'THREE.WebGLRenderer: Context Restored.' );
        this._isContextLost = false;
        this.initGLContext();
    }

    onMaterialDispose( event )
    {
        let material = event.target;
        material.removeEventListener( 'dispose', this.onMaterialDispose );
        this.deallocateMaterial( material );
    }

    // Buffer deallocation
    deallocateMaterial( material )
    {
        this.releaseMaterialProgramReference( material );
        this.properties.remove( material );
    }

    releaseMaterialProgramReference( material )
    {
        let programInfo = this.properties.get( material ).program;
        material.program = undefined;
        if ( programInfo !== undefined )
            this.programCache.releaseProgram( programInfo );
    }

    // Buffer rendering
    renderObjectImmediate( object, program, material )
    {
        object.render( function ( object )
        {
            this.renderBufferImmediate( object, program, material );
        } );
    }

    renderBufferImmediate( object, program: TWebGLProgram, material )
    {
        this.state.initAttributes();

        let buffers = this.properties.get( object );

        if ( object.hasPositions && !buffers.position ) buffers.position = this._gl.createBuffer();
        if ( object.hasNormals && !buffers.normal ) buffers.normal = this._gl.createBuffer();
        if ( object.hasUvs && !buffers.uv ) buffers.uv = this._gl.createBuffer();
        if ( object.hasColors && !buffers.color ) buffers.color = this._gl.createBuffer();

        let programAttributes = program.getAttributes();

        if ( object.hasPositions )
        {
            this._gl.bindBuffer( this._gl.ARRAY_BUFFER, buffers.position );
            this._gl.bufferData( this._gl.ARRAY_BUFFER, object.positionArray, this._gl.DYNAMIC_DRAW );

            this.state.enableAttribute( programAttributes.position );
            this._gl.vertexAttribPointer( programAttributes.position, 3, this._gl.FLOAT, false, 0, 0 );
        }

        if ( object.hasNormals )
        {
            this._gl.bindBuffer( this._gl.ARRAY_BUFFER, buffers.normal );

            if ( !material.isMeshPhongMaterial &&
                !material.isMeshStandardMaterial &&
                !material.isMeshNormalMaterial &&
                material.flatShading === true )
            {
                for ( let i = 0, l = object.count * 3; i < l; i += 9 )
                {
                    let array = object.normalArray;

                    let nx = ( array[i + 0] + array[i + 3] + array[i + 6] ) / 3;
                    let ny = ( array[i + 1] + array[i + 4] + array[i + 7] ) / 3;
                    let nz = ( array[i + 2] + array[i + 5] + array[i + 8] ) / 3;

                    array[i + 0] = nx;
                    array[i + 1] = ny;
                    array[i + 2] = nz;

                    array[i + 3] = nx;
                    array[i + 4] = ny;
                    array[i + 5] = nz;

                    array[i + 6] = nx;
                    array[i + 7] = ny;
                    array[i + 8] = nz;
                }
            }

            this._gl.bufferData( this._gl.ARRAY_BUFFER, object.normalArray, this._gl.DYNAMIC_DRAW );
            this.state.enableAttribute( programAttributes.normal );
            this._gl.vertexAttribPointer( programAttributes.normal, 3, this._gl.FLOAT, false, 0, 0 );
        }

        if ( object.hasUvs && material.map )
        {
            this._gl.bindBuffer( this._gl.ARRAY_BUFFER, buffers.uv );
            this._gl.bufferData( this._gl.ARRAY_BUFFER, object.uvArray, this._gl.DYNAMIC_DRAW );
            this.state.enableAttribute( programAttributes.uv );
            this._gl.vertexAttribPointer( programAttributes.uv, 2, this._gl.FLOAT, false, 0, 0 );
        }

        if ( object.hasColors && material.vertexColors !== Constant.NoColors )
        {
            this._gl.bindBuffer( this._gl.ARRAY_BUFFER, buffers.color );
            this._gl.bufferData( this._gl.ARRAY_BUFFER, object.colorArray, this._gl.DYNAMIC_DRAW );
            this.state.enableAttribute( programAttributes.color );
            this._gl.vertexAttribPointer( programAttributes.color, 3, this._gl.FLOAT, false, 0, 0 );
        }

        this.state.disableUnusedAttributes();
        this._gl.drawArrays( this._gl.TRIANGLES, 0, object.count );
        object.count = 0;
    }

    renderBufferDirect( camera, fog, geometry, material, object, group )
    {
        let frontFaceCW = ( object.isMesh && object.matrixWorld.determinant() < 0 );

        this.state.setMaterial( material, frontFaceCW );

        let program = this.setProgram( camera, fog, material, object );
        let geometryProgram = geometry.id + '_' + program.id + '_' + ( material.wireframe === true );

        let updateBuffers = false;

        if ( geometryProgram !== this._currentGeometryProgram )
        {
            this._currentGeometryProgram = geometryProgram;
            updateBuffers = true;
        }

        if ( object.morphTargetInfluences )
        {
            this.morphtargets.update( object, geometry, material, program );
            updateBuffers = true;
        }

        let index = geometry.index;
        let position = geometry.this.attributes.position;
        let rangeFactor = 1;

        if ( material.wireframe === true )
        {
            index = this.geometries.getWireframeAttribute( geometry );
            rangeFactor = 2;
        }

        let attribute;
        let renderer = this.bufferRenderer;

        if ( index !== null )
        {
            attribute = this.attributes.get( index );
            renderer = this.indexedBufferRenderer;
            ( renderer as WebGLIndexedBufferRenderer ).setIndex( attribute );
        }

        if ( updateBuffers )
        {
            this.setupVertexAttributes( material, program, geometry );
            if ( index !== null )
                this._gl.bindBuffer( this._gl.ELEMENT_ARRAY_BUFFER, attribute.buffer );
        }

        let dataCount = 0;

        if ( index !== null )
            dataCount = index.count;
        else if ( position !== undefined )
            dataCount = position.count;

        let rangeStart = geometry.drawRange.start * rangeFactor;
        let rangeCount = geometry.drawRange.count * rangeFactor;
        let groupStart = group !== null ? group.start * rangeFactor : 0;
        let groupCount = group !== null ? group.count * rangeFactor : Infinity;
        let drawStart = Math.max( rangeStart, groupStart );
        let drawEnd = Math.min( dataCount, rangeStart + rangeCount, groupStart + groupCount ) - 1;
        let drawCount = Math.max( 0, drawEnd - drawStart + 1 );

        if ( drawCount === 0 ) return;

        if ( object.isMesh )
        {
            if ( material.wireframe === true )
            {
                this.state.setLineWidth( material.wireframeLinewidth * this.getTargetPixelRatio() );
                renderer.setMode( this._gl.LINES );
            } else
            {
                switch ( object.drawMode )
                {
                    case Constant.TrianglesDrawMode:
                        renderer.setMode( this._gl.TRIANGLES );
                        break;

                    case Constant.TriangleStripDrawMode:
                        renderer.setMode( this._gl.TRIANGLE_STRIP );
                        break;

                    case Constant.TriangleFanDrawMode:
                        renderer.setMode( this._gl.TRIANGLE_FAN );
                        break;
                }
            }
        } else if ( object.isLine )
        {
            let lineWidth = material.linewidth;

            if ( lineWidth === undefined ) lineWidth = 1; // Not using Line*Material

            this.state.setLineWidth( lineWidth * this.getTargetPixelRatio() );

            if ( object.isLineSegments )
                renderer.setMode( this._gl.LINES );
            else if ( object.isLineLoop )
                renderer.setMode( this._gl.LINE_LOOP );
            else
                renderer.setMode( this._gl.LINE_STRIP );
        } else if ( object.isPoints )
        {
            renderer.setMode( this._gl.POINTS );
        }

        if ( geometry && geometry.isInstancedBufferGeometry )
        {
            if ( geometry.maxInstancedCount > 0 )
                renderer.renderInstances( geometry, drawStart, drawCount );
        } else
            renderer.render( drawStart, drawCount );
    }

    setupVertexAttributes( material, program, geometry, startIndex?)
    {
        if ( geometry && geometry.isInstancedBufferGeometry )
        {
            if ( this.extensions.get( 'ANGLE_instanced_arrays' ) === null )
            {
                console.error( 'THREE.WebGLRenderer.setupVertexAttributes: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.' );
                return;
            }
        }

        if ( startIndex === undefined ) startIndex = 0;

        this.state.initAttributes();

        let geometryAttributes = geometry.this.attributes;
        let programAttributes = program.getAttributes();
        let materialDefaultAttributeValues = material.defaultAttributeValues;

        for ( let name in programAttributes )
        {
            let programAttribute = programAttributes[name];

            if ( programAttribute >= 0 )
            {
                let geometryAttribute = geometryAttributes[name];

                if ( geometryAttribute !== undefined )
                {
                    let normalized = geometryAttribute.normalized;
                    let size = geometryAttribute.itemSize;

                    let attribute = this.attributes.get( geometryAttribute );

                    // TODO Attribute may not be available on context restore

                    if ( attribute === undefined ) continue;

                    let buffer = attribute.buffer;
                    let type = attribute.type;
                    let bytesPerElement = attribute.bytesPerElement;

                    if ( geometryAttribute.isInterleavedBufferAttribute )
                    {
                        let data = geometryAttribute.data;
                        let stride = data.stride;
                        let offset = geometryAttribute.offset;

                        if ( data && data.isInstancedInterleavedBuffer )
                        {
                            this.state.enableAttributeAndDivisor( programAttribute, data.meshPerAttribute );
                            if ( geometry.maxInstancedCount === undefined )
                                geometry.maxInstancedCount = data.meshPerAttribute * data.count;
                        } else
                        {
                            this.state.enableAttribute( programAttribute );
                        }

                        this._gl.bindBuffer( this._gl.ARRAY_BUFFER, buffer );
                        this._gl.vertexAttribPointer( programAttribute, size, type, normalized, stride * bytesPerElement, ( startIndex * stride + offset ) * bytesPerElement );
                    } else
                    {
                        if ( geometryAttribute.isInstancedBufferAttribute )
                        {
                            this.state.enableAttributeAndDivisor( programAttribute, geometryAttribute.meshPerAttribute );
                            if ( geometry.maxInstancedCount === undefined )
                                geometry.maxInstancedCount = geometryAttribute.meshPerAttribute * geometryAttribute.count;
                        } else
                        {
                            this.state.enableAttribute( programAttribute );
                        }

                        this._gl.bindBuffer( this._gl.ARRAY_BUFFER, buffer );
                        this._gl.vertexAttribPointer( programAttribute, size, type, normalized, 0, startIndex * size * bytesPerElement );
                    }

                } else if ( materialDefaultAttributeValues !== undefined )
                {
                    let value = materialDefaultAttributeValues[name];

                    if ( value !== undefined )
                    {
                        switch ( value.length )
                        {
                            case 2:
                                this._gl.vertexAttrib2fv( programAttribute, value );
                                break;

                            case 3:
                                this._gl.vertexAttrib3fv( programAttribute, value );
                                break;

                            case 4:
                                this._gl.vertexAttrib4fv( programAttribute, value );
                                break;

                            default:
                                this._gl.vertexAttrib1fv( programAttribute, value );
                        }
                    }
                }
            }
        }

        this.state.disableUnusedAttributes();
    }

    // Compile
    compile( scene: Scene, camera )
    {
        this.lightsArray.length = 0;
        this.shadowsArray.length = 0;

        scene.traverse( ( object: Object3D ) =>
        {
            if ( object instanceof Light )
            {
                this.lightsArray.push( object );
                if ( object.castShadow )
                    this.shadowsArray.push( object );
            }
        } );

        this.lights.setup( this.lightsArray, this.shadowsArray, camera );

        scene.traverse( ( object: Object3D ) =>
        {
            if ( object.material )
            {
                if ( Array.isArray( object.material ) )
                {
                    for ( let i = 0; i < object.material.length; i++ )
                        this.initMaterial( object.material[i], scene.fog, object );
                } else
                    this.initMaterial( object.material, scene.fog, object );
            }
        } );
    }

    // Animation Loop

    start()
    {
        if ( this.isAnimating ) return;
        let device = this.vr.getDevice();
        if ( device && device.isPresenting )
            device.requestAnimationFrame( this.loop );
        else
            window.requestAnimationFrame( this.loop );

        this.isAnimating = true;
    }

    loop( time )
    {
        if ( this.onAnimationFrame !== null ) this.onAnimationFrame( time );
        let device = this.vr.getDevice();
        if ( device && device.isPresenting )
            device.requestAnimationFrame( this.loop );
        else
            window.requestAnimationFrame( this.loop );
    }

    animate( callback )
    {
        this.onAnimationFrame = callback;
        this.start();
    }

    // Rendering
    render( scene: Scene, camera: Camera, renderTarget?, forceClear?)
    {
        if ( !( camera && camera instanceof Camera ) )
        {
            console.error( 'THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.' );
            return;
        }

        if ( this._isContextLost ) return;

        // reset caching for this frame

        this._currentGeometryProgram = '';
        this._currentMaterialId = - 1;
        this._currentCamera = null;

        // update scene graph
        if ( scene.autoUpdate === true ) scene.updateMatrixWorld();

        // update camera matrices and frustum
        if ( camera.parent === null ) camera.updateMatrixWorld();

        if ( this.vr.enabled )
            camera = this.vr.getCamera( camera as PerspectiveCamera );

        this._projScreenMatrix.multiplyMatrices( camera.projectionMatrix, camera.matrixWorldInverse );
        this._frustum.setFromMatrix( this._projScreenMatrix );

        this.lightsArray.length = 0;
        this.shadowsArray.length = 0;

        this.spritesArray.length = 0;
        this.flaresArray.length = 0;

        this._localClippingEnabled = this.localClippingEnabled;
        this._clippingEnabled = this._clipping.init( this.clippingPlanes, this._localClippingEnabled, camera );

        this.currentRenderList = this.renderLists.get( scene, camera );
        this.currentRenderList.init();

        this.projectObject( scene, camera, this.sortObjects );

        if ( this.sortObjects === true )
            this.currentRenderList.sort();

        this.textures.updateVideoTextures();

        if ( this._clippingEnabled ) this._clipping.beginShadows();

        this.shadowMap.render( this.shadowsArray, scene, camera );
        this.lights.setup( this.lightsArray, this.shadowsArray, camera );

        if ( this._clippingEnabled ) this._clipping.endShadows();

        this._infoRender.frame++;
        this._infoRender.calls = 0;
        this._infoRender.vertices = 0;
        this._infoRender.faces = 0;
        this._infoRender.points = 0;

        if ( renderTarget === undefined )
            renderTarget = null;

        this.setRenderTarget( renderTarget );
        this.background.render( this.currentRenderList, scene, camera, forceClear );

        // render scene
        let opaqueObjects = this.currentRenderList.opaque;
        let transparentObjects = this.currentRenderList.transparent;

        if ( scene.overrideMaterial )
        {
            let overrideMaterial = scene.overrideMaterial;
            if ( opaqueObjects.length ) this.renderObjects( opaqueObjects, scene, camera, overrideMaterial );
            if ( transparentObjects.length ) this.renderObjects( transparentObjects, scene, camera, overrideMaterial );
        } else
        {
            // opaque pass (front-to-back order)
            if ( opaqueObjects.length ) this.renderObjects( opaqueObjects, scene, camera );
            // transparent pass (back-to-front order)
            if ( transparentObjects.length ) this.renderObjects( transparentObjects, scene, camera );
        }

        // custom renderers
        this.spriteRenderer.render( this.spritesArray, scene, camera );
        this.flareRenderer.render( this.flaresArray, scene, camera, this._currentViewport );

        // Generate mipmap if we're using any kind of mipmap filtering
        if ( renderTarget )
            this.textures.updateRenderTargetMipmap( renderTarget );

        // Ensure depth buffer writing is enabled so it can be cleared on next render
        this.state.buffers.depth.setTest( true );
        this.state.buffers.depth.setMask( true );
        this.state.buffers.color.setMask( true );

        this.state.setPolygonOffset( false );

        if ( this.vr.enabled )
            this.vr.submitFrame();

        // this._gl.finish();
    }

	/*
	// TODO Duplicated code (Frustum)
	
	isObjectViewable( object ) 
	{
		let geometry = object.geometry;
	
		if ( geometry.boundingSphere === null )
			geometry.computeBoundingSphere();
	
		this._sphere.copy( geometry.boundingSphere ).
		applyMatrix4( object.matrixWorld );
	
		return isSphereViewable( this._sphere );
	}
	
	isSpriteViewable( sprite ) 
	{
		this._sphere.center.set( 0, 0, 0 );
		this._sphere.radius = 0.7071067811865476;
		this._sphere.applyMatrix4( sprite.matrixWorld );
	
		return isSphereViewable( this._sphere );
	}
	
	isSphereViewable( sphere ) 
	{
		if ( ! this._frustum.intersectsSphere( sphere ) ) return false;
	
		let numPlanes = this._clipping.numPlanes;
	
		if ( numPlanes === 0 ) return true;
	
		let planes = this.clippingPlanes,
			center = sphere.center,
			negRad = - sphere.radius,
			i = 0;
	
		do {
			// out when deeper than radius in the negative halfspace
			if ( planes[ i ].distanceToPoint( center ) < negRad ) return false;
		} while ( ++ i !== numPlanes );
	
		return true;
	}
	*/

    projectObject( object, camera, sortObjects )
    {
        if ( object.visible === false ) return;

        let visible = object.layers.test( camera.layers );

        if ( visible )
        {
            if ( object instanceof Light )
            {
                this.lightsArray.push( object );
                if ( object.castShadow )
                    this.shadowsArray.push( object );
            } else if ( object.isSprite )
            {
                if ( !object.frustumCulled || this._frustum.intersectsSprite( object ) )
                    this.spritesArray.push( object );

            } else if ( object.isLensFlare )
            {
                this.flaresArray.push( object );

            } else if ( object.isImmediateRenderObject )
            {
                if ( sortObjects )
                    this._vector3.setFromMatrixPosition( object.matrixWorld )
                        .applyMatrix4( this._projScreenMatrix );
                this.currentRenderList.push( object, null, object.material, this._vector3.z, null );

            } else if ( object.isMesh || object.isLine || object.isPoints )
            {
                if ( object.isSkinnedMesh )
                    object.skeleton.update();

                if ( !object.frustumCulled || this._frustum.intersectsObject( object ) )
                {
                    if ( sortObjects )
                        this._vector3.setFromMatrixPosition( object.matrixWorld )
                            .applyMatrix4( this._projScreenMatrix );

                    let geometry = this.objects.update( object );
                    let material = object.material;

                    if ( Array.isArray( material ) )
                    {
                        let groups = geometry.groups;

                        for ( let i = 0, l = groups.length; i < l; i++ )
                        {
                            let group = groups[i];
                            let groupMaterial = material[group.materialIndex];

                            if ( groupMaterial && groupMaterial.visible )
                                this.currentRenderList.push( object, geometry, groupMaterial, this._vector3.z, group );
                        }

                    } else if ( material.visible )
                        this.currentRenderList.push( object, geometry, material, this._vector3.z, null );
                }
            }
        }

        let children = object.children;

        for ( let i = 0, l = children.length; i < l; i++ )
            this.projectObject( children[i], camera, sortObjects );
    }

    renderObjects( renderList: RenderItem[], scene, camera, overrideMaterial?)
    {
        for ( let i = 0, l = renderList.length; i < l; i++ )
        {
            let renderItem = renderList[i];
            let object = renderItem.object;
            let geometry = renderItem.geometry;
            let material = overrideMaterial === undefined ? renderItem.material : overrideMaterial;
            let group = renderItem.group;

            if ( camera.isArrayCamera )
            {
                this._currentArrayCamera = camera;

                let cameras = camera.cameras;
                for ( let j = 0, jl = cameras.length; j < jl; j++ )
                {
                    let camera2: Camera = cameras[j];
                    if ( object.layers.test( camera2.layers ) )
                    {
                        let bounds = camera2.bounds;
                        let x = bounds.x * this._width;
                        let y = bounds.y * this._height;
                        let width = bounds.z * this._width;
                        let height = bounds.w * this._height;

                        this.state.viewport( this._currentViewport.set( x, y, width, height ).multiplyScalar( this._pixelRatio ) );
                        this.renderObject( object, scene, camera2, geometry, material, group );
                    }
                }
            } else
            {
                this._currentArrayCamera = null;
                this.renderObject( object, scene, camera, geometry, material, group );
            }
        }
    }

    renderObject( object, scene, camera, geometry, material, group )
    {
        object.onBeforeRender( this, scene, camera, geometry, material, group );
        object.modelViewMatrix.multiplyMatrices( camera.matrixWorldInverse, object.matrixWorld );
        object.normalMatrix.getNormalMatrix( object.modelViewMatrix );

        if ( object.isImmediateRenderObject )
        {
            let frontFaceCW = ( object.isMesh && object.matrixWorld.determinant() < 0 );
            this.state.setMaterial( material, frontFaceCW );
            let program = this.setProgram( camera, scene.fog, material, object );
            this._currentGeometryProgram = '';
            this.renderObjectImmediate( object, program, material );
        } else
            this.renderBufferDirect( camera, scene.fog, geometry, material, object, group );

        object.onAfterRender( this, scene, camera, geometry, material, group );
    }

    initMaterial( material, fog, object )
    {
        let materialProperties = this.properties.get( material );
        let parameters = this.programCache.getParameters(
            material, this.lights.state, this.shadowsArray, fog, this._clipping.numPlanes, this._clipping.numIntersection, object );
        let code = this.programCache.getProgramCode( material, parameters );
        let program = materialProperties.program;
        let programChange = true;

        if ( program === undefined )
        {
            // new material
            material.addEventListener( 'dispose', this.onMaterialDispose );
        } else if ( program.code !== code )
        {
            // changed glsl or parameters
            this.releaseMaterialProgramReference( material );
        } else if ( parameters.shaderID !== undefined )
        {
            // same glsl and uniform list
            return;
        } else
        {
            // only rebuild uniform list
            programChange = false;
        }

        if ( programChange )
        {
            if ( parameters.shaderID )
            {
                let shader = ShaderLib[parameters.shaderID];
                materialProperties.shader = {
                    name: material.type,
                    uniforms: UniformsUtils.clone( shader.uniforms ),
                    vertexShader: shader.vertexShader,
                    fragmentShader: shader.fragmentShader
                };
            } else
            {
                materialProperties.shader = {
                    name: material.type,
                    uniforms: material.uniforms,
                    vertexShader: material.vertexShader,
                    fragmentShader: material.fragmentShader
                };
            }

            material.onBeforeCompile( materialProperties.shader );
            program = this.programCache.acquireProgram( material, materialProperties.shader, parameters, code );
            materialProperties.program = program;
            material.program = program;
        }

        let programAttributes = program.getAttributes();

        if ( material.morphTargets )
        {
            material.numSupportedMorphTargets = 0;
            for ( let i = 0; i < this.maxMorphTargets; i++ )
            {
                if ( programAttributes['morphTarget' + i] >= 0 )
                    material.numSupportedMorphTargets++;
            }
        }

        if ( material.morphNormals )
        {
            material.numSupportedMorphNormals = 0;
            for ( let i = 0; i < this.maxMorphNormals; i++ )
            {
                if ( programAttributes['morphNormal' + i] >= 0 )
                    material.numSupportedMorphNormals++;
            }
        }

        let uniforms = materialProperties.shader.uniforms;

        if ( !material.isShaderMaterial &&
            !material.isRawShaderMaterial ||
            material.clipping === true )
        {
            materialProperties.numClippingPlanes = this._clipping.numPlanes;
            materialProperties.numIntersection = this._clipping.numIntersection;
            uniforms.clippingPlanes = this._clipping.uniform;
        }

        materialProperties.fog = fog;

        // store the light setup it was created for

        materialProperties.lightsHash = this.lights.state.hash;

        if ( material.this.lights )
        {
            // wire up the material to this renderer's lighting this.state
            uniforms.ambientLightColor.value = this.lights.state.ambient;
            uniforms.directionalLights.value = this.lights.state.directional;
            uniforms.spotLights.value = this.lights.state.spot;
            uniforms.rectAreaLights.value = this.lights.state.rectArea;
            uniforms.pointLights.value = this.lights.state.point;
            uniforms.hemisphereLights.value = this.lights.state.hemi;

            uniforms.directionalShadowMap.value = this.lights.state.directionalShadowMap;
            uniforms.directionalShadowMatrix.value = this.lights.state.directionalShadowMatrix;
            uniforms.spotShadowMap.value = this.lights.state.spotShadowMap;
            uniforms.spotShadowMatrix.value = this.lights.state.spotShadowMatrix;
            uniforms.pointShadowMap.value = this.lights.state.pointShadowMap;
            uniforms.pointShadowMatrix.value = this.lights.state.pointShadowMatrix;
            // TODO (abelnation): add area lights shadow info to uniforms
        }

        let progUniforms = materialProperties.program.getUniforms(),
            uniformsList =
                WebGLUniforms.seqWithValue( progUniforms.seq, uniforms );

        materialProperties.uniformsList = uniformsList;
    }

    setProgram( camera, fog, material, object )
    {
        this._usedTextureUnits = 0;
        let materialProperties = this.properties.get( material );
        if ( this._clippingEnabled )
        {
            if ( this._localClippingEnabled || camera !== this._currentCamera )
            {
                let useCache =
                    camera === this._currentCamera &&
                    material.id === this._currentMaterialId;

                // we might want to call this function with some ClippingGroup
                // object instead of the material, once it becomes feasible
                // (#8465, #8379)
                this._clipping.setState(
                    material.clippingPlanes, material.clipIntersection, material.clipShadows,
                    camera, materialProperties, useCache );
            }
        }

        if ( material.needsUpdate === false )
        {
            if ( materialProperties.program === undefined )
            {
                material.needsUpdate = true;
            } else if ( material.fog && materialProperties.fog !== fog )
            {
                material.needsUpdate = true;
            } else if ( material.this.lights && materialProperties.lightsHash !== this.lights.state.hash )
            {
                material.needsUpdate = true;
            } else if ( materialProperties.numClippingPlanes !== undefined &&
                ( materialProperties.numClippingPlanes !== this._clipping.numPlanes ||
                    materialProperties.numIntersection !== this._clipping.numIntersection ) )
            {
                material.needsUpdate = true;
            }
        }

        if ( material.needsUpdate )
        {
            this.initMaterial( material, fog, object );
            material.needsUpdate = false;
        }

        let refreshProgram = false;
        let refreshMaterial = false;
        let refreshLights = false;
        let program = materialProperties.program,
            p_uniforms = program.getUniforms(),
            m_uniforms = materialProperties.shader.uniforms;

        if ( this.state.useProgram( program.program ) )
        {
            refreshProgram = true;
            refreshMaterial = true;
            refreshLights = true;
        }

        if ( material.id !== this._currentMaterialId )
        {
            this._currentMaterialId = material.id;
            refreshMaterial = true;
        }

        if ( refreshProgram || camera !== this._currentCamera )
        {
            p_uniforms.setValue( this._gl, 'projectionMatrix', camera.projectionMatrix );

            if ( this.capabilities.logarithmicDepthBuffer )
            {
                p_uniforms.setValue( this._gl, 'logDepthBufFC',
                    2.0 / ( Math.log( camera.far + 1.0 ) / Math.LN2 ) );
            }

            // Avoid unneeded uniform updates per ArrayCamera's sub-camera
            if ( this._currentCamera !== ( this._currentArrayCamera || camera ) )
            {
                this._currentCamera = ( this._currentArrayCamera || camera );

                // lighting uniforms depend on the camera so enforce an update
                // now, in case this material supports this.lights - or later, when
                // the next material that does gets activated:

                refreshMaterial = true;		// set to true on material change
                refreshLights = true;		// remains set until update done
            }

            // load material specific uniforms
            // (shader material also gets them for the sake of genericity)

            if ( material.isShaderMaterial ||
                material.isMeshPhongMaterial ||
                material.isMeshStandardMaterial ||
                material.envMap )
            {
                let uCamPos = p_uniforms.map.cameraPosition;
                if ( uCamPos !== undefined )
                {
                    uCamPos.setValue( this._gl,
                        this._vector3.setFromMatrixPosition( camera.matrixWorld ) );
                }
            }

            if ( material.isMeshPhongMaterial ||
                material.isMeshLambertMaterial ||
                material.isMeshBasicMaterial ||
                material.isMeshStandardMaterial ||
                material.isShaderMaterial ||
                material.skinning )
            {
                p_uniforms.setValue( this._gl, 'viewMatrix', camera.matrixWorldInverse );
            }
        }

        // skinning uniforms must be set even if material didn't change
        // auto-setting of texture unit for bone texture must go before other textures
        // not sure why, but otherwise weird things happen

        if ( material.skinning )
        {
            p_uniforms.setOptional( this._gl, object, 'bindMatrix' );
            p_uniforms.setOptional( this._gl, object, 'bindMatrixInverse' );

            let skeleton = object.skeleton;
            if ( skeleton )
            {
                let bones = skeleton.bones;
                if ( this.capabilities.floatVertexTextures )
                {
                    if ( skeleton.boneTexture === undefined )
                    {
                        // layout (1 matrix = 4 pixels)
                        //      RGBA RGBA RGBA RGBA (=> column1, column2, column3, column4)
                        //  with  8x8  pixel texture max   16 bones * 4 pixels =  (8 * 8)
                        //       16x16 pixel texture max   64 bones * 4 pixels = (16 * 16)
                        //       32x32 pixel texture max  256 bones * 4 pixels = (32 * 32)
                        //       64x64 pixel texture max 1024 bones * 4 pixels = (64 * 64)

                        let size = Math.sqrt( bones.length * 4 ); // 4 pixels needed for 1 matrix
                        size = _Math.ceilPowerOfTwo( size );
                        size = Math.max( size, 4 );

                        let boneMatrices = new Float32Array( size * size * 4 ); // 4 floats per RGBA pixel
                        boneMatrices.set( skeleton.boneMatrices ); // copy current values

                        let boneTexture = new DataTexture( boneMatrices, size, size, Constant.RGBAFormat, Constant.FloatType );

                        skeleton.boneMatrices = boneMatrices;
                        skeleton.boneTexture = boneTexture;
                        skeleton.boneTextureSize = size;
                    }

                    p_uniforms.setValue( this._gl, 'boneTexture', skeleton.boneTexture );
                    p_uniforms.setValue( this._gl, 'boneTextureSize', skeleton.boneTextureSize );
                } else
                    p_uniforms.setOptional( this._gl, skeleton, 'boneMatrices' );
            }
        }

        if ( refreshMaterial )
        {
            p_uniforms.setValue( this._gl, 'toneMappingExposure', this.toneMappingExposure );
            p_uniforms.setValue( this._gl, 'toneMappingWhitePoint', this.toneMappingWhitePoint );

            if ( material.this.lights )
            {
                // the current material requires lighting info
                // note: all lighting uniforms are always set correctly
                // they simply reference the renderer's state for their
                // values
                //
                // use the current material's .needsUpdate flags to set
                // the GL state when required

                this.markUniformsLightsNeedsUpdate( m_uniforms, refreshLights );
            }

            // refresh uniforms common to several materials

            if ( fog && material.fog )
                this.refreshUniformsFog( m_uniforms, fog );

            if ( material.isMeshBasicMaterial )
            {
                this.refreshUniformsCommon( m_uniforms, material );
            } else if ( material.isMeshLambertMaterial )
            {
                this.refreshUniformsCommon( m_uniforms, material );
                this.refreshUniformsLambert( m_uniforms, material );
            } else if ( material.isMeshPhongMaterial )
            {
                this.refreshUniformsCommon( m_uniforms, material );
                if ( material.isMeshToonMaterial )
                    this.refreshUniformsToon( m_uniforms, material );
                else
                    this.refreshUniformsPhong( m_uniforms, material );
            } else if ( material.isMeshStandardMaterial )
            {
                this.refreshUniformsCommon( m_uniforms, material );
                if ( material.isMeshPhysicalMaterial )
                    this.refreshUniformsPhysical( m_uniforms, material );
                else
                    this.refreshUniformsStandard( m_uniforms, material );
            } else if ( material.isMeshDepthMaterial )
            {
                this.refreshUniformsCommon( m_uniforms, material );
                this.refreshUniformsDepth( m_uniforms, material );
            } else if ( material.isMeshDistanceMaterial )
            {
                this.refreshUniformsCommon( m_uniforms, material );
                this.refreshUniformsDistance( m_uniforms, material );
            } else if ( material.isMeshNormalMaterial )
            {
                this.refreshUniformsCommon( m_uniforms, material );
                this.refreshUniformsNormal( m_uniforms, material );
            } else if ( material.isLineBasicMaterial )
            {
                this.refreshUniformsLine( m_uniforms, material );
                if ( material.isLineDashedMaterial )
                    this.refreshUniformsDash( m_uniforms, material );
            } else if ( material.isPointsMaterial )
            {
                this.refreshUniformsPoints( m_uniforms, material );
            } else if ( material.isShadowMaterial )
            {
                m_uniforms.color.value = material.color;
                m_uniforms.opacity.value = material.opacity;
            }

            // RectAreaLight Texture
            // TODO (mrdoob): Find a nicer implementation
            if ( m_uniforms.ltcMat !== undefined ) m_uniforms.ltcMat.value = UniformsLib.LTC_MAT_TEXTURE;
            if ( m_uniforms.ltcMag !== undefined ) m_uniforms.ltcMag.value = UniformsLib.LTC_MAG_TEXTURE;

            WebGLUniforms.upload(
                this._gl, materialProperties.uniformsList, m_uniforms, this );
        }

        // common matrices
        p_uniforms.setValue( this._gl, 'modelViewMatrix', object.modelViewMatrix );
        p_uniforms.setValue( this._gl, 'normalMatrix', object.normalMatrix );
        p_uniforms.setValue( this._gl, 'modelMatrix', object.matrixWorld );

        return program;
    }

    // Uniforms (refresh uniforms objects)
    refreshUniformsCommon( uniforms, material )
    {
        uniforms.opacity.value = material.opacity;

        if ( material.color )
            uniforms.diffuse.value = material.color;

        if ( material.emissive )
            uniforms.emissive.value.copy( material.emissive ).multiplyScalar( material.emissiveIntensity );

        if ( material.map )
            uniforms.map.value = material.map;

        if ( material.alphaMap )
            uniforms.alphaMap.value = material.alphaMap;

        if ( material.specularMap )
            uniforms.specularMap.value = material.specularMap;

        if ( material.envMap )
        {
            uniforms.envMap.value = material.envMap;

            // don't flip CubeTexture envMaps, flip everything else:
            //  WebGLRenderTargetCube will be flipped for backwards compatibility
            //  WebGLRenderTargetCube.texture will be flipped because it's a Texture and NOT a CubeTexture
            // this check must be handled differently, or removed entirely, if WebGLRenderTargetCube uses a CubeTexture in the future
            uniforms.flipEnvMap.value = ( !( material.envMap && material.envMap.isCubeTexture ) ) ? 1 : - 1;

            uniforms.reflectivity.value = material.reflectivity;
            uniforms.refractionRatio.value = material.refractionRatio;
        }

        if ( material.lightMap )
        {
            uniforms.lightMap.value = material.lightMap;
            uniforms.lightMapIntensity.value = material.lightMapIntensity;
        }

        if ( material.aoMap )
        {
            uniforms.aoMap.value = material.aoMap;
            uniforms.aoMapIntensity.value = material.aoMapIntensity;
        }

        // uv repeat and offset setting priorities
        // 1. color map
        // 2. specular map
        // 3. normal map
        // 4. bump map
        // 5. alpha map
        // 6. emissive map

        let uvScaleMap;
        if ( material.map )
            uvScaleMap = material.map;
        else if ( material.specularMap )
            uvScaleMap = material.specularMap;
        else if ( material.displacementMap )
            uvScaleMap = material.displacementMap;
        else if ( material.normalMap )
            uvScaleMap = material.normalMap;
        else if ( material.bumpMap )
            uvScaleMap = material.bumpMap;
        else if ( material.roughnessMap )
            uvScaleMap = material.roughnessMap;
        else if ( material.metalnessMap )
            uvScaleMap = material.metalnessMap;
        else if ( material.alphaMap )
            uvScaleMap = material.alphaMap;
        else if ( material.emissiveMap )
            uvScaleMap = material.emissiveMap;

        if ( uvScaleMap !== undefined )
        {
            // backwards compatibility
            if ( uvScaleMap.isWebGLRenderTarget )
                uvScaleMap = uvScaleMap.texture;

            if ( uvScaleMap.matrixAutoUpdate === true )
            {
                let offset = uvScaleMap.offset;
                let repeat = uvScaleMap.repeat;
                let rotation = uvScaleMap.rotation;
                let center = uvScaleMap.center;

                uvScaleMap.matrix.setUvTransform( offset.x, offset.y, repeat.x, repeat.y, rotation, center.x, center.y );
            }

            uniforms.uvTransform.value.copy( uvScaleMap.matrix );
        }
    }

    refreshUniformsLine( uniforms, material )
    {
        uniforms.diffuse.value = material.color;
        uniforms.opacity.value = material.opacity;
    }

    refreshUniformsDash( uniforms, material )
    {
        uniforms.dashSize.value = material.dashSize;
        uniforms.totalSize.value = material.dashSize + material.gapSize;
        uniforms.scale.value = material.scale;
    }

    refreshUniformsPoints( uniforms, material )
    {
        uniforms.diffuse.value = material.color;
        uniforms.opacity.value = material.opacity;
        uniforms.size.value = material.size * this._pixelRatio;
        uniforms.scale.value = this._height * 0.5;
        uniforms.map.value = material.map;

        if ( material.map !== null )
        {
            if ( material.map.matrixAutoUpdate === true )
            {
                let offset = material.map.offset;
                let repeat = material.map.repeat;
                let rotation = material.map.rotation;
                let center = material.map.center;

                material.map.matrix.setUvTransform( offset.x, offset.y, repeat.x, repeat.y, rotation, center.x, center.y );
            }

            uniforms.uvTransform.value.copy( material.map.matrix );
        }
    }

    refreshUniformsFog( uniforms, fog )
    {
        uniforms.fogColor.value = fog.color;

        if ( fog.isFog )
        {
            uniforms.fogNear.value = fog.near;
            uniforms.fogFar.value = fog.far;
        } else if ( fog.isFogExp2 )
            uniforms.fogDensity.value = fog.density;
    }

    refreshUniformsLambert( uniforms, material )
    {
        if ( material.emissiveMap )
            uniforms.emissiveMap.value = material.emissiveMap;
    }

    refreshUniformsPhong( uniforms, material )
    {
        uniforms.specular.value = material.specular;
        uniforms.shininess.value = Math.max( material.shininess, 1e-4 ); // to prevent pow( 0.0, 0.0 )

        if ( material.emissiveMap )
            uniforms.emissiveMap.value = material.emissiveMap;

        if ( material.bumpMap )
        {
            uniforms.bumpMap.value = material.bumpMap;
            uniforms.bumpScale.value = material.bumpScale;
        }

        if ( material.normalMap )
        {
            uniforms.normalMap.value = material.normalMap;
            uniforms.normalScale.value.copy( material.normalScale );
        }

        if ( material.displacementMap )
        {
            uniforms.displacementMap.value = material.displacementMap;
            uniforms.displacementScale.value = material.displacementScale;
            uniforms.displacementBias.value = material.displacementBias;
        }
    }

    refreshUniformsToon( uniforms, material )
    {
        this.refreshUniformsPhong( uniforms, material );
        if ( material.gradientMap )
            uniforms.gradientMap.value = material.gradientMap;
    }

    refreshUniformsStandard( uniforms, material )
    {
        uniforms.roughness.value = material.roughness;
        uniforms.metalness.value = material.metalness;

        if ( material.roughnessMap )
            uniforms.roughnessMap.value = material.roughnessMap;

        if ( material.metalnessMap )
            uniforms.metalnessMap.value = material.metalnessMap;

        if ( material.emissiveMap )
            uniforms.emissiveMap.value = material.emissiveMap;

        if ( material.bumpMap )
        {
            uniforms.bumpMap.value = material.bumpMap;
            uniforms.bumpScale.value = material.bumpScale;
        }

        if ( material.normalMap )
        {
            uniforms.normalMap.value = material.normalMap;
            uniforms.normalScale.value.copy( material.normalScale );
        }

        if ( material.displacementMap )
        {
            uniforms.displacementMap.value = material.displacementMap;
            uniforms.displacementScale.value = material.displacementScale;
            uniforms.displacementBias.value = material.displacementBias;
        }

        if ( material.envMap )
        {
            //uniforms.envMap.value = material.envMap; // part of uniforms common
            uniforms.envMapIntensity.value = material.envMapIntensity;
        }
    }

    refreshUniformsPhysical( uniforms, material )
    {
        uniforms.clearCoat.value = material.clearCoat;
        uniforms.clearCoatRoughness.value = material.clearCoatRoughness;

        this.refreshUniformsStandard( uniforms, material );
    }

    refreshUniformsDepth( uniforms, material )
    {
        if ( material.displacementMap )
        {
            uniforms.displacementMap.value = material.displacementMap;
            uniforms.displacementScale.value = material.displacementScale;
            uniforms.displacementBias.value = material.displacementBias;
        }
    }

    refreshUniformsDistance( uniforms, material )
    {
        if ( material.displacementMap )
        {
            uniforms.displacementMap.value = material.displacementMap;
            uniforms.displacementScale.value = material.displacementScale;
            uniforms.displacementBias.value = material.displacementBias;
        }

        uniforms.referencePosition.value.copy( material.referencePosition );
        uniforms.nearDistance.value = material.nearDistance;
        uniforms.farDistance.value = material.farDistance;
    }

    refreshUniformsNormal( uniforms, material )
    {
        if ( material.bumpMap )
        {
            uniforms.bumpMap.value = material.bumpMap;
            uniforms.bumpScale.value = material.bumpScale;
        }

        if ( material.normalMap )
        {
            uniforms.normalMap.value = material.normalMap;
            uniforms.normalScale.value.copy( material.normalScale );
        }

        if ( material.displacementMap )
        {
            uniforms.displacementMap.value = material.displacementMap;
            uniforms.displacementScale.value = material.displacementScale;
            uniforms.displacementBias.value = material.displacementBias;
        }
    }

    // If uniforms are marked as clean, they don't need to be loaded to the GPU.

    markUniformsLightsNeedsUpdate( uniforms, value )
    {
        uniforms.ambientLightColor.needsUpdate = value;
        uniforms.directionalLights.needsUpdate = value;
        uniforms.pointLights.needsUpdate = value;
        uniforms.spotLights.needsUpdate = value;
        uniforms.rectAreaLights.needsUpdate = value;
        uniforms.hemisphereLights.needsUpdate = value;
    }

    // GL state setting

    setFaceCulling( cullFace, frontFaceDirection )
    {
        this.state.setCullFace( cullFace );
        this.state.setFlipSided( frontFaceDirection === Constant.FrontFaceDirectionCW );
    }

    // Textures

    allocTextureUnit()
    {
        let textureUnit = this._usedTextureUnits;

        if ( textureUnit >= this.capabilities.maxTextures )
            console.warn( 'THREE.WebGLRenderer: Trying to use ' + textureUnit + ' texture units while this GPU supports only ' + this.capabilities.maxTextures );

        this._usedTextureUnits += 1;
        return textureUnit;
    }

    // backwards compatibility: peel texture.texture
    setTexture2D( texture, slot )
    {
        let warned = false;

        if ( texture && texture.isWebGLRenderTarget )
        {
            if ( !warned )
            {
                console.warn( "THREE.WebGLRenderer.setTexture2D: don't use render targets as this.textures. Use their .texture property instead." );
                warned = true;
            }
            texture = texture.texture;
        }

        this.textures.setTexture2D( texture, slot );
    }


    setTexture( texture, slot )
    {
        let warned = false;
        if ( !warned )
        {
            console.warn( "THREE.WebGLRenderer: .setTexture is deprecated, use setTexture2D instead." );
            warned = true;
        }

        this.textures.setTexture2D( texture, slot );
    }


    setTextureCube( texture, slot )
    {
        let warned = false;

        // backwards compatibility: peel texture.texture
        if ( texture && texture.isWebGLRenderTargetCube )
        {
            if ( !warned )
            {
                console.warn( "THREE.WebGLRenderer.setTextureCube: don't use cube render targets as this.textures. Use their .texture property instead." );
                warned = true;
            }

            texture = texture.texture;
        }

        // currently relying on the fact that WebGLRenderTargetCube.texture is a Texture and NOT a CubeTexture
        // TODO: unify these code paths
        if ( ( texture && texture.isCubeTexture ) ||
            ( Array.isArray( texture.image ) && texture.image.length === 6 ) )
        {
            // CompressedTexture can have Array in image :/
            // this function alone should take care of cube this.textures
            this.textures.setTextureCube( texture, slot );
        } else
        {
            // assumed: texture property of THREE.WebGLRenderTargetCube
            this.textures.setTextureCubeDynamic( texture, slot );
        }
    }

    getRenderTarget()
    {
        return this._currentRenderTarget;
    }

    setRenderTarget( renderTarget: WebGLRenderTarget )
    {
        this._currentRenderTarget = renderTarget;

        if ( renderTarget && this.properties.get( renderTarget ).__webglFramebuffer === undefined )
            this.textures.setupRenderTarget( renderTarget );

        let framebuffer = null;
        let isCube = false;
        let targetCube: WebGLRenderTargetCube = renderTarget as WebGLRenderTargetCube;

        if ( renderTarget )
        {
            let __webglFramebuffer = this.properties.get( renderTarget ).__webglFramebuffer;

            if ( renderTarget instanceof WebGLRenderTargetCube )
            {
                framebuffer = __webglFramebuffer[targetCube.activeCubeFace];
                isCube = true;
            } else
                framebuffer = __webglFramebuffer;

            this._currentViewport.copy( renderTarget.viewport );
            this._currentScissor.copy( renderTarget.scissor );
            this._currentScissorTest = renderTarget.scissorTest;
        } else
        {
            this._currentViewport.copy( this._viewport ).multiplyScalar( this._pixelRatio );
            this._currentScissor.copy( this._scissor ).multiplyScalar( this._pixelRatio );
            this._currentScissorTest = this._scissorTest;
        }

        if ( this._currentFramebuffer !== framebuffer )
        {
            this._gl.bindFramebuffer( this._gl.FRAMEBUFFER, framebuffer );
            this._currentFramebuffer = framebuffer;
        }

        this.state.viewport( this._currentViewport );
        this.state.scissor( this._currentScissor );
        this.state.setScissorTest( this._currentScissorTest );

        if ( isCube )
        {
            let textureProperties = this.properties.get( renderTarget.texture );
            this._gl.framebufferTexture2D( this._gl.FRAMEBUFFER, this._gl.COLOR_ATTACHMENT0, this._gl.TEXTURE_CUBE_MAP_POSITIVE_X + targetCube.activeCubeFace, textureProperties.__webglTexture, targetCube.activeMipMapLevel );
        }
    }

    readRenderTargetPixels( renderTarget, x, y, width, height, buffer )
    {
        if ( !( renderTarget && renderTarget.isWebGLRenderTarget ) )
        {
            console.error( 'THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.' );
            return;
        }

        let framebuffer = this.properties.get( renderTarget ).__webglFramebuffer;

        if ( framebuffer )
        {
            let restore = false;

            if ( framebuffer !== this._currentFramebuffer )
            {
                this._gl.bindFramebuffer( this._gl.FRAMEBUFFER, framebuffer );
                restore = true;
            }

            try
            {
                let texture = renderTarget.texture;
                let textureFormat = texture.format;
                let textureType = texture.type;

                if ( textureFormat !== Constant.RGBAFormat && this.utils.convert( textureFormat ) !== this._gl.getParameter( this._gl.IMPLEMENTATION_COLOR_READ_FORMAT ) )
                {
                    console.error( 'THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.' );
                    return;
                }

                if ( textureType !== Constant.UnsignedByteType && this.utils.convert( textureType ) !== this._gl.getParameter( this._gl.IMPLEMENTATION_COLOR_READ_TYPE ) && // IE11, Edge and Chrome Mac < 52 (#9513)
                    !( textureType === Constant.FloatType && ( this.extensions.get( 'OES_texture_float' ) || this.extensions.get( 'WEBGL_color_buffer_float' ) ) ) && // Chrome Mac >= 52 and Firefox
                    !( textureType === Constant.HalfFloatType && this.extensions.get( 'EXT_color_buffer_half_float' ) ) )
                {
                    console.error( 'THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.' );
                    return;
                }

                if ( this._gl.checkFramebufferStatus( this._gl.FRAMEBUFFER ) === this._gl.FRAMEBUFFER_COMPLETE )
                {
                    // the following if statement ensures valid read requests (no out-of-bounds pixels, see #8604)
                    if ( ( x >= 0 && x <= ( renderTarget.width - width ) ) && ( y >= 0 && y <= ( renderTarget.height - height ) ) )
                    {
                        this._gl.readPixels( x, y, width, height, this.utils.convert( textureFormat ), this.utils.convert( textureType ), buffer );
                    }

                } else
                    console.error( 'THREE.WebGLRenderer.readRenderTargetPixels: readPixels from renderTarget failed. Framebuffer not complete.' );

            } finally
            {
                if ( restore )
                    this._gl.bindFramebuffer( this._gl.FRAMEBUFFER, this._currentFramebuffer );
            }
        }
    }

}

export { WebGLRenderer };
