define(["require", "exports", "./Path", "./Shape", "../ShapeUtils"], function (require, exports, Path_1, Shape_1, ShapeUtils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ShapePath {
        constructor() {
            this.type = 'ShapePath';
            this.subPaths = [];
            this.currentPath = null;
        }
        moveTo(x, y) {
            this.currentPath = new Path_1.Path();
            this.subPaths.push(this.currentPath);
            this.currentPath.moveTo(x, y);
        }
        lineTo(x, y) {
            this.currentPath.lineTo(x, y);
        }
        quadraticCurveTo(aCPx, aCPy, aX, aY) {
            this.currentPath.quadraticCurveTo(aCPx, aCPy, aX, aY);
        }
        bezierCurveTo(aCP1x, aCP1y, aCP2x, aCP2y, aX, aY) {
            this.currentPath.bezierCurveTo(aCP1x, aCP1y, aCP2x, aCP2y, aX, aY);
        }
        splineThru(pts) {
            this.currentPath.splineThru(pts);
        }
        toShapes(isCCW, noHoles) {
            function toShapesNoHoles(inSubpaths) {
                var shapes = [];
                for (var i = 0, l = inSubpaths.length; i < l; i++) {
                    var tmpPath = inSubpaths[i];
                    var tmpShape = new Shape_1.Shape();
                    tmpShape.curves = tmpPath.curves;
                    shapes.push(tmpShape);
                }
                return shapes;
            }
            function isPointInsidePolygon(inPt, inPolygon) {
                var polyLen = inPolygon.length;
                var inside = false;
                for (var p = polyLen - 1, q = 0; q < polyLen; p = q++) {
                    var edgeLowPt = inPolygon[p];
                    var edgeHighPt = inPolygon[q];
                    var edgeDx = edgeHighPt.x - edgeLowPt.x;
                    var edgeDy = edgeHighPt.y - edgeLowPt.y;
                    if (Math.abs(edgeDy) > Number.EPSILON) {
                        if (edgeDy < 0) {
                            edgeLowPt = inPolygon[q];
                            edgeDx = -edgeDx;
                            edgeHighPt = inPolygon[p];
                            edgeDy = -edgeDy;
                        }
                        if ((inPt.y < edgeLowPt.y) || (inPt.y > edgeHighPt.y))
                            continue;
                        if (inPt.y === edgeLowPt.y) {
                            if (inPt.x === edgeLowPt.x)
                                return true;
                        }
                        else {
                            var perpEdge = edgeDy * (inPt.x - edgeLowPt.x) - edgeDx * (inPt.y - edgeLowPt.y);
                            if (perpEdge === 0)
                                return true;
                            if (perpEdge < 0)
                                continue;
                            inside = !inside;
                        }
                    }
                    else {
                        if (inPt.y !== edgeLowPt.y)
                            continue;
                        if (((edgeHighPt.x <= inPt.x) && (inPt.x <= edgeLowPt.x)) ||
                            ((edgeLowPt.x <= inPt.x) && (inPt.x <= edgeHighPt.x)))
                            return true;
                    }
                }
                return inside;
            }
            var isClockWise = ShapeUtils_1.ShapeUtils.isClockWise;
            var subPaths = this.subPaths;
            if (subPaths.length === 0)
                return [];
            if (noHoles === true)
                return toShapesNoHoles(subPaths);
            var solid, tmpPath, tmpShape, shapes = [];
            if (subPaths.length === 1) {
                tmpPath = subPaths[0];
                tmpShape = new Shape_1.Shape();
                tmpShape.curves = tmpPath.curves;
                shapes.push(tmpShape);
                return shapes;
            }
            var holesFirst = !isClockWise(subPaths[0].getPoints());
            holesFirst = isCCW ? !holesFirst : holesFirst;
            var betterShapeHoles = [];
            var newShapes = [];
            var newShapeHoles = [];
            var mainIdx = 0;
            var tmpPoints;
            newShapes[mainIdx] = undefined;
            newShapeHoles[mainIdx] = [];
            for (var i = 0, l = subPaths.length; i < l; i++) {
                tmpPath = subPaths[i];
                tmpPoints = tmpPath.getPoints();
                solid = isClockWise(tmpPoints);
                solid = isCCW ? !solid : solid;
                if (solid) {
                    if ((!holesFirst) && (newShapes[mainIdx]))
                        mainIdx++;
                    newShapes[mainIdx] = { s: new Shape_1.Shape(), p: tmpPoints };
                    newShapes[mainIdx].s.curves = tmpPath.curves;
                    if (holesFirst)
                        mainIdx++;
                    newShapeHoles[mainIdx] = [];
                }
                else {
                    newShapeHoles[mainIdx].push({ h: tmpPath, p: tmpPoints[0] });
                }
            }
            if (!newShapes[0])
                return toShapesNoHoles(subPaths);
            if (newShapes.length > 1) {
                var ambiguous = false;
                var toChange = [];
                for (var sIdx = 0, sLen = newShapes.length; sIdx < sLen; sIdx++) {
                    betterShapeHoles[sIdx] = [];
                }
                for (var sIdx = 0, sLen = newShapes.length; sIdx < sLen; sIdx++) {
                    var sho = newShapeHoles[sIdx];
                    for (var hIdx = 0; hIdx < sho.length; hIdx++) {
                        var ho = sho[hIdx];
                        var hole_unassigned = true;
                        for (var s2Idx = 0; s2Idx < newShapes.length; s2Idx++) {
                            if (isPointInsidePolygon(ho.p, newShapes[s2Idx].p)) {
                                if (sIdx !== s2Idx)
                                    toChange.push({ froms: sIdx, tos: s2Idx, hole: hIdx });
                                if (hole_unassigned) {
                                    hole_unassigned = false;
                                    betterShapeHoles[s2Idx].push(ho);
                                }
                                else
                                    ambiguous = true;
                            }
                        }
                        if (hole_unassigned)
                            betterShapeHoles[sIdx].push(ho);
                    }
                }
                if (toChange.length > 0) {
                    if (!ambiguous)
                        newShapeHoles = betterShapeHoles;
                }
            }
            var tmpHoles;
            for (var i = 0, il = newShapes.length; i < il; i++) {
                tmpShape = newShapes[i].s;
                shapes.push(tmpShape);
                tmpHoles = newShapeHoles[i];
                for (var j = 0, jl = tmpHoles.length; j < jl; j++)
                    tmpShape.holes.push(tmpHoles[j].h);
            }
            return shapes;
        }
    }
    exports.ShapePath = ShapePath;
});
//# sourceMappingURL=ShapePath.js.map