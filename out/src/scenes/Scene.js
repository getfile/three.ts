define(["require", "exports", "../core/Object3D"], function (require, exports, Object3D_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Scene extends Object3D_1.Object3D {
        constructor() {
            super();
            this.type = 'Scene';
            this.background = null;
            this.fog = null;
            this.overrideMaterial = null;
            this.autoUpdate = true;
        }
        copy(source, recursive) {
            super.copy(source, recursive);
            if (source.background !== null)
                this.background = source.background.clone();
            if (source.fog !== null)
                this.fog = source.fog.clone();
            if (source.overrideMaterial !== null)
                this.overrideMaterial = source.overrideMaterial.clone();
            this.autoUpdate = source.autoUpdate;
            this.matrixAutoUpdate = source.matrixAutoUpdate;
            return this;
        }
        toJSON(meta) {
            var data = super.toJSON(meta);
            if (this.background !== null)
                data.object.background = this.background.toJSON(meta);
            if (this.fog !== null)
                data.object.fog = this.fog.toJSON();
            return data;
        }
    }
    exports.Scene = Scene;
});
//# sourceMappingURL=Scene.js.map