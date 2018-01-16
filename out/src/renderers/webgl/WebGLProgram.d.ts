declare class WebGLProgram {
    id: any;
    code: any;
    usedTimes: any;
    vertexShader: any;
    fragmentShader: any;
    cachedUniforms: any;
    cachedAttributes: any;
    gl: any;
    program: any;
    renderer: any;
    diagnostics: any;
    constructor(renderer: any, extensions: any, code: any, material: any, shader: any, parameters: any);
    getUniforms(): any;
    getAttributes(): any;
    destroy(): void;
    readonly uniforms: any;
    readonly attributes: any;
}
export { WebGLProgram };
