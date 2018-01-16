declare class WebGLCapabilities {
    maxAnisotropy: any;
    precision: any;
    maxPrecision: any;
    logarithmicDepthBuffer: any;
    maxTextures: any;
    maxVertexTextures: any;
    maxTextureSize: any;
    maxCubemapSize: any;
    maxAttributes: any;
    maxVertexUniforms: any;
    maxVaryings: any;
    maxFragmentUniforms: any;
    vertexTextures: any;
    floatFragmentTextures: any;
    floatVertexTextures: any;
    gl: any;
    extensions: any;
    constructor(gl: any, extensions: any, parameters: any);
    getMaxAnisotropy(): any;
    getMaxPrecision(precision: any): "highp" | "mediump" | "lowp";
}
export { WebGLCapabilities };
