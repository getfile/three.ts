import { EventDispatcher } from './EventDispatcher';
declare class Geometry extends EventDispatcher {
    id: Object;
    uuid: string;
    name: string;
    type: string;
    vertices: any;
    colors: any;
    faces: any;
    faceVertexUvs: any;
    morphTargets: any;
    morphNormals: any;
    skinWeights: any;
    skinIndices: any;
    lineDistances: any;
    boundingBox: any;
    boundingSphere: any;
    elementsNeedUpdate: any;
    verticesNeedUpdate: any;
    uvsNeedUpdate: any;
    normalsNeedUpdate: any;
    colorsNeedUpdate: any;
    lineDistancesNeedUpdate: any;
    groupsNeedUpdate: any;
    constructor();
    applyMatrix(matrix: any): this;
    rotateX(angle: any): this;
    rotateY(angle: any): this;
    rotateZ(angle: any): this;
    translate(x: any, y: any, z: any): this;
    scale(x: any, y: any, z: any): this;
    lookAt(vector: any): void;
    fromBufferGeometry(geometry: any): this;
    center(): any;
    normalize(): this;
    computeFaceNormals(): void;
    computeVertexNormals(areaWeighted?: boolean): void;
    computeFlatVertexNormals(): void;
    computeMorphNormals(): void;
    computeLineDistances(): void;
    computeBoundingBox(): void;
    computeBoundingSphere(): void;
    merge(geometry: any, matrix: any, materialIndexOffset?: number): void;
    mergeMesh(mesh: any): void;
    mergeVertices(): number;
    setFromPoints(points: any): this;
    sortFacesByMaterialIndex(): void;
    toJSON(): {
        metadata: {
            version: number;
            type: string;
            generator: string;
        };
        uuid: string;
        type: string;
        name: string;
    };
    clone(): Geometry;
    copy(source: any): this;
    dispose(): void;
}
export { Geometry };
