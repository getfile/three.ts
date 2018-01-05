define(["require", "exports", "../../core/Object3D"], function (require, exports, Object3D_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ImmediateRenderObject extends Object3D_1.Object3D {
        constructor(material) {
            super();
            this.material = material;
            this.render = function () { };
        }
    }
    exports.ImmediateRenderObject = ImmediateRenderObject;
});
//# sourceMappingURL=ImmediateRenderObject.js.map