define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class LoaderUtils {
        static decodeText(array) {
            if (window["TextDecoder"] !== 'undefined')
                return new (window["TextDecoder"])("utf-8").decode(array);
            var s = '';
            for (var i = 0, il = array.length; i < il; i++) {
                s += String.fromCharCode(array[i]);
            }
            return s;
        }
        static extractUrlBase(url) {
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