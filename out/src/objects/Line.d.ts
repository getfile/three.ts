import { Object3D } from '../core/Object3D';
import { BufferGeometry } from '../core/BufferGeometry';
import { Raycaster } from '../core/Raycaster';
import { Material } from '../materials/Material';
declare class Line extends Object3D {
    constructor(geometry?: BufferGeometry, material?: Material);
    raycast(raycaster: Raycaster, intersects: any): void;
    clone(): Line;
}
export { Line };
