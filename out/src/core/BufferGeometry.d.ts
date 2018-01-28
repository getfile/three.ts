import { Vector3 } from '../math/Vector3';
import { Matrix4 } from '../math/Matrix4';
import { Box3 } from '../geom/Box3';
import { Sphere } from '../geom/Sphere';
import { EventDispatcher } from './EventDispatcher';
import { BufferAttribute } from './BufferAttribute';
import { DirectGeometry } from './DirectGeometry';
import { Geometry } from './Geometry';
interface GroupInfo {
    start: number;
    count?: number;
    materialIndex: number;
}
declare class BufferGeometry extends EventDispatcher {
    index: BufferAttribute;
    attributes: any;
    morphAttributes: any;
    groups: GroupInfo[];
    boundingBox: Box3;
    boundingSphere: Sphere;
    drawRange: {
        start: number;
        count: number;
    };
    parameters: any;
    constructor();
    getIndex(): BufferAttribute;
    setIndex(index: BufferAttribute): void;
    addAttribute(name: string, attribute: any): BufferGeometry;
    getAttribute(name: any): any;
    removeAttribute(name: any): this;
    addGroup(start: number, count: number, materialIndex?: number): void;
    clearGroups(): void;
    setDrawRange(start: any, count: any): void;
    applyMatrix(matrix: Matrix4): this;
    rotateX(angle: any): this;
    rotateY(angle: any): this;
    rotateZ(angle: any): this;
    translate(x: any, y: any, z: any): this;
    scale(x: any, y: any, z: any): this;
    lookAt(vector: any): void;
    center(): Vector3;
    setFromObject(object: any): this;
    setFromPoints(points: any): this;
    updateFromObject(object: any): this;
    fromGeometry(geometry: Geometry): this;
    fromDirectGeometry(geometry: DirectGeometry): this;
    computeBoundingBox(): void;
    computeBoundingSphere(): void;
    computeFaceNormals(): void;
    computeVertexNormals(): void;
    merge(geometry: any, offset: any): this;
    normalizeNormals(): void;
    toNonIndexed(): BufferGeometry;
    toJSON(): {
        metadata: {
            version: number;
            type: string;
            generator: string;
        };
        name: string;
        uuid: string;
        type: string;
        data: any;
    };
    clone(): BufferGeometry;
    copy(source: BufferGeometry): this;
    dispose(): void;
}
export { GroupInfo, BufferGeometry };
