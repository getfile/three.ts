define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class WebGLObjects {
        constructor(geometries, infoRender) {
            this.geometries = geometries;
            this.infoRender = infoRender;
            this.updateList = {};
        }
        update(object) {
            var frame = this.infoRender.frame;
            var geometry = object.geometry;
            var buffergeometry = this.geometries.get(object, geometry);
            if (this.updateList[buffergeometry.id] !== frame) {
                if (geometry.isGeometry)
                    buffergeometry.updateFromObject(object);
                this.geometries.update(buffergeometry);
                this.updateList[buffergeometry.id] = frame;
            }
            return buffergeometry;
        }
        clear() {
            this.updateList = {};
        }
    }
    exports.WebGLObjects = WebGLObjects;
});
//# sourceMappingURL=WebGLObjects.js.map