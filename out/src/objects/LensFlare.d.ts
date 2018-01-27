import { Object3D } from '../core/Object3D';
import { Color } from '../math/Color';
declare class LensFlare extends Object3D {
    lensFlares: any;
    positionScreen: any;
    customUpdateCallback: any;
    constructor(texture: any, size: any, distance: any, blending: any, color: any);
    copy(source: any): this;
    add(texture: any, size?: number, distance?: number, blending?: number, color?: Color, opacity?: number): void;
    updateLensFlares(): void;
}
export { LensFlare };
