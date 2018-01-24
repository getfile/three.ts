/**
 * @author mrdoob / http://mrdoob.com/
 */

import * as Constant from '../../constants';
import { Vector4 } from '../../math/Vector4';
import { WebGLExtensions } from "./WebGLExtensions";
import { WebGLUtils } from "./WebGLUtils";

class ColorBuffer
{
    locked: boolean;
    currentColorMask: boolean;
    currentColorClear: Vector4;
    gl: WebGLRenderingContext;

    constructor(gl)
    {
        this.gl = gl;
        this.locked = false;
        this.currentColorMask = null;
        this.currentColorClear = new Vector4();
    }

    setMask(colorMask: boolean)
    {
        if (this.currentColorMask !== colorMask && !this.locked)
        {
            this.gl.colorMask(colorMask, colorMask, colorMask, colorMask);
            this.currentColorMask = colorMask;
        }
    }

    setLocked(lock: boolean)
    {
        this.locked = lock;
    }

    setClear(r, g, b, a, premultipliedAlpha: boolean = true)
    {
        if (premultipliedAlpha === true)
        {
            r *= a; g *= a; b *= a;
        }

        var color = new Vector4(r, g, b, a);

        if (this.currentColorClear.equals(color) === false)
        {
            this.gl.clearColor(r, g, b, a);
            this.currentColorClear.copy(color);
        }
    }

    reset()
    {
        this.locked = false;
        this.currentColorMask = null;
        this.currentColorClear.set(- 1, 0, 0, 0); // set to invalid state
    }

}

class DepthBuffer
{
    gl: WebGLRenderingContext;
    container: WebGLState;

    locked: boolean;
    currentDepthMask: boolean;
    currentDepthFunc: number;
    currentDepthClear: number;

    constructor(gl, container)
    {
        this.gl = gl;
        this.container = container;

        this.locked = false;
        this.currentDepthMask = null;
        this.currentDepthFunc = null;
        this.currentDepthClear = null;
    }

    setTest(depthTest)
    {
        if (depthTest)
            this.container.enable(this.gl.DEPTH_TEST);
        else
            this.container.disable(this.gl.DEPTH_TEST);
    }

    setMask(depthMask: boolean)
    {
        if (this.currentDepthMask !== depthMask && !this.locked)
        {
            this.gl.depthMask(depthMask);
            this.currentDepthMask = depthMask;
        }
    }

    setFunc(depthFunc: number)
    {
        if (this.currentDepthFunc !== depthFunc)
        {
            if (depthFunc)
            {
                switch (depthFunc)
                {
                    case Constant.NeverDepth:
                        this.gl.depthFunc(this.gl.NEVER);
                        break;

                    case Constant.AlwaysDepth:
                        this.gl.depthFunc(this.gl.ALWAYS);
                        break;

                    case Constant.LessDepth:
                        this.gl.depthFunc(this.gl.LESS);
                        break;

                    case Constant.LessEqualDepth:
                        this.gl.depthFunc(this.gl.LEQUAL);
                        break;

                    case Constant.EqualDepth:
                        this.gl.depthFunc(this.gl.EQUAL);
                        break;

                    case Constant.GreaterEqualDepth:
                        this.gl.depthFunc(this.gl.GEQUAL);
                        break;

                    case Constant.GreaterDepth:
                        this.gl.depthFunc(this.gl.GREATER);
                        break;

                    case Constant.NotEqualDepth:
                        this.gl.depthFunc(this.gl.NOTEQUAL);
                        break;

                    default:
                        this.gl.depthFunc(this.gl.LEQUAL);
                }
            } else
                this.gl.depthFunc(this.gl.LEQUAL);

            this.currentDepthFunc = depthFunc;
        }
    }

    setLocked(lock)
    {
        this.locked = lock;
    }

    setClear(depth)
    {
        if (this.currentDepthClear !== depth)
        {
            this.gl.clearDepth(depth);
            this.currentDepthClear = depth;
        }
    }

    reset()
    {
        this.locked = false;
        this.currentDepthMask = null;
        this.currentDepthFunc = null;
        this.currentDepthClear = null;
    }

}

