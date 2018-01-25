import { Object3D } from '../core/Object3D';
import { WebGLBackground } from '../renderers/webgl/WebGLBackground';
import { Fog } from './Fog';
declare class Scene extends Object3D {
    background: WebGLBackground;
    fog: Fog;
    overrideMaterial: any;
    autoUpdate: boolean;
    constructor();
    copy(source: any, recursive: any): this;
    toJSON(meta: any): any;
}
export { Scene };
