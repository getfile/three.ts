import { Object3D } from '../core/Object3D';
declare class Light extends Object3D {
    color: any;
    intensity: any;
    groundColor: any;
    distance: any;
    angle: any;
    decay: any;
    penumbra: any;
    shadow: any;
    constructor(color: any, intensity: any);
    copy(source: any): this;
    toJSON(meta: any): any;
}
export { Light };
