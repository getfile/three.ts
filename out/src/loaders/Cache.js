define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Cache {
        constructor() {
            this.enabled = false;
            this.files = {};
        }
        add(key, file) {
            if (this.enabled === false)
                return;
            this.files[key] = file;
        }
        get(key) {
            if (this.enabled === false)
                return;
            return this.files[key];
        }
        remove(key) {
            delete this.files[key];
        }
        clear() {
            this.files = {};
        }
    }
    exports.Cache = Cache;
});
//# sourceMappingURL=Cache.js.map