import { Color } from '../../math/Color';
declare class WebGLBackground {
    renderer: any;
    state: any;
    geometries: any;
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
    setClearColor(color: any, alpha: any): void;
    getClearAlpha(): number;
    setClearAlpha(alpha: any): void;
}
export { WebGLBackground };
