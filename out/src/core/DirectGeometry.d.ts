import { Vector2 } from '../math/Vector2';
import { Geometry } from "./Geometry";
import { Box3 } from '../geom/Box3';
import { Sphere } from '../geom/Sphere';
import { Vector3 } from '../math/Vector3';
import { Color } from '../math/Color';
import { Vector4 } from '../math/Vector4';
declare class DirectGeometry {
    indices: number[];
    vertices: Vector3[];
    normals: Vector3[];
    colors: Color[];
    uvs: Vector2[];
    uvs2: Vector2[];
    skinWeights: Vector4[];
    skinIndices: Vector4[];
    morphTargets: {
        position: Vector3[][];
        normal: Vector3[][];
    };
    groups: any;
    boundingBox: Box3;
    boundingSphere: Sphere;
    verticesNeedUpdate: boolean;
    normalsNeedUpdate: boolean;
    colorsNeedUpdate: boolean;
    uvsNeedUpdate: boolean;
    groupsNeedUpdate: boolean;
    constructor();
    computeGroups(geometry: any): void;
    fromGeometry(geometry: Geometry): this;
}
export { DirectGeometry };
