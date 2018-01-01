import { Ray } from '../geom/Ray';
declare class Raycaster {
    ray: Ray;
    far: number;
    near: number;
    params: Object;
    linePrecision: number;
    constructor(origin: any, direction: any, near: any, far: any);
    set(origin: any, direction: any): void;
    setFromCamera(coords: any, camera: any): void;
    intersectObject(object: any, recursive: any): any[];
    intersectObjects(objects: any, recursive: any): any[];
}
export { Raycaster };
