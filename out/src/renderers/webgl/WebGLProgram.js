define(["require", "exports", "./WebGLUniforms.js", "./WebGLShader.js", "../shaders/ShaderChunk.js", "../../constants.js"], function (require, exports, WebGLUniforms_js_1, WebGLShader_js_1, ShaderChunk_js_1, constants_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var programIdCount = 0;
    function getEncodingComponents(encoding) {
        switch (encoding) {
            case constants_js_1.LinearEncoding:
                return ['Linear', '( value )'];
            case constants_js_1.sRGBEncoding:
                return ['sRGB', '( value )'];
            case constants_js_1.RGBEEncoding:
                return ['RGBE', '( value )'];
            case constants_js_1.RGBM7Encoding:
                return ['RGBM', '( value, 7.0 )'];
            case constants_js_1.RGBM16Encoding:
                return ['RGBM', '( value, 16.0 )'];
            case constants_js_1.RGBDEncoding:
                return ['RGBD', '( value, 256.0 )'];
            case constants_js_1.GammaEncoding:
                return ['Gamma', '( value, float( GAMMA_FACTOR ) )'];
            default:
                throw new Error('unsupported encoding: ' + encoding);
        }
    }
    function getTexelDecodingFunction(functionName, encoding) {
        var components = getEncodingComponents(encoding);
        return 'vec4 ' + functionName + '( vec4 value ) { return ' + components[0] + 'ToLinear' + components[1] + '; }';
    }
    function getTexelEncodingFunction(functionName, encoding) {
        var components = getEncodingComponents(encoding);
        return 'vec4 ' + functionName + '( vec4 value ) { return LinearTo' + components[0] + components[1] + '; }';
    }
    function getToneMappingFunction(functionName, toneMapping) {
        var toneMappingName;
        switch (toneMapping) {
            case constants_js_1.LinearToneMapping:
                toneMappingName = 'Linear';
                break;
            case constants_js_1.ReinhardToneMapping:
                toneMappingName = 'Reinhard';
                break;
            case constants_js_1.Uncharted2ToneMapping:
                toneMappingName = 'Uncharted2';
                break;
            case constants_js_1.CineonToneMapping:
                toneMappingName = 'OptimizedCineon';
                break;
            default:
                throw new Error('unsupported toneMapping: ' + toneMapping);
        }
        return 'vec3 ' + functionName + '( vec3 color ) { return ' + toneMappingName + 'ToneMapping( color ); }';
    }
    function generateExtensions(extensions, parameters, rendererExtensions) {
        extensions = extensions || {};
        var chunks = [
            (extensions.derivatives || parameters.envMapCubeUV || parameters.bumpMap || parameters.normalMap || parameters.flatShading) ? '#extension GL_OES_standard_derivatives : enable' : '',
            (extensions.fragDepth || parameters.logarithmicDepthBuffer) && rendererExtensions.get('EXT_frag_depth') ? '#extension GL_EXT_frag_depth : enable' : '',
            (extensions.drawBuffers) && rendererExtensions.get('WEBGL_draw_buffers') ? '#extension GL_EXT_draw_buffers : require' : '',
            (extensions.shaderTextureLOD || parameters.envMap) && rendererExtensions.get('EXT_shader_texture_lod') ? '#extension GL_EXT_shader_texture_lod : enable' : ''
        ];
        return chunks.filter(filterEmptyLine).join('\n');
    }
    function generateDefines(defines) {
        var chunks = [];
        for (var name in defines) {
            var value = defines[name];
            if (value === false)
                continue;
            chunks.push('#define ' + name + ' ' + value);
        }
        return chunks.join('\n');
    }
    function fetchAttributeLocations(gl, program) {
        var attributes = {};
        var n = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);
        for (var i = 0; i < n; i++) {
            var info = gl.getActiveAttrib(program, i);
            var name = info.name;
            attributes[name] = gl.getAttribLocation(program, name);
        }
        return attributes;
    }
    function filterEmptyLine(string) {
        return string !== '';
    }
    function replaceLightNums(string, parameters) {
        return string
            .replace(/NUM_DIR_LIGHTS/g, parameters.numDirLights)
            .replace(/NUM_SPOT_LIGHTS/g, parameters.numSpotLights)
            .replace(/NUM_RECT_AREA_LIGHTS/g, parameters.numRectAreaLights)
            .replace(/NUM_POINT_LIGHTS/g, parameters.numPointLights)
            .replace(/NUM_HEMI_LIGHTS/g, parameters.numHemiLights);
    }
    function parseIncludes(string) {
        var pattern = /^[ \t]*#include +<([\w\d.]+)>/gm;
        function replace(match, include) {
            var replace = ShaderChunk_js_1.ShaderChunk[include];
            if (replace === undefined) {
                throw new Error('Can not resolve #include <' + include + '>');
            }
            return parseIncludes(replace);
        }
        return string.replace(pattern, replace);
    }
    function unrollLoops(string) {
        var pattern = /for \( int i \= (\d+)\; i < (\d+)\; i \+\+ \) \{([\s\S]+?)(?=\})\}/g;
        function replace(match, start, end, snippet) {
            var unroll = '';
            for (var i = parseInt(start); i < parseInt(end); i++) {
                unroll += snippet.replace(/\[ i \]/g, '[ ' + i + ' ]');
            }
            return unroll;
        }
        return string.replace(pattern, replace);
    }
    class WebGLProgram {
        constructor(renderer, extensions, code, material, shader, parameters) {
            this.gl = renderer.context;
            var defines = material.defines;
            var vertexShader = shader.vertexShader;
            var fragmentShader = shader.fragmentShader;
            var shadowMapTypeDefine = 'SHADOWMAP_TYPE_BASIC';
            if (parameters.shadowMapType === constants_js_1.PCFShadowMap) {
                shadowMapTypeDefine = 'SHADOWMAP_TYPE_PCF';
            }
            else if (parameters.shadowMapType === constants_js_1.PCFSoftShadowMap) {
                shadowMapTypeDefine = 'SHADOWMAP_TYPE_PCF_SOFT';
            }
            var envMapTypeDefine = 'ENVMAP_TYPE_CUBE';
            var envMapModeDefine = 'ENVMAP_MODE_REFLECTION';
            var envMapBlendingDefine = 'ENVMAP_BLENDING_MULTIPLY';
            if (parameters.envMap) {
                switch (material.envMap.mapping) {
                    case constants_js_1.CubeReflectionMapping:
                    case constants_js_1.CubeRefractionMapping:
                        envMapTypeDefine = 'ENVMAP_TYPE_CUBE';
                        break;
                    case constants_js_1.CubeUVReflectionMapping:
                    case constants_js_1.CubeUVRefractionMapping:
                        envMapTypeDefine = 'ENVMAP_TYPE_CUBE_UV';
                        break;
                    case constants_js_1.EquirectangularReflectionMapping:
                    case constants_js_1.EquirectangularRefractionMapping:
                        envMapTypeDefine = 'ENVMAP_TYPE_EQUIREC';
                        break;
                    case constants_js_1.SphericalReflectionMapping:
                        envMapTypeDefine = 'ENVMAP_TYPE_SPHERE';
                        break;
                }
                switch (material.envMap.mapping) {
                    case constants_js_1.CubeRefractionMapping:
                    case constants_js_1.EquirectangularRefractionMapping:
                        envMapModeDefine = 'ENVMAP_MODE_REFRACTION';
                        break;
                }
                switch (material.combine) {
                    case constants_js_1.MultiplyOperation:
                        envMapBlendingDefine = 'ENVMAP_BLENDING_MULTIPLY';
                        break;
                    case constants_js_1.MixOperation:
                        envMapBlendingDefine = 'ENVMAP_BLENDING_MIX';
                        break;
                    case constants_js_1.AddOperation:
                        envMapBlendingDefine = 'ENVMAP_BLENDING_ADD';
                        break;
                }
            }
            var gammaFactorDefine = (renderer.gammaFactor > 0) ? renderer.gammaFactor : 1.0;
            var customExtensions = generateExtensions(material.extensions, parameters, extensions);
            var customDefines = generateDefines(defines);
            var program = this.gl.createProgram();
            var prefixVertex, prefixFragment;
            if (material.isRawShaderMaterial) {
                prefixVertex = [
                    customDefines
                ].filter(filterEmptyLine).join('\n');
                if (prefixVertex.length > 0) {
                    prefixVertex += '\n';
                }
                prefixFragment = [
                    customExtensions,
                    customDefines
                ].filter(filterEmptyLine).join('\n');
                if (prefixFragment.length > 0) {
                    prefixFragment += '\n';
                }
            }
            else {
                prefixVertex = [
                    'precision ' + parameters.precision + ' float;',
                    'precision ' + parameters.precision + ' int;',
                    '#define SHADER_NAME ' + shader.name,
                    customDefines,
                    parameters.supportsVertexTextures ? '#define VERTEX_TEXTURES' : '',
                    '#define GAMMA_FACTOR ' + gammaFactorDefine,
                    '#define MAX_BONES ' + parameters.maxBones,
                    (parameters.useFog && parameters.fog) ? '#define USE_FOG' : '',
                    (parameters.useFog && parameters.fogExp) ? '#define FOG_EXP2' : '',
                    parameters.map ? '#define USE_MAP' : '',
                    parameters.envMap ? '#define USE_ENVMAP' : '',
                    parameters.envMap ? '#define ' + envMapModeDefine : '',
                    parameters.lightMap ? '#define USE_LIGHTMAP' : '',
                    parameters.aoMap ? '#define USE_AOMAP' : '',
                    parameters.emissiveMap ? '#define USE_EMISSIVEMAP' : '',
                    parameters.bumpMap ? '#define USE_BUMPMAP' : '',
                    parameters.normalMap ? '#define USE_NORMALMAP' : '',
                    parameters.displacementMap && parameters.supportsVertexTextures ? '#define USE_DISPLACEMENTMAP' : '',
                    parameters.specularMap ? '#define USE_SPECULARMAP' : '',
                    parameters.roughnessMap ? '#define USE_ROUGHNESSMAP' : '',
                    parameters.metalnessMap ? '#define USE_METALNESSMAP' : '',
                    parameters.alphaMap ? '#define USE_ALPHAMAP' : '',
                    parameters.vertexColors ? '#define USE_COLOR' : '',
                    parameters.flatShading ? '#define FLAT_SHADED' : '',
                    parameters.skinning ? '#define USE_SKINNING' : '',
                    parameters.useVertexTexture ? '#define BONE_TEXTURE' : '',
                    parameters.morphTargets ? '#define USE_MORPHTARGETS' : '',
                    parameters.morphNormals && parameters.flatShading === false ? '#define USE_MORPHNORMALS' : '',
                    parameters.doubleSided ? '#define DOUBLE_SIDED' : '',
                    parameters.flipSided ? '#define FLIP_SIDED' : '',
                    '#define NUM_CLIPPING_PLANES ' + parameters.numClippingPlanes,
                    parameters.shadowMapEnabled ? '#define USE_SHADOWMAP' : '',
                    parameters.shadowMapEnabled ? '#define ' + shadowMapTypeDefine : '',
                    parameters.sizeAttenuation ? '#define USE_SIZEATTENUATION' : '',
                    parameters.logarithmicDepthBuffer ? '#define USE_LOGDEPTHBUF' : '',
                    parameters.logarithmicDepthBuffer && extensions.get('EXT_frag_depth') ? '#define USE_LOGDEPTHBUF_EXT' : '',
                    'uniform mat4 modelMatrix;',
                    'uniform mat4 modelViewMatrix;',
                    'uniform mat4 projectionMatrix;',
                    'uniform mat4 viewMatrix;',
                    'uniform mat3 normalMatrix;',
                    'uniform vec3 cameraPosition;',
                    'attribute vec3 position;',
                    'attribute vec3 normal;',
                    'attribute vec2 uv;',
                    '#ifdef USE_COLOR',
                    '	attribute vec3 color;',
                    '#endif',
                    '#ifdef USE_MORPHTARGETS',
                    '	attribute vec3 morphTarget0;',
                    '	attribute vec3 morphTarget1;',
                    '	attribute vec3 morphTarget2;',
                    '	attribute vec3 morphTarget3;',
                    '	#ifdef USE_MORPHNORMALS',
                    '		attribute vec3 morphNormal0;',
                    '		attribute vec3 morphNormal1;',
                    '		attribute vec3 morphNormal2;',
                    '		attribute vec3 morphNormal3;',
                    '	#else',
                    '		attribute vec3 morphTarget4;',
                    '		attribute vec3 morphTarget5;',
                    '		attribute vec3 morphTarget6;',
                    '		attribute vec3 morphTarget7;',
                    '	#endif',
                    '#endif',
                    '#ifdef USE_SKINNING',
                    '	attribute vec4 skinIndex;',
                    '	attribute vec4 skinWeight;',
                    '#endif',
                    '\n'
                ].filter(filterEmptyLine).join('\n');
                prefixFragment = [
                    customExtensions,
                    'precision ' + parameters.precision + ' float;',
                    'precision ' + parameters.precision + ' int;',
                    '#define SHADER_NAME ' + shader.name,
                    customDefines,
                    parameters.alphaTest ? '#define ALPHATEST ' + parameters.alphaTest : '',
                    '#define GAMMA_FACTOR ' + gammaFactorDefine,
                    (parameters.useFog && parameters.fog) ? '#define USE_FOG' : '',
                    (parameters.useFog && parameters.fogExp) ? '#define FOG_EXP2' : '',
                    parameters.map ? '#define USE_MAP' : '',
                    parameters.envMap ? '#define USE_ENVMAP' : '',
                    parameters.envMap ? '#define ' + envMapTypeDefine : '',
                    parameters.envMap ? '#define ' + envMapModeDefine : '',
                    parameters.envMap ? '#define ' + envMapBlendingDefine : '',
                    parameters.lightMap ? '#define USE_LIGHTMAP' : '',
                    parameters.aoMap ? '#define USE_AOMAP' : '',
                    parameters.emissiveMap ? '#define USE_EMISSIVEMAP' : '',
                    parameters.bumpMap ? '#define USE_BUMPMAP' : '',
                    parameters.normalMap ? '#define USE_NORMALMAP' : '',
                    parameters.specularMap ? '#define USE_SPECULARMAP' : '',
                    parameters.roughnessMap ? '#define USE_ROUGHNESSMAP' : '',
                    parameters.metalnessMap ? '#define USE_METALNESSMAP' : '',
                    parameters.alphaMap ? '#define USE_ALPHAMAP' : '',
                    parameters.vertexColors ? '#define USE_COLOR' : '',
                    parameters.gradientMap ? '#define USE_GRADIENTMAP' : '',
                    parameters.flatShading ? '#define FLAT_SHADED' : '',
                    parameters.doubleSided ? '#define DOUBLE_SIDED' : '',
                    parameters.flipSided ? '#define FLIP_SIDED' : '',
                    '#define NUM_CLIPPING_PLANES ' + parameters.numClippingPlanes,
                    '#define UNION_CLIPPING_PLANES ' + (parameters.numClippingPlanes - parameters.numClipIntersection),
                    parameters.shadowMapEnabled ? '#define USE_SHADOWMAP' : '',
                    parameters.shadowMapEnabled ? '#define ' + shadowMapTypeDefine : '',
                    parameters.premultipliedAlpha ? '#define PREMULTIPLIED_ALPHA' : '',
                    parameters.physicallyCorrectLights ? '#define PHYSICALLY_CORRECT_LIGHTS' : '',
                    parameters.logarithmicDepthBuffer ? '#define USE_LOGDEPTHBUF' : '',
                    parameters.logarithmicDepthBuffer && extensions.get('EXT_frag_depth') ? '#define USE_LOGDEPTHBUF_EXT' : '',
                    parameters.envMap && extensions.get('EXT_shader_texture_lod') ? '#define TEXTURE_LOD_EXT' : '',
                    'uniform mat4 viewMatrix;',
                    'uniform vec3 cameraPosition;',
                    (parameters.toneMapping !== constants_js_1.NoToneMapping) ? '#define TONE_MAPPING' : '',
                    (parameters.toneMapping !== constants_js_1.NoToneMapping) ? ShaderChunk_js_1.ShaderChunk['tonemapping_pars_fragment'] : '',
                    (parameters.toneMapping !== constants_js_1.NoToneMapping) ? getToneMappingFunction('toneMapping', parameters.toneMapping) : '',
                    parameters.dithering ? '#define DITHERING' : '',
                    (parameters.outputEncoding || parameters.mapEncoding || parameters.envMapEncoding || parameters.emissiveMapEncoding) ? ShaderChunk_js_1.ShaderChunk['encodings_pars_fragment'] : '',
                    parameters.mapEncoding ? getTexelDecodingFunction('mapTexelToLinear', parameters.mapEncoding) : '',
                    parameters.envMapEncoding ? getTexelDecodingFunction('envMapTexelToLinear', parameters.envMapEncoding) : '',
                    parameters.emissiveMapEncoding ? getTexelDecodingFunction('emissiveMapTexelToLinear', parameters.emissiveMapEncoding) : '',
                    parameters.outputEncoding ? getTexelEncodingFunction('linearToOutputTexel', parameters.outputEncoding) : '',
                    parameters.depthPacking ? '#define DEPTH_PACKING ' + material.depthPacking : '',
                    '\n'
                ].filter(filterEmptyLine).join('\n');
            }
            vertexShader = parseIncludes(vertexShader);
            vertexShader = replaceLightNums(vertexShader, parameters);
            fragmentShader = parseIncludes(fragmentShader);
            fragmentShader = replaceLightNums(fragmentShader, parameters);
            if (!material.isShaderMaterial) {
                vertexShader = unrollLoops(vertexShader);
                fragmentShader = unrollLoops(fragmentShader);
            }
            var vertexGlsl = prefixVertex + vertexShader;
            var fragmentGlsl = prefixFragment + fragmentShader;
            var glVertexShader = WebGLShader_js_1.WebGLShader(this.gl, this.gl.VERTEX_SHADER, vertexGlsl);
            var glFragmentShader = WebGLShader_js_1.WebGLShader(this.gl, this.gl.FRAGMENT_SHADER, fragmentGlsl);
            this.gl.attachShader(program, glVertexShader);
            this.gl.attachShader(program, glFragmentShader);
            if (material.index0AttributeName !== undefined) {
                this.gl.bindAttribLocation(program, 0, material.index0AttributeName);
            }
            else if (parameters.morphTargets === true) {
                this.gl.bindAttribLocation(program, 0, 'position');
            }
            this.gl.linkProgram(program);
            var programLog = this.gl.getProgramInfoLog(program);
            var vertexLog = this.gl.getShaderInfoLog(glVertexShader);
            var fragmentLog = this.gl.getShaderInfoLog(glFragmentShader);
            var runnable = true;
            var haveDiagnostics = true;
            if (this.gl.getProgramParameter(program, this.gl.LINK_STATUS) === false) {
                runnable = false;
                console.error('THREE.WebGLProgram: shader error: ', this.gl.getError(), 'gl.VALIDATE_STATUS', this.gl.getProgramParameter(program, this.gl.VALIDATE_STATUS), 'gl.getProgramInfoLog', programLog, vertexLog, fragmentLog);
            }
            else if (programLog !== '') {
                console.warn('THREE.WebGLProgram: gl.getProgramInfoLog()', programLog);
            }
            else if (vertexLog === '' || fragmentLog === '')
                haveDiagnostics = false;
            if (haveDiagnostics) {
                this.diagnostics = {
                    runnable: runnable,
                    material: material,
                    programLog: programLog,
                    vertexShader: {
                        log: vertexLog,
                        prefix: prefixVertex
                    },
                    fragmentShader: {
                        log: fragmentLog,
                        prefix: prefixFragment
                    }
                };
            }
            this.gl.deleteShader(glVertexShader);
            this.gl.deleteShader(glFragmentShader);
            var cachedUniforms;
            var cachedAttributes;
            this.id = programIdCount++;
            this.code = code;
            this.usedTimes = 1;
            this.program = program;
            this.vertexShader = glVertexShader;
            this.fragmentShader = glFragmentShader;
            return this;
        }
        getUniforms() {
            if (this.cachedUniforms === undefined)
                this.cachedUniforms = new WebGLUniforms_js_1.WebGLUniforms(this.gl, this.program, this.renderer);
            return this.cachedUniforms;
        }
        getAttributes() {
            if (this.cachedAttributes === undefined)
                this.cachedAttributes = fetchAttributeLocations(this.gl, this.program);
            return this.cachedAttributes;
        }
        destroy() {
            this.gl.deleteProgram(this.program);
            this.program = undefined;
        }
        get uniforms() {
            console.warn('THREE.WebGLProgram: .uniforms is now .getUniforms().');
            return this.getUniforms();
        }
        get attributes() {
            console.warn('THREE.WebGLProgram: .attributes is now .getAttributes().');
            return this.getAttributes();
        }
    }
    exports.WebGLProgram = WebGLProgram;
});
//# sourceMappingURL=WebGLProgram.js.map