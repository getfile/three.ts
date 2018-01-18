declare class WebGLFlareRenderer {
    renderer: any;
    gl: any;
    state: any;
    textures: any;
    capabilities: any;
    vertexBuffer: any;
    elementBuffer: any;
    shader: any;
    program: any;
    attributes: any;
    uniforms: any;
    tempTexture: any;
    occlusionTexture: any;
    constructor(renderer: any, gl: any, state: any, textures: any, capabilities: any);
    init(): void;
    render(flares: any, scene: any, camera: any, viewport: any): void;
    createProgram(shader: any): any;
}
export { WebGLFlareRenderer };
