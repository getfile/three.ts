define(["require", "exports", "../math/Color", "../math/Vector3"], function (require, exports, Color_1, Vector3_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Face3 {
        constructor(a = 0, b = 0, c = 0, normal, color, materialIndex = 0) {
            this.a = a;
            this.b = b;
            this.c = c;
            this.normal = (normal instanceof Vector3_1.Vector3) ? normal : new Vector3_1.Vector3();
            this.vertexNormals = Array.isArray(normal) ? normal : [];
            this.color = (color instanceof Color_1.Color) ? color : new Color_1.Color();
            this.vertexColors = Array.isArray(color) ? color : [];
            this.materialIndex = materialIndex;
        }
        clone() {
            return new Face3().copy(this);
        }
        copy(source) {
            this.a = source.a;
            this.b = source.b;
            this.c = source.c;
            this.normal.copy(source.normal);
            this.color.copy(source.color);
            this.materialIndex = source.materialIndex;
            for (var i = 0, il = source.vertexNormals.length; i < il; i++)
                this.vertexNormals[i] = source.vertexNormals[i].clone();
            for (var i = 0, il = source.vertexColors.length; i < il; i++)
                this.vertexColors[i] = source.vertexColors[i].clone();
            return this;
        }
    }
    exports.Face3 = Face3;
});
//# sourceMappingURL=Face3.js.map