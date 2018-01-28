import { WebGLRenderer } from "../WebGLRenderer";
import { Material } from '../../materials/Material';
declare class TWebGLProgram {
    id: number;
    code: string;
    usedTimes: any;
    renderer: WebGLRenderer;
    gl: WebGLRenderingContext;
    program: WebGLProgram;
    vertexShader: WebGLShader;
    fragmentShader: WebGLShader;
    cachedUniforms: any;
    cachedAttributes: any;
    diagnostics: any;
    constructor(renderer: WebGLRenderer, extensions: any, code: any, material: Material, shader: any, parameters: any);
    getUniforms(): any;
    getAttributes(): any;
    destroy(): void;
}
export { TWebGLProgram };
