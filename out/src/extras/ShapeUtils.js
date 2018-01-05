define(["require", "exports", "./Earcut"], function (require, exports, Earcut_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ShapeUtils {
        static area(contour) {
            var n = contour.length;
            var a = 0.0;
            for (var p = n - 1, q = 0; q < n; p = q++)
                a += contour[p].x * contour[q].y - contour[q].x * contour[p].y;
            return a * 0.5;
        }
        static isClockWise(pts) {
            return ShapeUtils.area(pts) < 0;
        }
        static triangulateShape(contour, holes) {
            function removeDupEndPts(points) {
                var l = points.length;
                if (l > 2 && points[l - 1].equals(points[0]))
                    points.pop();
            }
            function addContour(vertices, contour) {
                for (var i = 0; i < contour.length; i++) {
                    vertices.push(contour[i].x);
                    vertices.push(contour[i].y);
                }
            }
            var vertices = [];
            var holeIndices = [];
            var faces = [];
            removeDupEndPts(contour);
            addContour(vertices, contour);
            var holeIndex = contour.length;
            holes.forEach(removeDupEndPts);
            for (i = 0; i < holes.length; i++) {
                holeIndices.push(holeIndex);
                holeIndex += holes[i].length;
                addContour(vertices, holes[i]);
            }
            var triangles = Earcut_1.Earcut.triangulate(vertices, holeIndices);
            for (var i = 0; i < triangles.length; i += 3)
                faces.push(triangles.slice(i, i + 3));
            return faces;
        }
    }
    exports.ShapeUtils = ShapeUtils;
});
//# sourceMappingURL=ShapeUtils.js.map