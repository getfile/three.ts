import { TWebGLProgram } from './WebGLProgram.js';
import { WebGLRenderer } from '../WebGLRenderer';
import { WebGLExtensions } from './WebGLExtensions';
import { WebGLCapabilities } from './WebGLCapabilities';
declare class WebGLPrograms {
    renderer: WebGLRenderer;
    extensions: WebGLExtensions;
    capabilities: WebGLCapabilities;
    programs: TWebGLProgram[];
    shaderIDs: any;
    parameterNames: string[];
    constructor(renderer: WebGLRenderer, extensions: WebGLExtensions, capabilities: WebGLCapabilities);
    allocateBones(object: any): number;
    getTextureEncodingFromMap(map: any, gammaOverrideLinear: any): any;
    getParameters(material: any, lights: any, shadows: any, fog: any, nClipPlanes: any, nClipIntersection: any, object: any): {
        shaderID: any;
        precision: any;
        supportsVertexTextures: any;
        outputEncoding: any;
        map: boolean;
        mapEncoding: any;
        envMap: boolean;
        envMapMode: any;
        envMapEncoding: any;
        envMapCubeUV: boolean;
        lightMap: boolean;
        aoMap: boolean;
        emissiveMap: boolean;
        emissiveMapEncoding: any;
        bumpMap: boolean;
        normalMap: boolean;
        displacementMap: boolean;
        roughnessMap: boolean;
        metalnessMap: boolean;
        specularMap: boolean;
        alphaMap: boolean;
        gradientMap: boolean;
        combine: any;
        vertexColors: any;
        fog: boolean;
        useFog: any;
        fogExp: any;
        flatShading: any;
        sizeAttenuation: any;
        logarithmicDepthBuffer: any;
        skinning: boolean;
        maxBones: number;
        useVertexTexture: any;
        morphTargets: any;
        morphNormals: any;
        maxMorphTargets: any;
        maxMorphNormals: any;
        numDirLights: any;
        numPointLights: any;
        numSpotLights: any;
        numRectAreaLights: any;
        numHemiLights: any;
        numClippingPlanes: any;
        numClipIntersection: any;
        dithering: any;
        shadowMapEnabled: boolean;
        shadowMapType: any;
        toneMapping: any;
        physicallyCorrectLights: boolean;
        premultipliedAlpha: any;
        alphaTest: any;
        doubleSided: boolean;
        flipSided: boolean;
        depthPacking: any;
    };
    getProgramCode(material: any, parameters: any): string;
    acquireProgram(material: any, shader: any, parameters: any, code: any): TWebGLProgram;
    releaseProgram(program: TWebGLProgram): void;
}
export { WebGLPrograms };
