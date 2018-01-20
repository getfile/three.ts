declare class WebGLSpriteRenderer {
    gl: any;
    state: any;
    textures: any;
    renderer: any;
    capabilities: any;
    vertexBuffer: any;
    elementBuffer: any;
    program: any;
    attributes: any;
    uniforms: any;
    texture: any;
    spritePosition: any;
    spriteRotation: any;
    spriteScale: any;
    constructor(renderer: any, gl: any, state: any, textures: any, capabilities: any);
    init(): void;
    render(sprites: any, scene: any, camera: any): void;
    createProgram(): any;
    painterSortStable(a: any, b: any): number;
}
export { WebGLSpriteRenderer };