class StencilBuffer
{
    gl: WebGLRenderingContext;
    container: WebGLState;

    locked;
    currentStencilMask;
    currentStencilFunc;
    currentStencilRef;
    currentStencilFuncMask;
    currentStencilFail;
    currentStencilZFail;
    currentStencilZPass;
    currentStencilClear;

    constructor(gl, container)
    {
        this.gl = gl;
        this.container = container;

        this.locked = false;
        this.currentStencilMask = null;
        this.currentStencilFunc = null;
        this.currentStencilRef = null;
        this.currentStencilFuncMask = null;
        this.currentStencilFail = null;
        this.currentStencilZFail = null;
        this.currentStencilZPass = null;
        this.currentStencilClear = null;
    }

    setTest(stencilTest)
    {
        if (stencilTest)
            this.container.enable(this.gl.STENCIL_TEST);
        else
            this.container.disable(this.gl.STENCIL_TEST);
    }

    setMask(stencilMask)
    {
        if (this.currentStencilMask !== stencilMask && !this.locked)
        {
            this.gl.stencilMask(stencilMask);
            this.currentStencilMask = stencilMask;
        }
    }

    setFunc(stencilFunc, stencilRef, stencilMask)
    {
        if (this.currentStencilFunc !== stencilFunc ||
            this.currentStencilRef !== stencilRef ||
            this.currentStencilFuncMask !== stencilMask)
        {
            this.gl.stencilFunc(stencilFunc, stencilRef, stencilMask);
            this.currentStencilFunc = stencilFunc;
            this.currentStencilRef = stencilRef;
            this.currentStencilFuncMask = stencilMask;
        }
    }

    setOp(stencilFail, stencilZFail, stencilZPass)
    {
        if (this.currentStencilFail !== stencilFail ||
            this.currentStencilZFail !== stencilZFail ||
            this.currentStencilZPass !== stencilZPass)
        {
            this.gl.stencilOp(stencilFail, stencilZFail, stencilZPass);
            this.currentStencilFail = stencilFail;
            this.currentStencilZFail = stencilZFail;
            this.currentStencilZPass = stencilZPass;
        }
    }

    setLocked(lock)
    {
        this.locked = lock;
    }

    setClear(stencil)
    {
        if (this.currentStencilClear !== stencil)
        {
            this.gl.clearStencil(stencil);
            this.currentStencilClear = stencil;
        }
    }

    reset()
    {
        this.locked = false;
        this.currentStencilMask = null;
        this.currentStencilFunc = null;
        this.currentStencilRef = null;
        this.currentStencilFuncMask = null;
        this.currentStencilFail = null;
        this.currentStencilZFail = null;
        this.currentStencilZPass = null;
        this.currentStencilClear = null;
    }

}

class WebGLState
{
    gl: WebGLRenderingContext;
    extensions: WebGLExtensions;
    utils: WebGLUtils;

    enabledAttributes: Uint8Array;
    newAttributes: Uint8Array;
    attributeDivisors: Uint8Array;

    capabilities;
    compressedTextureFormats;
    currentTextureSlot;
    currentBoundTextures;
    currentProgram;
    currentBlending;
    currentFlipSided;
    currentCullFace;

    colorBuffer: ColorBuffer;
    depthBuffer: DepthBuffer;
    stencilBuffer: StencilBuffer;

    currentScissor: Vector4;
    currentViewport: Vector4;
    emptyTextures;
    maxTextures;
    currentLineWidth;
    lineWidthAvailable;
    currentPolygonOffsetFactor;
    currentPolygonOffsetUnits;

    currentBlendEquation;
    currentBlendSrc;
    currentBlendDst;
    currentBlendEquationAlpha;
    currentBlendSrcAlpha;
    currentBlendDstAlpha;
    currentPremultipledAlpha;

    buffers: { color: ColorBuffer, depth: DepthBuffer, stencil: StencilBuffer };

