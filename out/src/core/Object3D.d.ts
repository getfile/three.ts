import { EventDispatcher } from './EventDispatcher';
import { Layers } from './Layers';
import { Vector3 } from '../math/Vector3';
import { Matrix3 } from '../math/Matrix3';
import { Matrix4 } from '../math/Matrix4';
import { Euler } from '../math/Euler';
import { Quaternion } from '../math/Quaternion';
declare class Object3D extends EventDispatcher {
    parent: Object3D;
    children: Array<Object3D>;
    up: Vector3;
    position: Vector3;
    scale: Vector3;
    rotation: Euler;
    quaternion: Quaternion;
    modelViewMatrix: Matrix4;
    normalMatrix: Matrix3;
    matrix: Matrix4;
    matrixWorld: Matrix4;
    matrixAutoUpdate: boolean;
    matrixWorldNeedsUpdate: boolean;
    layers: Layers;
    visible: boolean;
    castShadow: boolean;
    receiveShadow: boolean;
    frustumCulled: boolean;
    renderOrder: number;
    geometry: any;
    material: any;
    userData: Object;
    static DefaultUp: Vector3;
    static DefaultMatrixAutoUpdate: boolean;
    onRotationChange: () => void;
    onQuaternionChange: () => void;
    constructor();
    onBeforeRender: () => void;
    onAfterRender: () => void;
    applyMatrix(matrix: any): void;
    applyQuaternion(q: any): this;
    setRotationFromAxisAngle(axis: any, angle: any): void;
    setRotationFromEuler(euler: any): void;
    setRotationFromMatrix(m: any): void;
    setRotationFromQuaternion(q: any): void;
    rotateOnAxis(axis: any, angle: any): this;
    rotateOnWorldAxis(axis: any, angle: any): this;
    rotateX(angle: any): this;
    rotateY(angle: any): this;
    rotateZ(angle: any): this;
    translateOnAxis(axis: any, distance: any): this;
    translateX(distance: any): this;
    translateY(distance: any): this;
    translateZ(distance: any): this;
    localToWorld(vector: any): any;
    worldToLocal(vector: any): any;
    lookAt(x: any, y?: number, z?: number): void;
    add(object: any): this;
    remove(object: any): this;
    getObjectById(id: any): any;
    getObjectByName(name: any): any;
    getObjectByProperty(name: any, value: any): any;
    getWorldPosition(optionalTarget: any): any;
    getWorldQuaternion(optionalTarget: any): any;
    getWorldRotation(optionalTarget: any): any;
    getWorldScale(optionalTarget: any): any;
    getWorldDirection(optionalTarget: any): any;
    raycast(raycaster: any, intersects: any): void;
    traverse(callback: any): void;
    traverseVisible(callback: any): void;
    traverseAncestors(callback: any): void;
    updateMatrix(): void;
    updateMatrixWorld(force?: boolean): void;
    toJSON(meta: any): any;
    clone(recursive: any): Object3D;
    copy(source: any, recursive?: boolean): this;
}
export { Object3D };
