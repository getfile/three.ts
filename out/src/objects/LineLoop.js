define(["require", "exports", "./Line"], function (require, exports, Line_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class LineLoop extends Line_1.Line {
        constructor(geometry, material) {
            super(geometry, material);
            this.type = 'LineLoop';
        }
    }
    exports.LineLoop = LineLoop;
});
//# sourceMappingURL=LineLoop.js.map