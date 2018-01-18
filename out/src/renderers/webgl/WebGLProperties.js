define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class WebGLProperties {
        constructor() {
            this.properties = {};
        }
        get(object) {
            var uuid = object.uuid;
            var map = this.properties[uuid];
            if (map === undefined) {
                map = {};
                this.properties[uuid] = map;
            }
            return map;
        }
        remove(object) {
            delete this.properties[object.uuid];
        }
        clear() {
            this.properties = {};
        }
    }
    exports.WebGLProperties = WebGLProperties;
});
//# sourceMappingURL=WebGLProperties.js.map