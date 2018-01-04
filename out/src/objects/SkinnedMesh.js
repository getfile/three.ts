define(["require", "exports", "./Mesh", "../math/Vector4", "./Skeleton", "./Bone", "../math/Matrix4"], function (require, exports, Mesh_1, Vector4_1, Skeleton_1, Bone_1, Matrix4_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class SkinnedMesh extends Mesh_1.Mesh {
        constructor(geometry, material) {
            super(geometry, material);
            this.type = 'SkinnedMesh';
            this.bindMode = 'attached';
            this.bindMatrix = new Matrix4_1.Matrix4();
            this.bindMatrixInverse = new Matrix4_1.Matrix4();
            let bones = this.initBones();
            let skeleton = new Skeleton_1.Skeleton(bones);
            this.bind(skeleton, this.matrixWorld);
            this.normalizeSkinWeights();
        }
        initBones() {
            let bones = [], bone, gbone;
            let i, il;
            if (this.geometry && this.geometry.bones !== undefined) {
                for (i = 0, il = this.geometry.bones.length; i < il; i++) {
                    gbone = this.geometry.bones[i];
                    bone = new Bone_1.Bone();
                    bones.push(bone);
                    bone.name = gbone.name;
                    bone.position.fromArray(gbone.pos);
                    bone.quaternion.fromArray(gbone.rotq);
                    if (gbone.scl !== undefined)
                        bone.scale.fromArray(gbone.scl);
                }
                for (i = 0, il = this.geometry.bones.length; i < il; i++) {
                    gbone = this.geometry.bones[i];
                    if ((gbone.parent !== -1) && (gbone.parent !== null) && (bones[gbone.parent] !== undefined)) {
                        bones[gbone.parent].add(bones[i]);
                    }
                    else {
                        this.add(bones[i]);
                    }
                }
            }
            this.updateMatrixWorld(true);
            return bones;
        }
        bind(skeleton, bindMatrix) {
            this.skeleton = skeleton;
            if (bindMatrix === undefined) {
                this.updateMatrixWorld(true);
                this.skeleton.calculateInverses();
                bindMatrix = this.matrixWorld;
            }
            this.bindMatrix.copy(bindMatrix);
            this.bindMatrixInverse.getInverse(bindMatrix);
        }
        pose() {
            this.skeleton.pose();
        }
        normalizeSkinWeights() {
            let scale, i;
            if (this.geometry && this.geometry.isGeometry) {
                for (i = 0; i < this.geometry.skinWeights.length; i++) {
                    let sw = this.geometry.skinWeights[i];
                    scale = 1.0 / sw.manhattanLength();
                    if (scale !== Infinity)
                        sw.multiplyScalar(scale);
                    else
                        sw.set(1, 0, 0, 0);
                }
            }
            else if (this.geometry && this.geometry.isBufferGeometry) {
                let vec = new Vector4_1.Vector4();
                let skinWeight = this.geometry.attributes.skinWeight;
                for (i = 0; i < skinWeight.count; i++) {
                    vec.x = skinWeight.getX(i);
                    vec.y = skinWeight.getY(i);
                    vec.z = skinWeight.getZ(i);
                    vec.w = skinWeight.getW(i);
                    scale = 1.0 / vec.manhattanLength();
                    if (scale !== Infinity)
                        vec.multiplyScalar(scale);
                    else
                        vec.set(1, 0, 0, 0);
                    skinWeight.setXYZW(i, vec.x, vec.y, vec.z, vec.w);
                }
            }
        }
        updateMatrixWorld(force) {
            Mesh_1.Mesh.prototype.updateMatrixWorld.call(this, force);
            if (this.bindMode === 'attached')
                this.bindMatrixInverse.getInverse(this.matrixWorld);
            else if (this.bindMode === 'detached')
                this.bindMatrixInverse.getInverse(this.bindMatrix);
            else
                console.warn('THREE.SkinnedMesh: Unrecognized bindMode: ' + this.bindMode);
        }
        clone() {
            return new SkinnedMesh(this.geometry, this.material).copy(this);
        }
    }
    exports.SkinnedMesh = SkinnedMesh;
});
//# sourceMappingURL=SkinnedMesh.js.map