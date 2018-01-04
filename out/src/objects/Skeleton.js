define(["require", "exports", "../math/Matrix4"], function (require, exports, Matrix4_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Skeleton {
        constructor(bones, boneInverses) {
            bones = bones || [];
            this.bones = bones.slice(0);
            this.boneMatrices = new Float32Array(this.bones.length * 16);
            if (boneInverses === undefined)
                this.calculateInverses();
            else {
                if (this.bones.length === boneInverses.length)
                    this.boneInverses = boneInverses.slice(0);
                else {
                    console.warn('THREE.Skeleton boneInverses is the wrong length.');
                    this.boneInverses = [];
                    for (let i = 0, il = this.bones.length; i < il; i++)
                        this.boneInverses.push(new Matrix4_1.Matrix4());
                }
            }
        }
        calculateInverses() {
            this.boneInverses = [];
            for (let i = 0, il = this.bones.length; i < il; i++) {
                let inverse = new Matrix4_1.Matrix4();
                if (this.bones[i])
                    inverse.getInverse(this.bones[i].matrixWorld);
                this.boneInverses.push(inverse);
            }
        }
        pose() {
            let bone, i, il;
            for (i = 0, il = this.bones.length; i < il; i++) {
                bone = this.bones[i];
                if (bone)
                    bone.matrixWorld.getInverse(this.boneInverses[i]);
            }
            for (i = 0, il = this.bones.length; i < il; i++) {
                bone = this.bones[i];
                if (bone) {
                    if (bone.parent && bone.parent.isBone) {
                        bone.matrix.getInverse(bone.parent.matrixWorld);
                        bone.matrix.multiply(bone.matrixWorld);
                    }
                    else
                        bone.matrix.copy(bone.matrixWorld);
                    bone.matrix.decompose(bone.position, bone.quaternion, bone.scale);
                }
            }
        }
        update() {
            let offsetMatrix = new Matrix4_1.Matrix4();
            let identityMatrix = new Matrix4_1.Matrix4();
            let bones = this.bones;
            let boneInverses = this.boneInverses;
            let boneMatrices = this.boneMatrices;
            let boneTexture = this.boneTexture;
            for (let i = 0, il = bones.length; i < il; i++) {
                let matrix = bones[i] ? bones[i].matrixWorld : identityMatrix;
                offsetMatrix.multiplyMatrices(matrix, boneInverses[i]);
                offsetMatrix.toArray(boneMatrices, i * 16);
            }
            if (boneTexture !== undefined)
                boneTexture.needsUpdate = true;
        }
        clone() {
            return new Skeleton(this.bones, this.boneInverses);
        }
    }
    exports.Skeleton = Skeleton;
});
//# sourceMappingURL=Skeleton.js.map