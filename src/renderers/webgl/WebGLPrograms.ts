/**
 * @author mrdoob / http://mrdoob.com/
 */

import * as Constant from '../../constants.js';
import { TWebGLProgram } from './WebGLProgram.js';
import { WebGLRenderer } from '../WebGLRenderer';
import { WebGLExtensions } from './WebGLExtensions';
import { WebGLCapabilities } from './WebGLCapabilities';
import { Object3D } from '../../core/Object3D';

class WebGLPrograms
{
    renderer: WebGLRenderer;
    extensions: WebGLExtensions;
    capabilities: WebGLCapabilities;
    programs: TWebGLProgram[];

    shaderIDs;
    parameterNames: string[];

    constructor( renderer: WebGLRenderer, extensions: WebGLExtensions, capabilities: WebGLCapabilities )
    {
        this.renderer = renderer;
        this.extensions = extensions;
        this.capabilities = capabilities;

        this.programs = [];

        this.shaderIDs = {
            MeshDepthMaterial: 'depth',
            MeshDistanceMaterial: 'distanceRGBA',
            MeshNormalMaterial: 'normal',
            MeshBasicMaterial: 'basic',
            MeshLambertMaterial: 'lambert',
            MeshPhongMaterial: 'phong',
            MeshToonMaterial: 'phong',
            MeshStandardMaterial: 'physical',
            MeshPhysicalMaterial: 'physical',
            LineBasicMaterial: 'basic',
            LineDashedMaterial: 'dashed',
            PointsMaterial: 'points',
            ShadowMaterial: 'shadow'
        };

        this.parameterNames = [
            "precision", "supportsVertexTextures", "map", "mapEncoding", "envMap", "envMapMode", "envMapEncoding",
            "lightMap", "aoMap", "emissiveMap", "emissiveMapEncoding", "bumpMap", "normalMap", "displacementMap", "specularMap",
            "roughnessMap", "metalnessMap", "gradientMap",
            "alphaMap", "combine", "vertexColors", "fog", "useFog", "fogExp",
            "flatShading", "sizeAttenuation", "logarithmicDepthBuffer", "skinning",
            "maxBones", "useVertexTexture", "morphTargets", "morphNormals",
            "maxMorphTargets", "maxMorphNormals", "premultipliedAlpha",
            "numDirLights", "numPointLights", "numSpotLights", "numHemiLights", "numRectAreaLights",
            "shadowMapEnabled", "shadowMapType", "toneMapping", 'physicallyCorrectLights',
            "alphaTest", "doubleSided", "flipSided", "numClippingPlanes", "numClipIntersection", "depthPacking", "dithering"
        ];

    }

    allocateBones( object ): number
    {
        let skeleton = object.skeleton;
        let bones = skeleton.bones;

        if ( this.capabilities.floatVertexTextures )
            return 1024;
        else
        {
            // default for when object is not specified
            // ( for example when prebuilding shader to be used with multiple objects )
            //
            //  - leave some extra space for other uniforms
            //  - limit here is ANGLE's 254 max uniform vectors
            //    (up to 54 should be safe)
            let nVertexUniforms = this.capabilities.maxVertexUniforms;
            let nVertexMatrices = Math.floor( ( nVertexUniforms - 20 ) / 4 );
            let maxBones = Math.min( nVertexMatrices, bones.length );

            if ( maxBones < bones.length )
            {
                console.warn( 'THREE.WebGLRenderer: Skeleton has ' + bones.length + ' bones. This GPU supports ' + maxBones + '.' );
                return 0;
            }
            return maxBones;
        }
    }

    getTextureEncodingFromMap( map, gammaOverrideLinear )
    {
        let encoding;

        if ( !map )
        {
            encoding = Constant.LinearEncoding;
        } else if ( map.isTexture )
        {
            encoding = map.encoding;
        } else if ( map.isWebGLRenderTarget )
        {
            console.warn( "THREE.WebGLPrograms.getTextureEncodingFromMap: don't use render targets as textures. Use their .texture property instead." );
            encoding = map.texture.encoding;
        }

        // add backwards compatibility for WebGLRenderer.gammaInput/gammaOutput parameter, should probably be removed at some point.
        if ( encoding === Constant.LinearEncoding && gammaOverrideLinear )
            encoding = Constant.GammaEncoding;

        return encoding;
    }