    constructor(gl, extensions, utils)
    {
        this.gl = gl;
        this.extensions = extensions;
        this.utils = utils;

        this.colorBuffer = new ColorBuffer(gl);
        this.depthBuffer = new DepthBuffer(gl, this);
        this.stencilBuffer = new StencilBuffer(gl, this);

        this.buffers = {
            color: this.colorBuffer,
            depth: this.depthBuffer,
            stencil: this.stencilBuffer
        };


        var maxVertexAttributes = this.gl.getParameter(this.gl.MAX_VERTEX_ATTRIBS);
        this.newAttributes = new Uint8Array(maxVertexAttributes);
        this.enabledAttributes = new Uint8Array(maxVertexAttributes);
        this.attributeDivisors = new Uint8Array(maxVertexAttributes);

        this.capabilities = {};

        this.compressedTextureFormats = null;

        this.currentProgram = null;

        this.currentBlending = null;
        this.currentBlendEquation = null;
        this.currentBlendSrc = null;
        this.currentBlendDst = null;
        this.currentBlendEquationAlpha = null;
        this.currentBlendSrcAlpha = null;
        this.currentBlendDstAlpha = null;
        this.currentPremultipledAlpha = false;

        this.currentFlipSided = null;
        this.currentCullFace = null;

        this.currentLineWidth = null;

        this.currentPolygonOffsetFactor = null;
        this.currentPolygonOffsetUnits = null;

        this.maxTextures = this.gl.getParameter(this.gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS);

        var version = parseFloat(/^WebGL\ ([0-9])/.exec(this.gl.getParameter(this.gl.VERSION))[1]);
        this.lineWidthAvailable = parseFloat(version + '') >= 1.0;

        this.currentTextureSlot = null;
        this.currentBoundTextures = {};

        this.currentScissor = new Vector4();
        this.currentViewport = new Vector4();
        this.emptyTextures = {};
        this.emptyTextures[this.gl.TEXTURE_2D] = this.createTexture(this.gl.TEXTURE_2D, this.gl.TEXTURE_2D, 1);
        this.emptyTextures[this.gl.TEXTURE_CUBE_MAP] = this.createTexture(this.gl.TEXTURE_CUBE_MAP, this.gl.TEXTURE_CUBE_MAP_POSITIVE_X, 6);

        // init
        this.colorBuffer.setClear(0, 0, 0, 1);
        this.depthBuffer.setClear(1);
        this.stencilBuffer.setClear(0);

        this.enable(this.gl.DEPTH_TEST);
        this.depthBuffer.setFunc(Constant.LessEqualDepth);

        this.setFlipSided(false);
        this.setCullFace(Constant.CullFaceBack);
        this.enable(this.gl.CULL_FACE);

        this.enable(this.gl.BLEND);
        this.setBlending(Constant.NormalBlending);
    }

