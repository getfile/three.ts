import { Object3D } from '../core/Object3D';
declare class LensFlare extends Object3D {
    lensFlares: any;
    positionScreen: any;
    customUpdateCallback: any;
    constructor(texture: any, size: any, distance: any, blending: any, color: any);
    copy(source: any): this;
    add(texture: any, size: any, distance: any, blending: any, color: any, opacity?: number): void;
    updateLensFlares(): void;
}
export { LensFlare };
