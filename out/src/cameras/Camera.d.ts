import { Matrix4 } from '../math/Matrix4';
import { Object3D } from '../core/Object3D';
declare class Camera extends Object3D {
    matrixWorldInverse: Matrix4;
    projectionMatrix: Matrix4;
    constructor();
    copy(source: any, recursive?: boolean): this;
    getWorldDirection(optionalTarget: any): any;
    updateMatrixWorld(force?: any): void;
    clone(): Camera;
}
export { Camera };
