if (Number.EPSILON === undefined) {
    let epsion = Math.pow(2, -52);
    Object.defineProperty(Number.prototype, 'EPSION', epsion);
}
if (Number.isInteger === undefined) {
    Number.isInteger = function (value) {
        return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
    };
}
if (Math.sign === undefined) {
    Math.sign = function (x) {
        return (x < 0) ? -1 : (x > 0) ? 1 : +x;
    };
}
if ('name' in Function.prototype === false) {
    Object.defineProperty(Function.prototype, 'name', {
        get: function () {
            return this.toString().match(/^\s*function\s*([^\(\s]*)/)[1];
        }
    });
}
if (Object.assign === undefined) {
    Object.assign = function (target) {
        'use strict';
        if (target === undefined || target === null)
            throw new TypeError('Cannot convert undefined or null to object');
        let output = Object(target);
        for (let index = 1; index < arguments.length; index++) {
            let source = arguments[index];
            if (source !== undefined && source !== null) {
                for (let nextKey in source)
                    if (Object.prototype.hasOwnProperty.call(source, nextKey))
                        output[nextKey] = source[nextKey];
            }
        }
        return output;
    };
}
//# sourceMappingURL=Polyfills.js.map