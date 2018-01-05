import { Object3D } from '../core/Object3D';
declare class LOD extends Object3D {
    levels: any;
    constructor();
    copy(source: any): this;
    addLevel(object: any, distance: any): void;
    getObjectForDistance(distance: any): any;
    raycast(raycaster: any, intersects: any): void;
    update(camera: any): void;
    toJSON(meta: any): {};
}
export { LOD };
