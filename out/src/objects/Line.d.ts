import { Object3D } from '../core/Object3D';
import { Raycaster } from '../core/Raycaster';
import { Geometry } from '../core/Geometry';
import { Material } from '../materials/Material';
declare class Line extends Object3D {
    constructor(geometry?: Geometry, material?: Material);
    raycast(raycaster: Raycaster, intersects: any): void;
    clone(): Line;
}
export { Line };
