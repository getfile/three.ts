define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class LoaderUtils {
        constructor() {
        }
        decodeText(array) {
            if (typeof TextDecoder !== 'undefined')
                return new TextDecoder().decode(array);
            var s = '';
            for (var i = 0, il = array.length; i < il; i++) {
                s += String.fromCharCode(array[i]);
            }
            return s;
        }
        extractUrlBase(url) {
            var parts = url.split('/');
            if (parts.length === 1)
                return './';
            parts.pop();
            return parts.join('/') + '/';
        }
    }
    exports.LoaderUtils = LoaderUtils;
});
//# sourceMappingURL=LoaderUtils.js.map