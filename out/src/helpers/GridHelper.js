define(["require", "exports", "../objects/LineSegments", "../constants", "../materials/LineBasicMaterial", "../core/BufferAttribute", "../core/BufferGeometry", "../math/Color"], function (require, exports, LineSegments_1, constants_1, LineBasicMaterial_1, BufferAttribute_1, BufferGeometry_1, Color_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class GridHelper extends LineSegments_1.LineSegments {
        constructor(size, divisions, color1, color2) {
            size = size || 10;
            divisions = divisions || 10;
            color1 = new Color_1.Color(color1 !== undefined ? color1 : 0x444444);
            color2 = new Color_1.Color(color2 !== undefined ? color2 : 0x888888);
            var center = divisions / 2;
            var step = size / divisions;
            var halfSize = size / 2;
            var vertices = [], colors = [];
            for (var i = 0, j = 0, k = -halfSize; i <= divisions; i++, k += step) {
                vertices.push(-halfSize, 0, k, halfSize, 0, k);
                vertices.push(k, 0, -halfSize, k, 0, halfSize);
                var color = i === center ? color1 : color2;
                color.toArray(colors, j);
                j += 3;
                color.toArray(colors, j);
                j += 3;
                color.toArray(colors, j);
                j += 3;
                color.toArray(colors, j);
                j += 3;
            }
            var geometry = new BufferGeometry_1.BufferGeometry();
            geometry.addAttribute('position', new BufferAttribute_1.Float32BufferAttribute(vertices, 3));
            geometry.addAttribute('color', new BufferAttribute_1.Float32BufferAttribute(colors, 3));
            var material = new LineBasicMaterial_1.LineBasicMaterial({ vertexColors: constants_1.VertexColors });
            super(geometry, material);
        }
    }
    exports.GridHelper = GridHelper;
});
//# sourceMappingURL=GridHelper.js.map