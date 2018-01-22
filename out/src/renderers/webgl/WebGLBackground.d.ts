import { Color } from '../../math/Color';
import { WebGLRenderer } from "../WebGLRenderer";
import { WebGLState } from "./WebGLState";
import { WebGLGeometries } from "./WebGLGeometries";
declare class WebGLBackground {
    renderer: WebGLRenderer;
    state: WebGLState;
    geometries: WebGLGeometries;
    premultipliedAlpha: any;
    constructor(renderer: any, state: any, geometries: any, premultipliedAlpha: any);
    clearColor: Color;
    clearAlpha: number;
    planeCamera: any;
    planeMesh: any;
    boxMesh: any;
    render(renderList: any, scene: any, camera: any, forceClear: any): void;
    setClear(color: any, alpha: any): void;
    getClearColor(): Color;
    setClearColor(color: any, alpha?: number): void;
    getClearAlpha(): number;
    setClearAlpha(alpha: any): void;
}
export { WebGLBackground };
