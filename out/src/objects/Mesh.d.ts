import { Object3D } from '../core/Object3D';
declare class Mesh extends Object3D {
    drawMode: any;
    morphTargetInfluences: any;
    morphTargetDictionary: any;
    constructor(geometry: any, material: any);
    setDrawMode(value: any): void;
    copy(source: any): this;
    updateMorphTargets(): void;
    raycast(raycaster: any, intersects: any): void;
    clone(): Mesh;
}
export { Mesh };
