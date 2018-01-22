import { Object3D } from '../core/Object3D';
declare class Scene extends Object3D {
    background: any;
    fog: any;
    overrideMaterial: any;
    autoUpdate: any;
    constructor();
    copy(source: any, recursive: any): this;
    toJSON(meta: any): any;
}
export { Scene };
