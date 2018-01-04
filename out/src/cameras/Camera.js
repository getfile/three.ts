define(["require", "exports", "../math/Matrix4", "../math/Quaternion", "../core/Object3D", "../math/Vector3"], function (require, exports, Matrix4_1, Quaternion_1, Object3D_1, Vector3_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Camera extends Object3D_1.Object3D {
        constructor() {
            super();
            this.type = 'Camera';
            this.matrixWorldInverse = new Matrix4_1.Matrix4();
            this.projectionMatrix = new Matrix4_1.Matrix4();
        }
        copy(source, recursive = true) {
            super.copy(source, recursive);
            this.matrixWorldInverse.copy(source.matrixWorldInverse);
            this.projectionMatrix.copy(source.projectionMatrix);
            return this;
        }
        getWorldDirection(optionalTarget) {
            var quaternion = new Quaternion_1.Quaternion();
            var result = optionalTarget || new Vector3_1.Vector3();
            this.getWorldQuaternion(quaternion);
            return result.set(0, 0, -1).applyQuaternion(quaternion);
        }
        updateMatrixWorld(force) {
            Object3D_1.Object3D.prototype.updateMatrixWorld.call(this, force);
            this.matrixWorldInverse.getInverse(this.matrixWorld);
        }
        clone() {
            return new Camera().copy(this);
        }
    }
    exports.Camera = Camera;
});
//# sourceMappingURL=Camera.js.map