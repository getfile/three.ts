define(["require", "exports", "./Line.js"], function (require, exports, Line_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class LineSegments extends Line_js_1.Line {
        constructor(geometry, material) {
            super(geometry, material);
            this.type = 'LineSegments';
        }
    }
    exports.LineSegments = LineSegments;
});
//# sourceMappingURL=LineSegments.js.map