define(["require", "exports", "../math/Matrix4.js", "../math/Vector2.js"], function (require, exports, Matrix4_js_1, Vector2_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class LightShadow {
        constructor(camera) {
            this.camera = camera;
            this.bias = 0;
            this.radius = 1;
            this.mapSize = new Vector2_js_1.Vector2(512, 512);
            this.map = null;
            this.matrix = new Matrix4_js_1.Matrix4();
        }
        copy(source) {
            this.camera = source.camera.clone();
            this.bias = source.bias;
            this.radius = source.radius;
            this.mapSize.copy(source.mapSize);
            return this;
        }
        clone() {
            return new LightShadow(this.camera).copy(this);
        }
        toJSON() {
            var object = {};
            if (this.bias !== 0)
                object.bias = this.bias;
            if (this.radius !== 1)
                object.radius = this.radius;
            if (this.mapSize.x !== 512 || this.mapSize.y !== 512)
                object.mapSize = this.mapSize.toArray();
            object.camera = this.camera.toJSON(false).object;
            delete object.camera.matrix;
            return object;
        }
    }
    exports.LightShadow = LightShadow;
});
//# sourceMappingURL=LightShadow.js.map