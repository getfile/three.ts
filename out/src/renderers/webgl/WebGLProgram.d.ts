import { WebGLRenderer } from "../WebGLRenderer";
declare class TWebGLProgram {
    id: any;
    code: any;
    usedTimes: any;
    vertexShader: any;
    fragmentShader: any;
    cachedUniforms: any;
    cachedAttributes: any;
    gl: WebGLRenderingContext;
    program: WebGLProgram;
    renderer: any;
    diagnostics: any;
    constructor(renderer: WebGLRenderer, extensions: any, code: any, material: any, shader: any, parameters: any);
    getUniforms(): any;
    getAttributes(): any;
    destroy(): void;
    readonly uniforms: any;
    readonly attributes: any;
}
export { TWebGLProgram };
