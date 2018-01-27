import { Object3D } from '../core/Object3D';
import { SpriteMaterial } from '../materials/SpriteMaterial';
import { Raycaster } from '../core/Raycaster';
declare class Sprite extends Object3D {
    constructor(material: SpriteMaterial);
    raycast(raycaster: Raycaster, intersects: any): void;
    clone(): Sprite;
}
export { Sprite };
