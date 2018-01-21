import { Object3D } from '../core/Object3D';
declare class Line extends Object3D {
    constructor(geometry: any, material: any, data?: any);
    raycast(raycaster: any, intersects: any): void;
    clone(): Line;
}
export { Line };
