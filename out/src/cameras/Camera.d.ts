import { Matrix4 } from '../math/Matrix4';
import { Object3D } from '../core/Object3D';
import { Vector4 } from '../math/Vector4';
declare class Camera extends Object3D {
    matrixWorldInverse: Matrix4;
    projectionMatrix: Matrix4;
    bounds: Vector4;
    constructor();
    copy(source: any, recursive?: boolean): this;
    getWorldDirection(optionalTarget: any): any;
    updateMatrixWorld(force?: any): void;
    clone(): Camera;
}
export { Camera };
