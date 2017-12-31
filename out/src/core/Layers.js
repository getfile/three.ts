define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Layers {
        constructor() {
            this.mask = 1 | 0;
        }
        set(channel) {
            this.mask = 1 << channel | 0;
        }
        enable(channel) {
            this.mask |= 1 << channel | 0;
        }
        toggle(channel) {
            this.mask ^= 1 << channel | 0;
        }
        disable(channel) {
            this.mask &= ~(1 << channel | 0);
        }
        test(layers) {
            return (this.mask & layers.mask) !== 0;
        }
    }
    exports.Layers = Layers;
});
//# sourceMappingURL=Layers.js.map