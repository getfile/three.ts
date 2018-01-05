define(["require", "exports", "../math/Matrix4", "../objects/Mesh", "../objects/Group"], function (require, exports, Matrix4_1, Mesh_1, Group_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class SceneUtils {
        static createMultiMaterialObject(geometry, materials) {
            var group = new Group_1.Group();
            for (var i = 0, l = materials.length; i < l; i++)
                group.add(new Mesh_1.Mesh(geometry, materials[i]));
            return group;
        }
        static detach(child, parent, scene) {
            child.applyMatrix(parent.matrixWorld);
            parent.remove(child);
            scene.add(child);
        }
        static attach(child, scene, parent) {
            child.applyMatrix(new Matrix4_1.Matrix4().getInverse(parent.matrixWorld));
            scene.remove(child);
            parent.add(child);
        }
    }
    exports.SceneUtils = SceneUtils;
});
//# sourceMappingURL=SceneUtils.js.map