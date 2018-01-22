declare class DirectGeometry {
    indices: any;
    vertices: any;
    normals: any;
    colors: any;
    uvs: any;
    uvs2: any;
    groups: any;
    morphTargets: any;
    skinWeights: any;
    skinIndices: any;
    boundingBox: any;
    boundingSphere: any;
    verticesNeedUpdate: boolean;
    normalsNeedUpdate: boolean;
    colorsNeedUpdate: boolean;
    uvsNeedUpdate: boolean;
    groupsNeedUpdate: boolean;
    constructor();
    computeGroups(geometry: any): void;
    fromGeometry(geometry: any): this;
}
export { DirectGeometry };
