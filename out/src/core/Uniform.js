define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Uniform {
        constructor(value) {
            this.value = value;
        }
        clone() {
            return new Uniform(this.value.clone === undefined ? this.value : this.value.clone());
        }
    }
    exports.Uniform = Uniform;
});
//# sourceMappingURL=Uniform.js.map