    getParameters( material, lights, shadows, fog, nClipPlanes, nClipIntersection, object )
    {
        let shaderID = this.shaderIDs[material.type];

        // heuristics to create shader parameters according to lights in the scene
        // (not to blow over maxLights budget)
        let maxBones = object.isSkinnedMesh ? this.allocateBones( object ) : 0;
        let precision = this.capabilities.precision;

        if ( material.precision !== null )
        {
            precision = this.capabilities.getMaxPrecision( material.precision );
            if ( precision !== material.precision )
                console.warn( 'THREE.WebGLProgram.getParameters:', material.precision, 'not supported, using', precision, 'instead.' );
        }

        let currentRenderTarget = this.renderer.getRenderTarget();

        let parameters = {
            shaderID: shaderID,
            precision: precision,
            supportsVertexTextures: this.capabilities.vertexTextures,
            outputEncoding: this.getTextureEncodingFromMap( ( !currentRenderTarget ) ? null : currentRenderTarget.texture, this.renderer.gammaOutput ),
            map: !!material.map,
            mapEncoding: this.getTextureEncodingFromMap( material.map, this.renderer.gammaInput ),
            envMap: !!material.envMap,
            envMapMode: material.envMap && material.envMap.mapping,
            envMapEncoding: this.getTextureEncodingFromMap( material.envMap, this.renderer.gammaInput ),
            envMapCubeUV: ( !!material.envMap ) && ( ( material.envMap.mapping === Constant.CubeUVReflectionMapping ) || ( material.envMap.mapping === Constant.CubeUVRefractionMapping ) ),
            lightMap: !!material.lightMap,
            aoMap: !!material.aoMap,
            emissiveMap: !!material.emissiveMap,
            emissiveMapEncoding: this.getTextureEncodingFromMap( material.emissiveMap, this.renderer.gammaInput ),
            bumpMap: !!material.bumpMap,
            normalMap: !!material.normalMap,
            displacementMap: !!material.displacementMap,
            roughnessMap: !!material.roughnessMap,
            metalnessMap: !!material.metalnessMap,
            specularMap: !!material.specularMap,
            alphaMap: !!material.alphaMap,
            gradientMap: !!material.gradientMap,
            combine: material.combine,
            vertexColors: material.vertexColors,
            fog: !!fog,
            useFog: material.fog,
            fogExp: ( fog && fog.isFogExp2 ),
            flatShading: material.flatShading,
            sizeAttenuation: material.sizeAttenuation,
            logarithmicDepthBuffer: this.capabilities.logarithmicDepthBuffer,
            skinning: material.skinning && maxBones > 0,
            maxBones: maxBones,
            useVertexTexture: this.capabilities.floatVertexTextures,
            morphTargets: material.morphTargets,
            morphNormals: material.morphNormals,
            maxMorphTargets: this.renderer.maxMorphTargets,
            maxMorphNormals: this.renderer.maxMorphNormals,
            numDirLights: lights.directional.length,
            numPointLights: lights.point.length,
            numSpotLights: lights.spot.length,
            numRectAreaLights: lights.rectArea.length,
            numHemiLights: lights.hemi.length,
            numClippingPlanes: nClipPlanes,
            numClipIntersection: nClipIntersection,
            dithering: material.dithering,
            shadowMapEnabled: this.renderer.shadowMap.enabled && object.receiveShadow && shadows.length > 0,
            shadowMapType: this.renderer.shadowMap.type,
            toneMapping: this.renderer.toneMapping,
            physicallyCorrectLights: this.renderer.physicallyCorrectLights,
            premultipliedAlpha: material.premultipliedAlpha,
            alphaTest: material.alphaTest,
            doubleSided: material.side === Constant.DoubleSide,
            flipSided: material.side === Constant.BackSide,
            depthPacking: ( material.depthPacking !== undefined ) ? material.depthPacking : false
        };

        return parameters;
    }

    getProgramCode( material, parameters ): string
    {
        let array = [];

        if ( parameters.shaderID )
            array.push( parameters.shaderID );
        else
        {
            array.push( material.fragmentShader );
            array.push( material.vertexShader );
        }

        if ( material.defines !== undefined )
        {
            for ( let name in material.defines )
            {
                array.push( name );
                array.push( material.defines[name] );
            }
        }

        for ( let i = 0; i < this.parameterNames.length; i++ )
            array.push( parameters[this.parameterNames[i]] );

        array.push( material.onBeforeCompile.toString() );
        array.push( this.renderer.gammaOutput );
        return array.join();
    }

    //add TWebGlProgram
    acquireProgram( material, shader, parameters, code: string )
    {
        let program: TWebGLProgram;

        // Check if code has been already compiled
        for ( let p = 0, pl = this.programs.length; p < pl; p++ )
        {
            let programInfo: TWebGLProgram = this.programs[p];
            if ( programInfo.code === code )
            {
                program = programInfo;
                ++program.usedTimes;
                break;
            }
        }

        if ( program === undefined )
        {
            program = new TWebGLProgram( this.renderer, this.extensions, code, material, shader, parameters );
            this.programs.push( program );
        }

        return program;
    }

    //delete TWebGLProgram
    releaseProgram( program: TWebGLProgram )
    {
        if ( --program.usedTimes === 0 )
        {
            // Remove from unordered set
            let i = this.programs.indexOf( program );
            this.programs[i] = this.programs[this.programs.length - 1];
            this.programs.pop();

            // Free WebGL resources
            program.destroy();
        }
    }


}

export { WebGLPrograms };
