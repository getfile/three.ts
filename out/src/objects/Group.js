define(["require", "exports", "../core/Object3D.js"], function (require, exports, Object3D_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Group extends Object3D_js_1.Object3D {
        constructor() {
            super();
            this.type = 'Group';
        }
    }
    exports.Group = Group;
});
//# sourceMappingURL=Group.js.map