define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function arrayMin(array) {
        if (array.length === 0)
            return Infinity;
        var min = array[0];
        for (var i = 1, l = array.length; i < l; ++i)
            if (array[i] < min)
                min = array[i];
        return min;
    }
    exports.arrayMin = arrayMin;
    function arrayMax(array) {
        if (array.length === 0)
            return -Infinity;
        var max = array[0];
        for (var i = 1, l = array.length; i < l; ++i)
            if (array[i] > max)
                max = array[i];
        return max;
    }
    exports.arrayMax = arrayMax;
});
//# sourceMappingURL=utils.js.map