import { Object3D } from "../../core/Object3D";
declare class WebGLProperties {
    properties: any;
    constructor();
    get(object: Object3D): any;
    remove(object: any): void;
    clear(): void;
}
export { WebGLProperties };
