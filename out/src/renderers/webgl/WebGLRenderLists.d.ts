import { Object3D } from "../../core/Object3D";
import { Geometry } from "../../core/Geometry";
import { Material } from "../../materials/Material";
import { TWebGLProgram } from "./WebGLProgram";
import { Camera } from "../../cameras/Camera";
import { Scene } from "../../scenes/Scene";
interface RenderItem {
    id: number;
    object: Object3D;
    geometry: Geometry;
    material: Material;
    program: TWebGLProgram;
    renderOrder: number;
    z: number;
    group: any;
}
declare class WebGLRenderList {
    renderItems: RenderItem[];
    renderItemsIndex: number;
    opaque: RenderItem[];
    transparent: RenderItem[];
    constructor();
    init(): void;
    push(object: Object3D, geometry: Geometry, material: Material, z: number, group: any): void;
    sort(): void;
}
declare class WebGLRenderLists {
    lists: any;
    constructor();
    get(scene: Scene, camera: Camera): WebGLRenderList;
    dispose(): void;
}
export { RenderItem, WebGLRenderList, WebGLRenderLists };