    createTexture(type, target, count: number): WebGLTexture
    {
        let data: ArrayBufferView = new Uint8Array(4); // 4 is required to match default unpack alignment of 4.
        let texture: WebGLTexture = this.gl.createTexture();

        this.gl.bindTexture(type, texture);
        this.gl.texParameteri(type, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
        this.gl.texParameteri(type, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);

        for (let i = 0; i < count; i++)
            this.gl.texImage2D(target + i, 0, this.gl.RGBA, 1, 1, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, data);

        return texture;
    }

    //
    initAttributes()
    {
        for (let i = 0, l = this.newAttributes.length; i < l; i++)
            this.newAttributes[i] = 0;
    }

    enableAttribute(attribute: number)
    {
        this.newAttributes[attribute] = 1;

        if (this.enabledAttributes[attribute] === 0)
        {
            this.gl.enableVertexAttribArray(attribute);
            this.enabledAttributes[attribute] = 1;
        }

        if (this.attributeDivisors[attribute] !== 0)
        {
            let extension = this.extensions.get('ANGLE_instanced_arrays');
            extension.vertexAttribDivisorANGLE(attribute, 0);
            this.attributeDivisors[attribute] = 0;
        }
    }

    enableAttributeAndDivisor(attribute, meshPerAttribute)
    {
        this.newAttributes[attribute] = 1;

        if (this.enabledAttributes[attribute] === 0)
        {
            this.gl.enableVertexAttribArray(attribute);
            this.enabledAttributes[attribute] = 1;
        }

        if (this.attributeDivisors[attribute] !== meshPerAttribute)
        {
            let extension = this.extensions.get('ANGLE_instanced_arrays');
            extension.vertexAttribDivisorANGLE(attribute, meshPerAttribute);
            this.attributeDivisors[attribute] = meshPerAttribute;
        }
    }

    disableUnusedAttributes()
    {
        for (let i = 0, l = this.enabledAttributes.length; i !== l; ++i)
        {
            if (this.enabledAttributes[i] !== this.newAttributes[i])
            {
                this.gl.disableVertexAttribArray(i);
                this.enabledAttributes[i] = 0;
            }
        }
    }

    enable(id)
    {
        if (this.capabilities[id] !== true)
        {
            this.gl.enable(id);
            this.capabilities[id] = true;
        }
    }

    disable(id)
    {
        if (this.capabilities[id] !== false)
        {
            this.gl.disable(id);
            this.capabilities[id] = false;
        }
    }

    getCompressedTextureFormats()
    {
        if (this.compressedTextureFormats === null)
        {
            this.compressedTextureFormats = [];

            if (this.extensions.get('WEBGL_compressed_texture_pvrtc') ||
                this.extensions.get('WEBGL_compressed_texture_s3tc') ||
                this.extensions.get('WEBGL_compressed_texture_etc1'))
            {
                let formats = this.gl.getParameter(this.gl.COMPRESSED_TEXTURE_FORMATS);
                for (let i = 0; i < formats.length; i++)
                    this.compressedTextureFormats.push(formats[i]);
            }
        }

        return this.compressedTextureFormats;
    }

    useProgram(program)
    {
        if (this.currentProgram !== program)
        {
            this.gl.useProgram(program);
            this.currentProgram = program;
            return true;
        }

        return false;
    }

    setBlending(blending, blendEquation?, blendSrc?, blendDst?, blendEquationAlpha?, blendSrcAlpha?, blendDstAlpha?, premultipliedAlpha?)
    {

        if (blending !== Constant.NoBlending)
            this.enable(this.gl.BLEND);
        else
            this.disable(this.gl.BLEND);

        if (blending !== Constant.CustomBlending)
        {
            if (blending !== this.currentBlending || premultipliedAlpha !== this.currentPremultipledAlpha)
            {
                switch (blending)
                {
                    case Constant.AdditiveBlending:
                        if (premultipliedAlpha)
                        {
                            this.gl.blendEquationSeparate(this.gl.FUNC_ADD, this.gl.FUNC_ADD);
                            this.gl.blendFuncSeparate(this.gl.ONE, this.gl.ONE, this.gl.ONE, this.gl.ONE);
                        } else
                        {
                            this.gl.blendEquation(this.gl.FUNC_ADD);
                            this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE);
                        }
                        break;

                    case Constant.SubtractiveBlending:
                        if (premultipliedAlpha)
                        {
                            this.gl.blendEquationSeparate(this.gl.FUNC_ADD, this.gl.FUNC_ADD);
                            this.gl.blendFuncSeparate(this.gl.ZERO, this.gl.ZERO, this.gl.ONE_MINUS_SRC_COLOR, this.gl.ONE_MINUS_SRC_ALPHA);
                        } else
                        {
                            this.gl.blendEquation(this.gl.FUNC_ADD);
                            this.gl.blendFunc(this.gl.ZERO, this.gl.ONE_MINUS_SRC_COLOR);
                        }
                        break;

                    case Constant.MultiplyBlending:
                        if (premultipliedAlpha)
                        {
                            this.gl.blendEquationSeparate(this.gl.FUNC_ADD, this.gl.FUNC_ADD);
                            this.gl.blendFuncSeparate(this.gl.ZERO, this.gl.SRC_COLOR, this.gl.ZERO, this.gl.SRC_ALPHA);
                        } else
                        {
                            this.gl.blendEquation(this.gl.FUNC_ADD);
                            this.gl.blendFunc(this.gl.ZERO, this.gl.SRC_COLOR);
                        }
                        break;

                    default:
                        if (premultipliedAlpha)
                        {
                            this.gl.blendEquationSeparate(this.gl.FUNC_ADD, this.gl.FUNC_ADD);
                            this.gl.blendFuncSeparate(this.gl.ONE, this.gl.ONE_MINUS_SRC_ALPHA, this.gl.ONE, this.gl.ONE_MINUS_SRC_ALPHA);
                        } else
                        {
                            this.gl.blendEquationSeparate(this.gl.FUNC_ADD, this.gl.FUNC_ADD);
                            this.gl.blendFuncSeparate(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA, this.gl.ONE, this.gl.ONE_MINUS_SRC_ALPHA);
                        }
                }
            }

            this.currentBlendEquation = null;
            this.currentBlendSrc = null;
            this.currentBlendDst = null;
            this.currentBlendEquationAlpha = null;
            this.currentBlendSrcAlpha = null;
            this.currentBlendDstAlpha = null;
        } else
        {
            blendEquationAlpha = blendEquationAlpha || blendEquation;
            blendSrcAlpha = blendSrcAlpha || blendSrc;
            blendDstAlpha = blendDstAlpha || blendDst;

            if (blendEquation !== this.currentBlendEquation || blendEquationAlpha !== this.currentBlendEquationAlpha)
            {
                this.gl.blendEquationSeparate(this.utils.convert(blendEquation), this.utils.convert(blendEquationAlpha));
                this.currentBlendEquation = blendEquation;
                this.currentBlendEquationAlpha = blendEquationAlpha;
            }

            if (blendSrc !== this.currentBlendSrc || blendDst !== this.currentBlendDst || blendSrcAlpha !== this.currentBlendSrcAlpha || blendDstAlpha !== this.currentBlendDstAlpha)
            {
                this.gl.blendFuncSeparate(this.utils.convert(blendSrc), this.utils.convert(blendDst), this.utils.convert(blendSrcAlpha), this.utils.convert(blendDstAlpha));
                this.currentBlendSrc = blendSrc;
                this.currentBlendDst = blendDst;
                this.currentBlendSrcAlpha = blendSrcAlpha;
                this.currentBlendDstAlpha = blendDstAlpha;
            }
        }

        this.currentBlending = blending;
        this.currentPremultipledAlpha = premultipliedAlpha;
    }

