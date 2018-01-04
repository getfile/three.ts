import { Object3D } from '../core/Object3D';
declare class Points extends Object3D {
    constructor(geometry: any, material: any);
    raycast(raycaster: any, intersects: any): void;
    clone(): Points;
}
export { Points };
