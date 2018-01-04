define(["require", "exports", "../core/Object3D"], function (require, exports, Object3D_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Bone extends Object3D_1.Object3D {
        constructor() {
            super();
            this.type = 'Bone';
        }
    }
    exports.Bone = Bone;
});
//# sourceMappingURL=Bone.js.map