    setMaterial(material, frontFaceCW)
    {
        material.side === Constant.DoubleSide
            ? this.disable(this.gl.CULL_FACE)
            : this.enable(this.gl.CULL_FACE);

        let flipSided = (material.side === Constant.BackSide);
        if (frontFaceCW) flipSided = !flipSided;

        this.setFlipSided(flipSided);

        material.transparent === true
            ? this.setBlending(material.blending, material.blendEquation, material.blendSrc, material.blendDst, material.blendEquationAlpha, material.blendSrcAlpha, material.blendDstAlpha, material.premultipliedAlpha)
            : this.setBlending(Constant.NoBlending);

        this.depthBuffer.setFunc(material.depthFunc);
        this.depthBuffer.setTest(material.depthTest);
        this.depthBuffer.setMask(material.depthWrite);
        this.colorBuffer.setMask(material.colorWrite);

        this.setPolygonOffset(material.polygonOffset, material.polygonOffsetFactor, material.polygonOffsetUnits);
    }

    //
    setFlipSided(flipSided)
    {
        if (this.currentFlipSided !== flipSided)
        {
            if (flipSided)
                this.gl.frontFace(this.gl.CW);
            else
                this.gl.frontFace(this.gl.CCW);

            this.currentFlipSided = flipSided;
        }
    }

