import { Mesh } from './Mesh';
declare class SkinnedMesh extends Mesh {
    constructor(geometry: any, material: any);
    initBones(): any[];
    bind(skeleton: any, bindMatrix: any): void;
    pose(): void;
    normalizeSkinWeights(): void;
    updateMatrixWorld(force: any): void;
    clone(): SkinnedMesh;
}
export { SkinnedMesh };
