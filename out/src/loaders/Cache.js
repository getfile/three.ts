define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Cache {
        static add(key, file) {
            if (Cache.enabled === false)
                return;
            Cache.files[key] = file;
        }
        static get(key) {
            if (Cache.enabled === false)
                return;
            return Cache.files[key];
        }
        static remove(key) {
            delete Cache.files[key];
        }
        static clear() {
            Cache.files = {};
        }
    }
    Cache.enabled = false;
    Cache.files = {};
    exports.Cache = Cache;
});
//# sourceMappingURL=Cache.js.map