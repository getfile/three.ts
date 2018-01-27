import { EventDispatcher } from './EventDispatcher';
import { Layers } from './Layers';
import { Vector3 } from '../math/Vector3';
import { Matrix3 } from '../math/Matrix3';
import { Matrix4 } from '../math/Matrix4';
import { Euler } from '../math/Euler';
import { Quaternion } from '../math/Quaternion';
import { Geometry } from './Geometry';
import { Material } from '../materials/Material';
declare class Object3D extends EventDispatcher {
    parent: Object3D;
    children: Array<Object3D>;
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
    geometry: Geometry;
    material: Material;
    userData: Object;
    up: Vector3;
    static DefaultUp: Vector3;
    static DefaultMatrixAutoUpdate: boolean;
    onRotationChange: () => void;
    onQuaternionChange: () => void;
    constructor();
    onBeforeRender: () => void;
    onAfterRender: () => void;
    applyMatrix(matrix: Matrix4): void;
    applyQuaternion(q: Quaternion): Object3D;
    setRotationFromAxisAngle(axis: Vector3, angle: number): void;
    setRotationFromEuler(euler: Euler): void;
    setRotationFromMatrix(m: Matrix4): void;
    setRotationFromQuaternion(q: Quaternion): void;
    rotateOnAxis(axis: Vector3, angle: number): Object3D;
    rotateOnWorldAxis(axis: Vector3, angle: number): Object3D;
    rotateX(angle: number): Object3D;
    rotateY(angle: number): Object3D;
    rotateZ(angle: number): Object3D;
    translateOnAxis(axis: Vector3, distance: number): Object3D;
    translateX(distance: number): Object3D;
    translateY(distance: number): Object3D;
    translateZ(distance: number): Object3D;
    localToWorld(vector: Vector3): Vector3;
    worldToLocal(vector: Vector3): Vector3;
    lookAt(x: Vector3 | number, y?: number, z?: number): void;
    add(object: Object3D): Object3D;
    remove(object: Object3D): Object3D;
    getObjectById(id: number): Object3D;
    getObjectByName(name: string): Object3D;
    getObjectByProperty(name: string, value: any): Object3D;
    getWorldPosition(optionalTarget?: Vector3): Vector3;
    getWorldQuaternion(optionalTarget?: Quaternion): Quaternion;
    getWorldRotation(optionalTarget?: Euler): Euler;
    getWorldScale(optionalTarget?: Vector3): Vector3;
    getWorldDirection(optionalTarget?: Vector3): Vector3;
    raycast(raycaster: any, intersects: any): void;
    traverse(callback: Function): void;
    traverseVisible(callback: Function): void;
    traverseAncestors(callback: Function): void;
    updateMatrix(): void;
    updateMatrixWorld(force?: boolean): void;
    toJSON(meta: any): any;
    clone(recursive?: boolean): Object3D;
    copy(source: Object3D, recursive?: boolean): Object3D;
}
export { Object3D };
