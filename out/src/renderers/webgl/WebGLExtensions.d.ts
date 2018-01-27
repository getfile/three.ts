declare class WebGLExtensions {
    extensions: any;
    gl: WebGLRenderingContext;
    constructor(gl: any);
    get(name: string): any;
}
export { WebGLExtensions };
