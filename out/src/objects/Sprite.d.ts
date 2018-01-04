import { Object3D } from '../core/Object3D';
declare class Sprite extends Object3D {
    constructor(material: any);
    raycast(raycaster: any, intersects: any): void;
    clone(): Sprite;
}
export { Sprite };