    setCullFace(cullFace)
    {
        if (cullFace !== Constant.CullFaceNone)
        {
            this.enable(this.gl.CULL_FACE);
            if (cullFace !== this.currentCullFace)
            {
                if (cullFace === Constant.CullFaceBack)
                    this.gl.cullFace(this.gl.BACK);
                else if (cullFace === Constant.CullFaceFront)
                    this.gl.cullFace(this.gl.FRONT);
                else
                    this.gl.cullFace(this.gl.FRONT_AND_BACK);
            }
        } else
            this.disable(this.gl.CULL_FACE);

        this.currentCullFace = cullFace;
    }

    setLineWidth(width)
    {
        if (width !== this.currentLineWidth)
        {
            if (this.lineWidthAvailable) this.gl.lineWidth(width);
            this.currentLineWidth = width;
        }
    }

    setPolygonOffset(polygonOffset, factor, units)
    {
        if (polygonOffset)
        {
            this.enable(this.gl.POLYGON_OFFSET_FILL);
            if (this.currentPolygonOffsetFactor !== factor || this.currentPolygonOffsetUnits !== units)
            {
                this.gl.polygonOffset(factor, units);
                this.currentPolygonOffsetFactor = factor;
                this.currentPolygonOffsetUnits = units;
            }
        } else
            this.disable(this.gl.POLYGON_OFFSET_FILL);
    }

    setScissorTest(scissorTest)
    {
        if (scissorTest)
            this.enable(this.gl.SCISSOR_TEST);
        else
            this.disable(this.gl.SCISSOR_TEST);
    }

    // texture
    activeTexture(webglSlot?)
    {
        if (webglSlot === undefined) webglSlot = this.gl.TEXTURE0 + this.maxTextures - 1;
        if (this.currentTextureSlot !== webglSlot)
        {
            this.gl.activeTexture(webglSlot);
            this.currentTextureSlot = webglSlot;
        }
    }

    bindTexture(webglType, webglTexture)
    {
        if (this.currentTextureSlot === null)
            this.activeTexture();

        let boundTexture = this.currentBoundTextures[this.currentTextureSlot];
        if (boundTexture === undefined)
        {
            boundTexture = { type: undefined, texture: undefined };
            this.currentBoundTextures[this.currentTextureSlot] = boundTexture;
        }

        if (boundTexture.type !== webglType || boundTexture.texture !== webglTexture)
        {
            this.gl.bindTexture(webglType, webglTexture || this.emptyTextures[webglType]);
            boundTexture.type = webglType;
            boundTexture.texture = webglTexture;
        }
    }

    compressedTexImage2D(...args)
    {
        try
        {
            this.gl.compressedTexImage2D.apply(this.gl, args);
        } catch (error)
        {
            console.error('THREE.WebGLState:', error);
        }
    }

    texImage2D(...args)
    {
        try
        {
            this.gl.texImage2D.apply(this.gl, args);
        } catch (error)
        {
            console.error('THREE.WebGLState:', error);
        }
    }

    //
    scissor(scissor: Vector4)
    {
        if (this.currentScissor.equals(scissor) === false)
        {
            this.gl.scissor(scissor.x, scissor.y, scissor.z, scissor.w);
            this.currentScissor.copy(scissor);
        }
    }

    viewport(viewport: Vector4)
    {
        if (this.currentViewport.equals(viewport) === false)
        {
            this.gl.viewport(viewport.x, viewport.y, viewport.z, viewport.w);
            this.currentViewport.copy(viewport);
        }
    }

    //
    reset()
    {
        for (let i = 0; i < this.enabledAttributes.length; i++)
        {
            if (this.enabledAttributes[i] === 1)
            {
                this.gl.disableVertexAttribArray(i);
                this.enabledAttributes[i] = 0;
            }
        }

        this.capabilities = {};
        this.compressedTextureFormats = null;
        this.currentTextureSlot = null;
        this.currentBoundTextures = {};
        this.currentProgram = null;
        this.currentBlending = null;
        this.currentFlipSided = null;
        this.currentCullFace = null;
        this.colorBuffer.reset();
        this.depthBuffer.reset();
        this.stencilBuffer.reset();
    }

}

export { ColorBuffer, DepthBuffer, StencilBuffer, WebGLState };
