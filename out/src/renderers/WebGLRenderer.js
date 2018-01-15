define(["require", "exports", "../constants", "../math/Math", "../math/Matrix4", "../textures/DataTexture", "./webgl/WebGLUniforms", "./shaders/UniformsLib", "./shaders/UniformsUtils", "./shaders/ShaderLib", "./webgl/WebGLFlareRenderer", "./webgl/WebGLSpriteRenderer", "./webgl/WebGLShadowMap", "./webgl/WebGLAttributes", "./webgl/WebGLBackground", "./webgl/WebGLRenderLists", "./webgl/WebGLMorphtargets", "./webgl/WebGLIndexedBufferRenderer", "./webgl/WebGLBufferRenderer", "./webgl/WebGLGeometries", "./webgl/WebGLLights", "./webgl/WebGLObjects", "./webgl/WebGLPrograms", "./webgl/WebGLTextures", "./webgl/WebGLProperties", "./webgl/WebGLState", "./webgl/WebGLCapabilities", "./webvr/WebVRManager", "./webgl/WebGLExtensions", "../math/Vector3", "./webgl/WebGLClipping", "../geom/Frustum", "../math/Vector4", "./webgl/WebGLUtils", "../geom/Sphere"], function (require, exports, constants_1, Math_1, Matrix4_1, DataTexture_1, WebGLUniforms_1, UniformsLib_1, UniformsUtils_1, ShaderLib_1, WebGLFlareRenderer_1, WebGLSpriteRenderer_1, WebGLShadowMap_1, WebGLAttributes_1, WebGLBackground_1, WebGLRenderLists_1, WebGLMorphtargets_1, WebGLIndexedBufferRenderer_1, WebGLBufferRenderer_1, WebGLGeometries_1, WebGLLights_1, WebGLObjects_1, WebGLPrograms_1, WebGLTextures_1, WebGLProperties_1, WebGLState_1, WebGLCapabilities_1, WebVRManager_1, WebGLExtensions_1, Vector3_1, WebGLClipping_1, Frustum_1, Vector4_1, WebGLUtils_1, Sphere_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class WebGLRenderer {
        constructor(parameters) {
            console.log('THREE.WebGLRenderer', constants_1.REVISION);
            this.parameters = parameters || {};
            this._canvas = parameters.canvas !== undefined ? parameters.canvas : document.createElementNS('http://www.w3.org/1999/xhtml', 'canvas');
            this._premultipliedAlpha = parameters.premultipliedAlpha !== undefined ? parameters.premultipliedAlpha : true;
            let _context = parameters.context !== undefined ? parameters.context : null, _alpha = parameters.alpha !== undefined ? parameters.alpha : false, _depth = parameters.depth !== undefined ? parameters.depth : true, _stencil = parameters.stencil !== undefined ? parameters.stencil : true, _antialias = parameters.antialias !== undefined ? parameters.antialias : false, _preserveDrawingBuffer = parameters.preserveDrawingBuffer !== undefined ? parameters.preserveDrawingBuffer : false, _powerPreference = parameters.powerPreference !== undefined ? parameters.powerPreference : 'default';
            this.lightsArray = [];
            this.shadowsArray = [];
            this.currentRenderList = null;
            this.spritesArray = [];
            this.flaresArray = [];
            this.domElement = this._canvas;
            this.context = null;
            this.autoClear = true;
            this.autoClearColor = true;
            this.autoClearDepth = true;
            this.autoClearStencil = true;
            this.sortObjects = true;
            this.clippingPlanes = [];
            this.localClippingEnabled = false;
            this.gammaFactor = 2.0;
            this.gammaInput = false;
            this.gammaOutput = false;
            this.physicallyCorrectLights = false;
            this.toneMapping = constants_1.LinearToneMapping;
            this.toneMappingExposure = 1.0;
            this.toneMappingWhitePoint = 1.0;
            this.maxMorphTargets = 8;
            this.maxMorphNormals = 4;
            this._isContextLost = false,
                this._currentRenderTarget = null,
                this._currentFramebuffer = null,
                this._currentMaterialId = -1,
                this._currentGeometryProgram = '',
                this._currentCamera = null,
                this._currentArrayCamera = null,
                this._currentViewport = new Vector4_1.Vector4(),
                this._currentScissor = new Vector4_1.Vector4(),
                this._currentScissorTest = null,
                this._usedTextureUnits = 0,
                this._width = this._canvas.width,
                this._height = this._canvas.height,
                this._pixelRatio = 1,
                this._viewport = new Vector4_1.Vector4(0, 0, this._width, this._height),
                this._scissor = new Vector4_1.Vector4(0, 0, this._width, this._height),
                this._scissorTest = false,
                this._frustum = new Frustum_1.Frustum(),
                this._clipping = new WebGLClipping_1.WebGLClipping(),
                this._clippingEnabled = false,
                this._localClippingEnabled = false,
                this._projScreenMatrix = new Matrix4_1.Matrix4(),
                this._vector3 = new Vector3_1.Vector3(),
                this._infoMemory = {
                    geometries: 0,
                    textures: 0
                },
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
            try {
                let contextAttributes = {
                    alpha: _alpha,
                    depth: _depth,
                    stencil: _stencil,
                    antialias: _antialias,
                    premultipliedAlpha: this._premultipliedAlpha,
                    preserveDrawingBuffer: _preserveDrawingBuffer,
                    powerPreference: _powerPreference
                };
                this._canvas.addEventListener('webglcontextlost', this.onContextLost, false);
                this._canvas.addEventListener('webglcontextrestored', this.onContextRestore, false);
                this._gl = _context || this._canvas.getContext('webgl', contextAttributes) || this._canvas.getContext('experimental-webgl', contextAttributes);
                if (this._gl === null) {
                    if (this._canvas.getContext('webgl') !== null)
                        throw new Error('Error creating WebGL context with your selected this.attributes.');
                    else
                        throw new Error('Error creating WebGL context.');
                }
                if (this._gl.getShaderPrecisionFormat === undefined) {
                    this._gl.getShaderPrecisionFormat = function () {
                        return { 'rangeMin': 1, 'rangeMax': 1, 'precision': 1 };
                    };
                }
            }
            catch (error) {
                console.error('THREE.WebGLRenderer: ' + error.message);
            }
            this.initGLContext();
            this.vr = new WebVRManager_1.WebVRManager(this);
            this.shadowMap = new WebGLShadowMap_1.WebGLShadowMap(this, this.objects, this.capabilities.maxTextureSize);
            this.isAnimating = false;
            this.onAnimationFrame = null;
            this._sphere = new Sphere_1.Sphere();
        }
        getTargetPixelRatio() {
            return this._currentRenderTarget === null ? this._pixelRatio : 1;
        }
        initGLContext() {
            this.extensions = new WebGLExtensions_1.WebGLExtensions(this._gl);
            this.extensions.get('WEBGL_depth_texture');
            this.extensions.get('OES_texture_float');
            this.extensions.get('OES_texture_float_linear');
            this.extensions.get('OES_texture_half_float');
            this.extensions.get('OES_texture_half_float_linear');
            this.extensions.get('OES_standard_derivatives');
            this.extensions.get('OES_element_index_uint');
            this.extensions.get('ANGLE_instanced_arrays');
            this.utils = new WebGLUtils_1.WebGLUtils(this._gl, this.extensions);
            this.capabilities = new WebGLCapabilities_1.WebGLCapabilities(this._gl, this.extensions, this.parameters);
            this.state = new WebGLState_1.WebGLState(this._gl, this.extensions, this.utils);
            this.state.scissor(this._currentScissor.copy(this._scissor).multiplyScalar(this._pixelRatio));
            this.state.viewport(this._currentViewport.copy(this._viewport).multiplyScalar(this._pixelRatio));
            this.properties = new WebGLProperties_1.WebGLProperties();
            this.textures = new WebGLTextures_1.WebGLTextures(this._gl, this.extensions, this.state, this.properties, this.capabilities, this.utils, this._infoMemory);
            this.attributes = new WebGLAttributes_1.WebGLAttributes(this._gl);
            this.geometries = new WebGLGeometries_1.WebGLGeometries(this._gl, this.attributes, this._infoMemory);
            this.objects = new WebGLObjects_1.WebGLObjects(this.geometries, this._infoRender);
            this.morphtargets = new WebGLMorphtargets_1.WebGLMorphtargets(this._gl);
            this.programCache = new WebGLPrograms_1.WebGLPrograms(this, this.extensions, this.capabilities);
            this.lights = new WebGLLights_1.WebGLLights();
            this.renderLists = new WebGLRenderLists_1.WebGLRenderLists();
            this.background = new WebGLBackground_1.WebGLBackground(this, this.state, this.geometries, this._premultipliedAlpha);
            this.bufferRenderer = new WebGLBufferRenderer_1.WebGLBufferRenderer(this._gl, this.extensions, this._infoRender);
            this.indexedBufferRenderer = new WebGLIndexedBufferRenderer_1.WebGLIndexedBufferRenderer(this._gl, this.extensions, this._infoRender);
            this.flareRenderer = new WebGLFlareRenderer_1.WebGLFlareRenderer(this, this._gl, this.state, this.textures, this.capabilities);
            this.spriteRenderer = new WebGLSpriteRenderer_1.WebGLSpriteRenderer(this, this._gl, this.state, this.textures, this.capabilities);
            this.info.programs = this.programCache.programs;
            this.context = this._gl;
        }
        getContext() {
            return this._gl;
        }
        getContextAttributes() {
            return this._gl.getContextAttributes();
        }
        forceContextLoss() {
            let extension = this.extensions.get('WEBGL_lose_context');
            if (extension)
                extension.loseContext();
        }
        forceContextRestore() {
            let extension = this.extensions.get('WEBGL_lose_context');
            if (extension)
                extension.restoreContext();
        }
        getPixelRatio() {
            return this._pixelRatio;
        }
        setPixelRatio(value) {
            if (value === undefined)
                return;
            this._pixelRatio = value;
            this.setSize(this._width, this._height, false);
        }
        getSize() {
            return {
                width: this._width,
                height: this._height
            };
        }
        setSize(width, height, updateStyle) {
            let device = this.vr.getDevice();
            if (device && device.isPresenting) {
                console.warn('THREE.WebGLRenderer: Can\'t change size while VR device is presenting.');
                return;
            }
            this._width = width;
            this._height = height;
            this._canvas.width = width * this._pixelRatio;
            this._canvas.height = height * this._pixelRatio;
            if (updateStyle !== false) {
                this._canvas.style.width = width + 'px';
                this._canvas.style.height = height + 'px';
            }
            this.setViewport(0, 0, width, height);
        }
        getDrawingBufferSize() {
            return {
                width: this._width * this._pixelRatio,
                height: this._height * this._pixelRatio
            };
        }
        setDrawingBufferSize(width, height, pixelRatio) {
            this._width = width;
            this._height = height;
            this._pixelRatio = pixelRatio;
            this._canvas.width = width * pixelRatio;
            this._canvas.height = height * pixelRatio;
            this.setViewport(0, 0, width, height);
        }
        setViewport(x, y, width, height) {
            this._viewport.set(x, this._height - y - height, width, height);
            this.state.viewport(this._currentViewport.copy(this._viewport).multiplyScalar(this._pixelRatio));
        }
        setScissor(x, y, width, height) {
            this._scissor.set(x, this._height - y - height, width, height);
            this.state.scissor(this._currentScissor.copy(this._scissor).multiplyScalar(this._pixelRatio));
        }
        setScissorTest(boolean) {
            this.state.setScissorTest(this._scissorTest = boolean);
        }
        getClearColor() {
            return this.background.getClearColor();
        }
        setClearColor() {
            this.background.setClearColor.apply(this.background, arguments);
        }
        getClearAlpha() {
            return this.background.getClearAlpha();
        }
        setClearAlpha() {
            this.background.setClearAlpha.apply(this.background, arguments);
        }
        clear(color, depth, stencil) {
            let bits = 0;
            if (color === undefined || color)
                bits |= this._gl.COLOR_BUFFER_BIT;
            if (depth === undefined || depth)
                bits |= this._gl.DEPTH_BUFFER_BIT;
            if (stencil === undefined || stencil)
                bits |= this._gl.STENCIL_BUFFER_BIT;
            this._gl.clear(bits);
        }
        clearColor() {
            this.clear(true, false, false);
        }
        clearDepth() {
            this.clear(false, true, false);
        }
        clearStencil() {
            this.clear(false, false, true);
        }
        clearTarget(renderTarget, color, depth, stencil) {
            this.setRenderTarget(renderTarget);
            this.clear(color, depth, stencil);
        }
        dispose() {
            this._canvas.removeEventListener('webglcontextlost', this.onContextLost, false);
            this._canvas.removeEventListener('webglcontextrestored', this.onContextRestore, false);
            this.renderLists.dispose();
            this.vr.dispose();
        }
        onContextLost(event) {
            event.preventDefault();
            console.log('THREE.WebGLRenderer: Context Lost.');
            this._isContextLost = true;
        }
        onContextRestore() {
            console.log('THREE.WebGLRenderer: Context Restored.');
            this._isContextLost = false;
            this.initGLContext();
        }
        onMaterialDispose(event) {
            let material = event.target;
            material.removeEventListener('dispose', this.onMaterialDispose);
            this.deallocateMaterial(material);
        }
        deallocateMaterial(material) {
            this.releaseMaterialProgramReference(material);
            this.properties.remove(material);
        }
        releaseMaterialProgramReference(material) {
            let programInfo = this.properties.get(material).program;
            material.program = undefined;
            if (programInfo !== undefined) {
                this.programCache.releaseProgram(programInfo);
            }
        }
        renderObjectImmediate(object, program, material) {
            object.render(function (object) {
                this.renderBufferImmediate(object, program, material);
            });
        }
        renderBufferImmediate(object, program, material) {
            this.state.initAttributes();
            let buffers = this.properties.get(object);
            if (object.hasPositions && !buffers.position)
                buffers.position = this._gl.createBuffer();
            if (object.hasNormals && !buffers.normal)
                buffers.normal = this._gl.createBuffer();
            if (object.hasUvs && !buffers.uv)
                buffers.uv = this._gl.createBuffer();
            if (object.hasColors && !buffers.color)
                buffers.color = this._gl.createBuffer();
            let programAttributes = program.getAttributes();
            if (object.hasPositions) {
                this._gl.bindBuffer(this._gl.ARRAY_BUFFER, buffers.position);
                this._gl.bufferData(this._gl.ARRAY_BUFFER, object.positionArray, this._gl.DYNAMIC_DRAW);
                this.state.enableAttribute(programAttributes.position);
                this._gl.vertexAttribPointer(programAttributes.position, 3, this._gl.FLOAT, false, 0, 0);
            }
            if (object.hasNormals) {
                this._gl.bindBuffer(this._gl.ARRAY_BUFFER, buffers.normal);
                if (!material.isMeshPhongMaterial &&
                    !material.isMeshStandardMaterial &&
                    !material.isMeshNormalMaterial &&
                    material.flatShading === true) {
                    for (let i = 0, l = object.count * 3; i < l; i += 9) {
                        let array = object.normalArray;
                        let nx = (array[i + 0] + array[i + 3] + array[i + 6]) / 3;
                        let ny = (array[i + 1] + array[i + 4] + array[i + 7]) / 3;
                        let nz = (array[i + 2] + array[i + 5] + array[i + 8]) / 3;
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
                this._gl.bufferData(this._gl.ARRAY_BUFFER, object.normalArray, this._gl.DYNAMIC_DRAW);
                this.state.enableAttribute(programAttributes.normal);
                this._gl.vertexAttribPointer(programAttributes.normal, 3, this._gl.FLOAT, false, 0, 0);
            }
            if (object.hasUvs && material.map) {
                this._gl.bindBuffer(this._gl.ARRAY_BUFFER, buffers.uv);
                this._gl.bufferData(this._gl.ARRAY_BUFFER, object.uvArray, this._gl.DYNAMIC_DRAW);
                this.state.enableAttribute(programAttributes.uv);
                this._gl.vertexAttribPointer(programAttributes.uv, 2, this._gl.FLOAT, false, 0, 0);
            }
            if (object.hasColors && material.vertexColors !== constants_1.NoColors) {
                this._gl.bindBuffer(this._gl.ARRAY_BUFFER, buffers.color);
                this._gl.bufferData(this._gl.ARRAY_BUFFER, object.colorArray, this._gl.DYNAMIC_DRAW);
                this.state.enableAttribute(programAttributes.color);
                this._gl.vertexAttribPointer(programAttributes.color, 3, this._gl.FLOAT, false, 0, 0);
            }
            this.state.disableUnusedAttributes();
            this._gl.drawArrays(this._gl.TRIANGLES, 0, object.count);
            object.count = 0;
        }
        renderBufferDirect(camera, fog, geometry, material, object, group) {
            let frontFaceCW = (object.isMesh && object.matrixWorld.determinant() < 0);
            this.state.setMaterial(material, frontFaceCW);
            let program = this.setProgram(camera, fog, material, object);
            let geometryProgram = geometry.id + '_' + program.id + '_' + (material.wireframe === true);
            let updateBuffers = false;
            if (geometryProgram !== this._currentGeometryProgram) {
                this._currentGeometryProgram = geometryProgram;
                updateBuffers = true;
            }
            if (object.morphTargetInfluences) {
                this.morphtargets.update(object, geometry, material, program);
                updateBuffers = true;
            }
            let index = geometry.index;
            let position = geometry.this.attributes.position;
            let rangeFactor = 1;
            if (material.wireframe === true) {
                index = this.geometries.getWireframeAttribute(geometry);
                rangeFactor = 2;
            }
            let attribute;
            let renderer = this.bufferRenderer;
            if (index !== null) {
                attribute = this.attributes.get(index);
                renderer = this.indexedBufferRenderer;
                renderer.setIndex(attribute);
            }
            if (updateBuffers) {
                this.setupVertexAttributes(material, program, geometry);
                if (index !== null) {
                    this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, attribute.buffer);
                }
            }
            let dataCount = 0;
            if (index !== null) {
                dataCount = index.count;
            }
            else if (position !== undefined) {
                dataCount = position.count;
            }
            let rangeStart = geometry.drawRange.start * rangeFactor;
            let rangeCount = geometry.drawRange.count * rangeFactor;
            let groupStart = group !== null ? group.start * rangeFactor : 0;
            let groupCount = group !== null ? group.count * rangeFactor : Infinity;
            let drawStart = Math.max(rangeStart, groupStart);
            let drawEnd = Math.min(dataCount, rangeStart + rangeCount, groupStart + groupCount) - 1;
            let drawCount = Math.max(0, drawEnd - drawStart + 1);
            if (drawCount === 0)
                return;
            if (object.isMesh) {
                if (material.wireframe === true) {
                    this.state.setLineWidth(material.wireframeLinewidth * this.getTargetPixelRatio());
                    renderer.setMode(this._gl.LINES);
                }
                else {
                    switch (object.drawMode) {
                        case constants_1.TrianglesDrawMode:
                            renderer.setMode(this._gl.TRIANGLES);
                            break;
                        case constants_1.TriangleStripDrawMode:
                            renderer.setMode(this._gl.TRIANGLE_STRIP);
                            break;
                        case constants_1.TriangleFanDrawMode:
                            renderer.setMode(this._gl.TRIANGLE_FAN);
                            break;
                    }
                }
            }
            else if (object.isLine) {
                let lineWidth = material.linewidth;
                if (lineWidth === undefined)
                    lineWidth = 1;
                this.state.setLineWidth(lineWidth * this.getTargetPixelRatio());
                if (object.isLineSegments) {
                    renderer.setMode(this._gl.LINES);
                }
                else if (object.isLineLoop) {
                    renderer.setMode(this._gl.LINE_LOOP);
                }
                else {
                    renderer.setMode(this._gl.LINE_STRIP);
                }
            }
            else if (object.isPoints) {
                renderer.setMode(this._gl.POINTS);
            }
            if (geometry && geometry.isInstancedBufferGeometry) {
                if (geometry.maxInstancedCount > 0) {
                    renderer.renderInstances(geometry, drawStart, drawCount);
                }
            }
            else {
                renderer.render(drawStart, drawCount);
            }
        }
        setupVertexAttributes(material, program, geometry, startIndex) {
            if (geometry && geometry.isInstancedBufferGeometry) {
                if (this.extensions.get('ANGLE_instanced_arrays') === null) {
                    console.error('THREE.WebGLRenderer.setupVertexAttributes: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.');
                    return;
                }
            }
            if (startIndex === undefined)
                startIndex = 0;
            this.state.initAttributes();
            let geometryAttributes = geometry.this.attributes;
            let programAttributes = program.getAttributes();
            let materialDefaultAttributeValues = material.defaultAttributeValues;
            for (let name in programAttributes) {
                let programAttribute = programAttributes[name];
                if (programAttribute >= 0) {
                    let geometryAttribute = geometryAttributes[name];
                    if (geometryAttribute !== undefined) {
                        let normalized = geometryAttribute.normalized;
                        let size = geometryAttribute.itemSize;
                        let attribute = this.attributes.get(geometryAttribute);
                        if (attribute === undefined)
                            continue;
                        let buffer = attribute.buffer;
                        let type = attribute.type;
                        let bytesPerElement = attribute.bytesPerElement;
                        if (geometryAttribute.isInterleavedBufferAttribute) {
                            let data = geometryAttribute.data;
                            let stride = data.stride;
                            let offset = geometryAttribute.offset;
                            if (data && data.isInstancedInterleavedBuffer) {
                                this.state.enableAttributeAndDivisor(programAttribute, data.meshPerAttribute);
                                if (geometry.maxInstancedCount === undefined) {
                                    geometry.maxInstancedCount = data.meshPerAttribute * data.count;
                                }
                            }
                            else {
                                this.state.enableAttribute(programAttribute);
                            }
                            this._gl.bindBuffer(this._gl.ARRAY_BUFFER, buffer);
                            this._gl.vertexAttribPointer(programAttribute, size, type, normalized, stride * bytesPerElement, (startIndex * stride + offset) * bytesPerElement);
                        }
                        else {
                            if (geometryAttribute.isInstancedBufferAttribute) {
                                this.state.enableAttributeAndDivisor(programAttribute, geometryAttribute.meshPerAttribute);
                                if (geometry.maxInstancedCount === undefined) {
                                    geometry.maxInstancedCount = geometryAttribute.meshPerAttribute * geometryAttribute.count;
                                }
                            }
                            else {
                                this.state.enableAttribute(programAttribute);
                            }
                            this._gl.bindBuffer(this._gl.ARRAY_BUFFER, buffer);
                            this._gl.vertexAttribPointer(programAttribute, size, type, normalized, 0, startIndex * size * bytesPerElement);
                        }
                    }
                    else if (materialDefaultAttributeValues !== undefined) {
                        let value = materialDefaultAttributeValues[name];
                        if (value !== undefined) {
                            switch (value.length) {
                                case 2:
                                    this._gl.vertexAttrib2fv(programAttribute, value);
                                    break;
                                case 3:
                                    this._gl.vertexAttrib3fv(programAttribute, value);
                                    break;
                                case 4:
                                    this._gl.vertexAttrib4fv(programAttribute, value);
                                    break;
                                default:
                                    this._gl.vertexAttrib1fv(programAttribute, value);
                            }
                        }
                    }
                }
            }
            this.state.disableUnusedAttributes();
        }
        compile(scene, camera) {
            this.lightsArray.length = 0;
            this.shadowsArray.length = 0;
            scene.traverse(function (object) {
                if (object.isLight) {
                    this.lightsArray.push(object);
                    if (object.castShadow) {
                        this.shadowsArray.push(object);
                    }
                }
            });
            this.lights.setup(this.lightsArray, this.shadowsArray, camera);
            scene.traverse(function (object) {
                if (object.material) {
                    if (Array.isArray(object.material)) {
                        for (let i = 0; i < object.material.length; i++) {
                            this.initMaterial(object.material[i], scene.fog, object);
                        }
                    }
                    else {
                        this.initMaterial(object.material, scene.fog, object);
                    }
                }
            });
        }
        start() {
            if (this.isAnimating)
                return;
            let device = this.vr.getDevice();
            if (device && device.isPresenting) {
                device.requestAnimationFrame(this.loop);
            }
            else {
                window.requestAnimationFrame(this.loop);
            }
            this.isAnimating = true;
        }
        loop(time) {
            if (this.onAnimationFrame !== null)
                this.onAnimationFrame(time);
            let device = this.vr.getDevice();
            if (device && device.isPresenting) {
                device.requestAnimationFrame(this.loop);
            }
            else {
                window.requestAnimationFrame(this.loop);
            }
        }
        animate(callback) {
            this.onAnimationFrame = callback;
            this.start();
        }
        render(scene, camera, renderTarget, forceClear) {
            if (!(camera && camera.isCamera)) {
                console.error('THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.');
                return;
            }
            if (this._isContextLost)
                return;
            this._currentGeometryProgram = '';
            this._currentMaterialId = -1;
            this._currentCamera = null;
            if (scene.autoUpdate === true)
                scene.updateMatrixWorld();
            if (camera.parent === null)
                camera.updateMatrixWorld();
            if (this.vr.enabled) {
                camera = this.vr.getCamera(camera);
            }
            this._projScreenMatrix.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
            this._frustum.setFromMatrix(this._projScreenMatrix);
            this.lightsArray.length = 0;
            this.shadowsArray.length = 0;
            this.spritesArray.length = 0;
            this.flaresArray.length = 0;
            this._localClippingEnabled = this.localClippingEnabled;
            this._clippingEnabled = this._clipping.init(this.clippingPlanes, this._localClippingEnabled, camera);
            this.currentRenderList = this.renderLists.get(scene, camera);
            this.currentRenderList.init();
            this.projectObject(scene, camera, this.sortObjects);
            if (this.sortObjects === true) {
                this.currentRenderList.sort();
            }
            this.textures.updateVideoTextures();
            if (this._clippingEnabled)
                this._clipping.beginShadows();
            this.shadowMap.render(this.shadowsArray, scene, camera);
            this.lights.setup(this.lightsArray, this.shadowsArray, camera);
            if (this._clippingEnabled)
                this._clipping.endShadows();
            this._infoRender.frame++;
            this._infoRender.calls = 0;
            this._infoRender.vertices = 0;
            this._infoRender.faces = 0;
            this._infoRender.points = 0;
            if (renderTarget === undefined) {
                renderTarget = null;
            }
            this.setRenderTarget(renderTarget);
            this.background.render(this.currentRenderList, scene, camera, forceClear);
            let opaqueObjects = this.currentRenderList.opaque;
            let transparentObjects = this.currentRenderList.transparent;
            if (scene.overrideMaterial) {
                let overrideMaterial = scene.overrideMaterial;
                if (opaqueObjects.length)
                    this.renderObjects(opaqueObjects, scene, camera, overrideMaterial);
                if (transparentObjects.length)
                    this.renderObjects(transparentObjects, scene, camera, overrideMaterial);
            }
            else {
                if (opaqueObjects.length)
                    this.renderObjects(opaqueObjects, scene, camera);
                if (transparentObjects.length)
                    this.renderObjects(transparentObjects, scene, camera);
            }
            this.spriteRenderer.render(this.spritesArray, scene, camera);
            this.flareRenderer.render(this.flaresArray, scene, camera, this._currentViewport);
            if (renderTarget) {
                this.textures.updateRenderTargetMipmap(renderTarget);
            }
            this.state.buffers.depth.setTest(true);
            this.state.buffers.depth.setMask(true);
            this.state.buffers.color.setMask(true);
            this.state.setPolygonOffset(false);
            if (this.vr.enabled) {
                this.vr.submitFrame();
            }
        }
        projectObject(object, camera, sortObjects) {
            if (object.visible === false)
                return;
            let visible = object.layers.test(camera.layers);
            if (visible) {
                if (object.isLight) {
                    this.lightsArray.push(object);
                    if (object.castShadow) {
                        this.shadowsArray.push(object);
                    }
                }
                else if (object.isSprite) {
                    if (!object.frustumCulled || this._frustum.intersectsSprite(object)) {
                        this.spritesArray.push(object);
                    }
                }
                else if (object.isLensFlare) {
                    this.flaresArray.push(object);
                }
                else if (object.isImmediateRenderObject) {
                    if (sortObjects) {
                        this._vector3.setFromMatrixPosition(object.matrixWorld)
                            .applyMatrix4(this._projScreenMatrix);
                    }
                    this.currentRenderList.push(object, null, object.material, this._vector3.z, null);
                }
                else if (object.isMesh || object.isLine || object.isPoints) {
                    if (object.isSkinnedMesh) {
                        object.skeleton.update();
                    }
                    if (!object.frustumCulled || this._frustum.intersectsObject(object)) {
                        if (sortObjects) {
                            this._vector3.setFromMatrixPosition(object.matrixWorld)
                                .applyMatrix4(this._projScreenMatrix);
                        }
                        let geometry = this.objects.update(object);
                        let material = object.material;
                        if (Array.isArray(material)) {
                            let groups = geometry.groups;
                            for (let i = 0, l = groups.length; i < l; i++) {
                                let group = groups[i];
                                let groupMaterial = material[group.materialIndex];
                                if (groupMaterial && groupMaterial.visible) {
                                    this.currentRenderList.push(object, geometry, groupMaterial, this._vector3.z, group);
                                }
                            }
                        }
                        else if (material.visible)
                            this.currentRenderList.push(object, geometry, material, this._vector3.z, null);
                    }
                }
            }
            let children = object.children;
            for (let i = 0, l = children.length; i < l; i++)
                this.projectObject(children[i], camera, sortObjects);
        }
        renderObjects(renderList, scene, camera, overrideMaterial) {
            for (let i = 0, l = renderList.length; i < l; i++) {
                let renderItem = renderList[i];
                let object = renderItem.object;
                let geometry = renderItem.geometry;
                let material = overrideMaterial === undefined ? renderItem.material : overrideMaterial;
                let group = renderItem.group;
                if (camera.isArrayCamera) {
                    this._currentArrayCamera = camera;
                    let cameras = camera.cameras;
                    for (let j = 0, jl = cameras.length; j < jl; j++) {
                        let camera2 = cameras[j];
                        if (object.layers.test(camera2.layers)) {
                            let bounds = camera2.bounds;
                            let x = bounds.x * this._width;
                            let y = bounds.y * this._height;
                            let width = bounds.z * this._width;
                            let height = bounds.w * this._height;
                            this.state.viewport(this._currentViewport.set(x, y, width, height).multiplyScalar(this._pixelRatio));
                            this.renderObject(object, scene, camera2, geometry, material, group);
                        }
                    }
                }
                else {
                    this._currentArrayCamera = null;
                    this.renderObject(object, scene, camera, geometry, material, group);
                }
            }
        }
        renderObject(object, scene, camera, geometry, material, group) {
            object.onBeforeRender(this, scene, camera, geometry, material, group);
            object.modelViewMatrix.multiplyMatrices(camera.matrixWorldInverse, object.matrixWorld);
            object.normalMatrix.getNormalMatrix(object.modelViewMatrix);
            if (object.isImmediateRenderObject) {
                let frontFaceCW = (object.isMesh && object.matrixWorld.determinant() < 0);
                this.state.setMaterial(material, frontFaceCW);
                let program = this.setProgram(camera, scene.fog, material, object);
                this._currentGeometryProgram = '';
                this.renderObjectImmediate(object, program, material);
            }
            else {
                this.renderBufferDirect(camera, scene.fog, geometry, material, object, group);
            }
            object.onAfterRender(this, scene, camera, geometry, material, group);
        }
        initMaterial(material, fog, object) {
            let materialProperties = this.properties.get(material);
            let parameters = this.programCache.getParameters(material, this.lights.this.state, this.shadowsArray, fog, this._clipping.numPlanes, this._clipping.numIntersection, object);
            let code = this.programCache.getProgramCode(material, parameters);
            let program = materialProperties.program;
            let programChange = true;
            if (program === undefined) {
                material.addEventListener('dispose', this.onMaterialDispose);
            }
            else if (program.code !== code) {
                this.releaseMaterialProgramReference(material);
            }
            else if (parameters.shaderID !== undefined) {
                return;
            }
            else {
                programChange = false;
            }
            if (programChange) {
                if (parameters.shaderID) {
                    let shader = ShaderLib_1.ShaderLib[parameters.shaderID];
                    materialProperties.shader = {
                        name: material.type,
                        uniforms: UniformsUtils_1.UniformsUtils.clone(shader.uniforms),
                        vertexShader: shader.vertexShader,
                        fragmentShader: shader.fragmentShader
                    };
                }
                else {
                    materialProperties.shader = {
                        name: material.type,
                        uniforms: material.uniforms,
                        vertexShader: material.vertexShader,
                        fragmentShader: material.fragmentShader
                    };
                }
                material.onBeforeCompile(materialProperties.shader);
                program = this.programCache.acquireProgram(material, materialProperties.shader, parameters, code);
                materialProperties.program = program;
                material.program = program;
            }
            let programAttributes = program.getAttributes();
            if (material.morphTargets) {
                material.numSupportedMorphTargets = 0;
                for (let i = 0; i < this.maxMorphTargets; i++) {
                    if (programAttributes['morphTarget' + i] >= 0) {
                        material.numSupportedMorphTargets++;
                    }
                }
            }
            if (material.morphNormals) {
                material.numSupportedMorphNormals = 0;
                for (let i = 0; i < this.maxMorphNormals; i++) {
                    if (programAttributes['morphNormal' + i] >= 0) {
                        material.numSupportedMorphNormals++;
                    }
                }
            }
            let uniforms = materialProperties.shader.uniforms;
            if (!material.isShaderMaterial &&
                !material.isRawShaderMaterial ||
                material.clipping === true) {
                materialProperties.numClippingPlanes = this._clipping.numPlanes;
                materialProperties.numIntersection = this._clipping.numIntersection;
                uniforms.clippingPlanes = this._clipping.uniform;
            }
            materialProperties.fog = fog;
            materialProperties.lightsHash = this.lights.this.state.hash;
            if (material.this.lights) {
                uniforms.ambientLightColor.value = this.lights.this.state.ambient;
                uniforms.directionalLights.value = this.lights.this.state.directional;
                uniforms.spotLights.value = this.lights.this.state.spot;
                uniforms.rectAreaLights.value = this.lights.this.state.rectArea;
                uniforms.pointLights.value = this.lights.this.state.point;
                uniforms.hemisphereLights.value = this.lights.this.state.hemi;
                uniforms.directionalShadowMap.value = this.lights.this.state.directionalShadowMap;
                uniforms.directionalShadowMatrix.value = this.lights.this.state.directionalShadowMatrix;
                uniforms.spotShadowMap.value = this.lights.this.state.spotShadowMap;
                uniforms.spotShadowMatrix.value = this.lights.this.state.spotShadowMatrix;
                uniforms.pointShadowMap.value = this.lights.this.state.pointShadowMap;
                uniforms.pointShadowMatrix.value = this.lights.this.state.pointShadowMatrix;
            }
            let progUniforms = materialProperties.program.getUniforms(), uniformsList = WebGLUniforms_1.WebGLUniforms.seqWithValue(progUniforms.seq, uniforms);
            materialProperties.uniformsList = uniformsList;
        }
        setProgram(camera, fog, material, object) {
            this._usedTextureUnits = 0;
            let materialProperties = this.properties.get(material);
            if (this._clippingEnabled) {
                if (this._localClippingEnabled || camera !== this._currentCamera) {
                    let useCache = camera === this._currentCamera &&
                        material.id === this._currentMaterialId;
                    this._clipping.setState(material.clippingPlanes, material.clipIntersection, material.clipShadows, camera, materialProperties, useCache);
                }
            }
            if (material.needsUpdate === false) {
                if (materialProperties.program === undefined) {
                    material.needsUpdate = true;
                }
                else if (material.fog && materialProperties.fog !== fog) {
                    material.needsUpdate = true;
                }
                else if (material.this.lights && materialProperties.lightsHash !== this.lights.state.hash) {
                    material.needsUpdate = true;
                }
                else if (materialProperties.numClippingPlanes !== undefined &&
                    (materialProperties.numClippingPlanes !== this._clipping.numPlanes ||
                        materialProperties.numIntersection !== this._clipping.numIntersection)) {
                    material.needsUpdate = true;
                }
            }
            if (material.needsUpdate) {
                this.initMaterial(material, fog, object);
                material.needsUpdate = false;
            }
            let refreshProgram = false;
            let refreshMaterial = false;
            let refreshLights = false;
            let program = materialProperties.program, p_uniforms = program.getUniforms(), m_uniforms = materialProperties.shader.uniforms;
            if (this.state.useProgram(program.program)) {
                refreshProgram = true;
                refreshMaterial = true;
                refreshLights = true;
            }
            if (material.id !== this._currentMaterialId) {
                this._currentMaterialId = material.id;
                refreshMaterial = true;
            }
            if (refreshProgram || camera !== this._currentCamera) {
                p_uniforms.setValue(this._gl, 'projectionMatrix', camera.projectionMatrix);
                if (this.capabilities.logarithmicDepthBuffer) {
                    p_uniforms.setValue(this._gl, 'logDepthBufFC', 2.0 / (Math.log(camera.far + 1.0) / Math.LN2));
                }
                if (this._currentCamera !== (this._currentArrayCamera || camera)) {
                    this._currentCamera = (this._currentArrayCamera || camera);
                    refreshMaterial = true;
                    refreshLights = true;
                }
                if (material.isShaderMaterial ||
                    material.isMeshPhongMaterial ||
                    material.isMeshStandardMaterial ||
                    material.envMap) {
                    let uCamPos = p_uniforms.map.cameraPosition;
                    if (uCamPos !== undefined) {
                        uCamPos.setValue(this._gl, this._vector3.setFromMatrixPosition(camera.matrixWorld));
                    }
                }
                if (material.isMeshPhongMaterial ||
                    material.isMeshLambertMaterial ||
                    material.isMeshBasicMaterial ||
                    material.isMeshStandardMaterial ||
                    material.isShaderMaterial ||
                    material.skinning) {
                    p_uniforms.setValue(this._gl, 'viewMatrix', camera.matrixWorldInverse);
                }
            }
            if (material.skinning) {
                p_uniforms.setOptional(this._gl, object, 'bindMatrix');
                p_uniforms.setOptional(this._gl, object, 'bindMatrixInverse');
                let skeleton = object.skeleton;
                if (skeleton) {
                    let bones = skeleton.bones;
                    if (this.capabilities.floatVertexTextures) {
                        if (skeleton.boneTexture === undefined) {
                            let size = Math.sqrt(bones.length * 4);
                            size = Math_1._Math.ceilPowerOfTwo(size);
                            size = Math.max(size, 4);
                            let boneMatrices = new Float32Array(size * size * 4);
                            boneMatrices.set(skeleton.boneMatrices);
                            let boneTexture = new DataTexture_1.DataTexture(boneMatrices, size, size, constants_1.RGBAFormat, constants_1.FloatType);
                            skeleton.boneMatrices = boneMatrices;
                            skeleton.boneTexture = boneTexture;
                            skeleton.boneTextureSize = size;
                        }
                        p_uniforms.setValue(this._gl, 'boneTexture', skeleton.boneTexture);
                        p_uniforms.setValue(this._gl, 'boneTextureSize', skeleton.boneTextureSize);
                    }
                    else {
                        p_uniforms.setOptional(this._gl, skeleton, 'boneMatrices');
                    }
                }
            }
            if (refreshMaterial) {
                p_uniforms.setValue(this._gl, 'toneMappingExposure', this.toneMappingExposure);
                p_uniforms.setValue(this._gl, 'toneMappingWhitePoint', this.toneMappingWhitePoint);
                if (material.this.lights) {
                    this.markUniformsLightsNeedsUpdate(m_uniforms, refreshLights);
                }
                if (fog && material.fog) {
                    this.refreshUniformsFog(m_uniforms, fog);
                }
                if (material.isMeshBasicMaterial) {
                    this.refreshUniformsCommon(m_uniforms, material);
                }
                else if (material.isMeshLambertMaterial) {
                    this.refreshUniformsCommon(m_uniforms, material);
                    this.refreshUniformsLambert(m_uniforms, material);
                }
                else if (material.isMeshPhongMaterial) {
                    this.refreshUniformsCommon(m_uniforms, material);
                    if (material.isMeshToonMaterial) {
                        this.refreshUniformsToon(m_uniforms, material);
                    }
                    else {
                        this.refreshUniformsPhong(m_uniforms, material);
                    }
                }
                else if (material.isMeshStandardMaterial) {
                    this.refreshUniformsCommon(m_uniforms, material);
                    if (material.isMeshPhysicalMaterial) {
                        this.refreshUniformsPhysical(m_uniforms, material);
                    }
                    else {
                        this.refreshUniformsStandard(m_uniforms, material);
                    }
                }
                else if (material.isMeshDepthMaterial) {
                    this.refreshUniformsCommon(m_uniforms, material);
                    this.refreshUniformsDepth(m_uniforms, material);
                }
                else if (material.isMeshDistanceMaterial) {
                    this.refreshUniformsCommon(m_uniforms, material);
                    this.refreshUniformsDistance(m_uniforms, material);
                }
                else if (material.isMeshNormalMaterial) {
                    this.refreshUniformsCommon(m_uniforms, material);
                    this.refreshUniformsNormal(m_uniforms, material);
                }
                else if (material.isLineBasicMaterial) {
                    this.refreshUniformsLine(m_uniforms, material);
                    if (material.isLineDashedMaterial) {
                        this.refreshUniformsDash(m_uniforms, material);
                    }
                }
                else if (material.isPointsMaterial) {
                    this.refreshUniformsPoints(m_uniforms, material);
                }
                else if (material.isShadowMaterial) {
                    m_uniforms.color.value = material.color;
                    m_uniforms.opacity.value = material.opacity;
                }
                if (m_uniforms.ltcMat !== undefined)
                    m_uniforms.ltcMat.value = UniformsLib_1.UniformsLib.LTC_MAT_TEXTURE;
                if (m_uniforms.ltcMag !== undefined)
                    m_uniforms.ltcMag.value = UniformsLib_1.UniformsLib.LTC_MAG_TEXTURE;
                WebGLUniforms_1.WebGLUniforms.upload(this._gl, materialProperties.uniformsList, m_uniforms, this);
            }
            p_uniforms.setValue(this._gl, 'modelViewMatrix', object.modelViewMatrix);
            p_uniforms.setValue(this._gl, 'normalMatrix', object.normalMatrix);
            p_uniforms.setValue(this._gl, 'modelMatrix', object.matrixWorld);
            return program;
        }
        refreshUniformsCommon(uniforms, material) {
            uniforms.opacity.value = material.opacity;
            if (material.color) {
                uniforms.diffuse.value = material.color;
            }
            if (material.emissive) {
                uniforms.emissive.value.copy(material.emissive).multiplyScalar(material.emissiveIntensity);
            }
            if (material.map) {
                uniforms.map.value = material.map;
            }
            if (material.alphaMap) {
                uniforms.alphaMap.value = material.alphaMap;
            }
            if (material.specularMap) {
                uniforms.specularMap.value = material.specularMap;
            }
            if (material.envMap) {
                uniforms.envMap.value = material.envMap;
                uniforms.flipEnvMap.value = (!(material.envMap && material.envMap.isCubeTexture)) ? 1 : -1;
                uniforms.reflectivity.value = material.reflectivity;
                uniforms.refractionRatio.value = material.refractionRatio;
            }
            if (material.lightMap) {
                uniforms.lightMap.value = material.lightMap;
                uniforms.lightMapIntensity.value = material.lightMapIntensity;
            }
            if (material.aoMap) {
                uniforms.aoMap.value = material.aoMap;
                uniforms.aoMapIntensity.value = material.aoMapIntensity;
            }
            let uvScaleMap;
            if (material.map) {
                uvScaleMap = material.map;
            }
            else if (material.specularMap) {
                uvScaleMap = material.specularMap;
            }
            else if (material.displacementMap) {
                uvScaleMap = material.displacementMap;
            }
            else if (material.normalMap) {
                uvScaleMap = material.normalMap;
            }
            else if (material.bumpMap) {
                uvScaleMap = material.bumpMap;
            }
            else if (material.roughnessMap) {
                uvScaleMap = material.roughnessMap;
            }
            else if (material.metalnessMap) {
                uvScaleMap = material.metalnessMap;
            }
            else if (material.alphaMap) {
                uvScaleMap = material.alphaMap;
            }
            else if (material.emissiveMap) {
                uvScaleMap = material.emissiveMap;
            }
            if (uvScaleMap !== undefined) {
                if (uvScaleMap.isWebGLRenderTarget) {
                    uvScaleMap = uvScaleMap.texture;
                }
                if (uvScaleMap.matrixAutoUpdate === true) {
                    let offset = uvScaleMap.offset;
                    let repeat = uvScaleMap.repeat;
                    let rotation = uvScaleMap.rotation;
                    let center = uvScaleMap.center;
                    uvScaleMap.matrix.setUvTransform(offset.x, offset.y, repeat.x, repeat.y, rotation, center.x, center.y);
                }
                uniforms.uvTransform.value.copy(uvScaleMap.matrix);
            }
        }
        refreshUniformsLine(uniforms, material) {
            uniforms.diffuse.value = material.color;
            uniforms.opacity.value = material.opacity;
        }
        refreshUniformsDash(uniforms, material) {
            uniforms.dashSize.value = material.dashSize;
            uniforms.totalSize.value = material.dashSize + material.gapSize;
            uniforms.scale.value = material.scale;
        }
        refreshUniformsPoints(uniforms, material) {
            uniforms.diffuse.value = material.color;
            uniforms.opacity.value = material.opacity;
            uniforms.size.value = material.size * this._pixelRatio;
            uniforms.scale.value = this._height * 0.5;
            uniforms.map.value = material.map;
            if (material.map !== null) {
                if (material.map.matrixAutoUpdate === true) {
                    let offset = material.map.offset;
                    let repeat = material.map.repeat;
                    let rotation = material.map.rotation;
                    let center = material.map.center;
                    material.map.matrix.setUvTransform(offset.x, offset.y, repeat.x, repeat.y, rotation, center.x, center.y);
                }
                uniforms.uvTransform.value.copy(material.map.matrix);
            }
        }
        refreshUniformsFog(uniforms, fog) {
            uniforms.fogColor.value = fog.color;
            if (fog.isFog) {
                uniforms.fogNear.value = fog.near;
                uniforms.fogFar.value = fog.far;
            }
            else if (fog.isFogExp2) {
                uniforms.fogDensity.value = fog.density;
            }
        }
        refreshUniformsLambert(uniforms, material) {
            if (material.emissiveMap) {
                uniforms.emissiveMap.value = material.emissiveMap;
            }
        }
        refreshUniformsPhong(uniforms, material) {
            uniforms.specular.value = material.specular;
            uniforms.shininess.value = Math.max(material.shininess, 1e-4);
            if (material.emissiveMap) {
                uniforms.emissiveMap.value = material.emissiveMap;
            }
            if (material.bumpMap) {
                uniforms.bumpMap.value = material.bumpMap;
                uniforms.bumpScale.value = material.bumpScale;
            }
            if (material.normalMap) {
                uniforms.normalMap.value = material.normalMap;
                uniforms.normalScale.value.copy(material.normalScale);
            }
            if (material.displacementMap) {
                uniforms.displacementMap.value = material.displacementMap;
                uniforms.displacementScale.value = material.displacementScale;
                uniforms.displacementBias.value = material.displacementBias;
            }
        }
        refreshUniformsToon(uniforms, material) {
            this.refreshUniformsPhong(uniforms, material);
            if (material.gradientMap) {
                uniforms.gradientMap.value = material.gradientMap;
            }
        }
        refreshUniformsStandard(uniforms, material) {
            uniforms.roughness.value = material.roughness;
            uniforms.metalness.value = material.metalness;
            if (material.roughnessMap) {
                uniforms.roughnessMap.value = material.roughnessMap;
            }
            if (material.metalnessMap) {
                uniforms.metalnessMap.value = material.metalnessMap;
            }
            if (material.emissiveMap) {
                uniforms.emissiveMap.value = material.emissiveMap;
            }
            if (material.bumpMap) {
                uniforms.bumpMap.value = material.bumpMap;
                uniforms.bumpScale.value = material.bumpScale;
            }
            if (material.normalMap) {
                uniforms.normalMap.value = material.normalMap;
                uniforms.normalScale.value.copy(material.normalScale);
            }
            if (material.displacementMap) {
                uniforms.displacementMap.value = material.displacementMap;
                uniforms.displacementScale.value = material.displacementScale;
                uniforms.displacementBias.value = material.displacementBias;
            }
            if (material.envMap) {
                uniforms.envMapIntensity.value = material.envMapIntensity;
            }
        }
        refreshUniformsPhysical(uniforms, material) {
            uniforms.clearCoat.value = material.clearCoat;
            uniforms.clearCoatRoughness.value = material.clearCoatRoughness;
            this.refreshUniformsStandard(uniforms, material);
        }
        refreshUniformsDepth(uniforms, material) {
            if (material.displacementMap) {
                uniforms.displacementMap.value = material.displacementMap;
                uniforms.displacementScale.value = material.displacementScale;
                uniforms.displacementBias.value = material.displacementBias;
            }
        }
        refreshUniformsDistance(uniforms, material) {
            if (material.displacementMap) {
                uniforms.displacementMap.value = material.displacementMap;
                uniforms.displacementScale.value = material.displacementScale;
                uniforms.displacementBias.value = material.displacementBias;
            }
            uniforms.referencePosition.value.copy(material.referencePosition);
            uniforms.nearDistance.value = material.nearDistance;
            uniforms.farDistance.value = material.farDistance;
        }
        refreshUniformsNormal(uniforms, material) {
            if (material.bumpMap) {
                uniforms.bumpMap.value = material.bumpMap;
                uniforms.bumpScale.value = material.bumpScale;
            }
            if (material.normalMap) {
                uniforms.normalMap.value = material.normalMap;
                uniforms.normalScale.value.copy(material.normalScale);
            }
            if (material.displacementMap) {
                uniforms.displacementMap.value = material.displacementMap;
                uniforms.displacementScale.value = material.displacementScale;
                uniforms.displacementBias.value = material.displacementBias;
            }
        }
        markUniformsLightsNeedsUpdate(uniforms, value) {
            uniforms.ambientLightColor.needsUpdate = value;
            uniforms.directionalLights.needsUpdate = value;
            uniforms.pointLights.needsUpdate = value;
            uniforms.spotLights.needsUpdate = value;
            uniforms.rectAreaLights.needsUpdate = value;
            uniforms.hemisphereLights.needsUpdate = value;
        }
        setFaceCulling(cullFace, frontFaceDirection) {
            this.state.setCullFace(cullFace);
            this.state.setFlipSided(frontFaceDirection === constants_1.FrontFaceDirectionCW);
        }
        allocTextureUnit() {
            let textureUnit = this._usedTextureUnits;
            if (textureUnit >= this.capabilities.maxTextures) {
                console.warn('THREE.WebGLRenderer: Trying to use ' + textureUnit + ' texture units while this GPU supports only ' + this.capabilities.maxTextures);
            }
            this._usedTextureUnits += 1;
            return textureUnit;
        }
        setTexture2D(texture, slot) {
            let warned = false;
            if (texture && texture.isWebGLRenderTarget) {
                if (!warned) {
                    console.warn("THREE.WebGLRenderer.setTexture2D: don't use render targets as this.textures. Use their .texture property instead.");
                    warned = true;
                }
                texture = texture.texture;
            }
            this.textures.setTexture2D(texture, slot);
        }
        setTexture(texture, slot) {
            let warned = false;
            if (!warned) {
                console.warn("THREE.WebGLRenderer: .setTexture is deprecated, use setTexture2D instead.");
                warned = true;
            }
            this.textures.setTexture2D(texture, slot);
        }
        setTextureCube(texture, slot) {
            let warned = false;
            if (texture && texture.isWebGLRenderTargetCube) {
                if (!warned) {
                    console.warn("THREE.WebGLRenderer.setTextureCube: don't use cube render targets as this.textures. Use their .texture property instead.");
                    warned = true;
                }
                texture = texture.texture;
            }
            if ((texture && texture.isCubeTexture) ||
                (Array.isArray(texture.image) && texture.image.length === 6)) {
                this.textures.setTextureCube(texture, slot);
            }
            else {
                this.textures.setTextureCubeDynamic(texture, slot);
            }
        }
        getRenderTarget() {
            return this._currentRenderTarget;
        }
        setRenderTarget(renderTarget) {
            this._currentRenderTarget = renderTarget;
            if (renderTarget && this.properties.get(renderTarget).__webglFramebuffer === undefined) {
                this.textures.setupRenderTarget(renderTarget);
            }
            let framebuffer = null;
            let isCube = false;
            if (renderTarget) {
                let __webglFramebuffer = this.properties.get(renderTarget).__webglFramebuffer;
                if (renderTarget.isWebGLRenderTargetCube) {
                    framebuffer = __webglFramebuffer[renderTarget.activeCubeFace];
                    isCube = true;
                }
                else {
                    framebuffer = __webglFramebuffer;
                }
                this._currentViewport.copy(renderTarget.viewport);
                this._currentScissor.copy(renderTarget.scissor);
                this._currentScissorTest = renderTarget.scissorTest;
            }
            else {
                this._currentViewport.copy(this._viewport).multiplyScalar(this._pixelRatio);
                this._currentScissor.copy(this._scissor).multiplyScalar(this._pixelRatio);
                this._currentScissorTest = this._scissorTest;
            }
            if (this._currentFramebuffer !== framebuffer) {
                this._gl.bindFramebuffer(this._gl.FRAMEBUFFER, framebuffer);
                this._currentFramebuffer = framebuffer;
            }
            this.state.viewport(this._currentViewport);
            this.state.scissor(this._currentScissor);
            this.state.setScissorTest(this._currentScissorTest);
            if (isCube) {
                let textureProperties = this.properties.get(renderTarget.texture);
                this._gl.framebufferTexture2D(this._gl.FRAMEBUFFER, this._gl.COLOR_ATTACHMENT0, this._gl.TEXTURE_CUBE_MAP_POSITIVE_X + renderTarget.activeCubeFace, textureProperties.__webglTexture, renderTarget.activeMipMapLevel);
            }
        }
        readRenderTargetPixels(renderTarget, x, y, width, height, buffer) {
            if (!(renderTarget && renderTarget.isWebGLRenderTarget)) {
                console.error('THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.');
                return;
            }
            let framebuffer = this.properties.get(renderTarget).__webglFramebuffer;
            if (framebuffer) {
                let restore = false;
                if (framebuffer !== this._currentFramebuffer) {
                    this._gl.bindFramebuffer(this._gl.FRAMEBUFFER, framebuffer);
                    restore = true;
                }
                try {
                    let texture = renderTarget.texture;
                    let textureFormat = texture.format;
                    let textureType = texture.type;
                    if (textureFormat !== constants_1.RGBAFormat && this.utils.convert(textureFormat) !== this._gl.getParameter(this._gl.IMPLEMENTATION_COLOR_READ_FORMAT)) {
                        console.error('THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.');
                        return;
                    }
                    if (textureType !== constants_1.UnsignedByteType && this.utils.convert(textureType) !== this._gl.getParameter(this._gl.IMPLEMENTATION_COLOR_READ_TYPE) &&
                        !(textureType === constants_1.FloatType && (this.extensions.get('OES_texture_float') || this.extensions.get('WEBGL_color_buffer_float'))) &&
                        !(textureType === constants_1.HalfFloatType && this.extensions.get('EXT_color_buffer_half_float'))) {
                        console.error('THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.');
                        return;
                    }
                    if (this._gl.checkFramebufferStatus(this._gl.FRAMEBUFFER) === this._gl.FRAMEBUFFER_COMPLETE) {
                        if ((x >= 0 && x <= (renderTarget.width - width)) && (y >= 0 && y <= (renderTarget.height - height))) {
                            this._gl.readPixels(x, y, width, height, this.utils.convert(textureFormat), this.utils.convert(textureType), buffer);
                        }
                    }
                    else
                        console.error('THREE.WebGLRenderer.readRenderTargetPixels: readPixels from renderTarget failed. Framebuffer not complete.');
                }
                finally {
                    if (restore)
                        this._gl.bindFramebuffer(this._gl.FRAMEBUFFER, this._currentFramebuffer);
                }
            }
        }
    }
    exports.WebGLRenderer = WebGLRenderer;
});
//# sourceMappingURL=WebGLRenderer.js.map