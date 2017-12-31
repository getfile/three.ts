define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class _Math {
        static generateUUID() {
            if (_Math.lut == undefined) {
                _Math.lut = [];
                for (let i = 0; i < 256; i++)
                    _Math.lut[i] = (i < 16 ? '0' : '') + (i).toString(16).toUpperCase();
            }
            let lut = _Math.lut;
            let d0 = Math.random() * 0xffffffff | 0;
            let d1 = Math.random() * 0xffffffff | 0;
            let d2 = Math.random() * 0xffffffff | 0;
            let d3 = Math.random() * 0xffffffff | 0;
            return lut[d0 & 0xff] + lut[d0 >> 8 & 0xff] + lut[d0 >> 16 & 0xff] + lut[d0 >> 24 & 0xff] + '-' +
                lut[d1 & 0xff] + lut[d1 >> 8 & 0xff] + '-' + lut[d1 >> 16 & 0x0f | 0x40] + lut[d1 >> 24 & 0xff] + '-' +
                lut[d2 & 0x3f | 0x80] + lut[d2 >> 8 & 0xff] + '-' + lut[d2 >> 16 & 0xff] + lut[d2 >> 24 & 0xff] +
                lut[d3 & 0xff] + lut[d3 >> 8 & 0xff] + lut[d3 >> 16 & 0xff] + lut[d3 >> 24 & 0xff];
        }
        ;
        static clamp(value, min, max) {
            return Math.max(min, Math.min(max, value));
        }
        ;
        static euclideanModulo(n, m) {
            return ((n % m) + m) % m;
        }
        static mapLinear(x, a1, a2, b1, b2) {
            return b1 + (x - a1) * (b2 - b1) / (a2 - a1);
        }
        static lerp(x, y, t) {
            return (1 - t) * x + t * y;
        }
        static smoothstep(x, min, max) {
            if (x <= min)
                return 0;
            if (x >= max)
                return 1;
            x = (x - min) / (max - min);
            return x * x * (3 - 2 * x);
        }
        static smootherstep(x, min, max) {
            if (x <= min)
                return 0;
            if (x >= max)
                return 1;
            x = (x - min) / (max - min);
            return x * x * x * (x * (x * 6 - 15) + 10);
        }
        static randInt(low, high) {
            return low + Math.floor(Math.random() * (high - low + 1));
        }
        static randFloat(low, high) {
            return low + Math.random() * (high - low);
        }
        static randFloatSpread(range) {
            return range * (0.5 - Math.random());
        }
        static degToRad(degrees) {
            return degrees * _Math.DEG2RAD;
        }
        static radToDeg(radians) {
            return radians * _Math.RAD2DEG;
        }
        static isPowerOfTwo(value) {
            return (value & (value - 1)) === 0 && value !== 0;
        }
        static ceilPowerOfTwo(value) {
            return Math.pow(2, Math.ceil(Math.log(value) / Math.LN2));
        }
        static floorPowerOfTwo(value) {
            return Math.pow(2, Math.floor(Math.log(value) / Math.LN2));
        }
    }
    _Math.DEG2RAD = Math.PI / 180;
    _Math.RAD2DEG = 180 / Math.PI;
    exports._Math = _Math;
    ;
});
//# sourceMappingURL=Math.js.map