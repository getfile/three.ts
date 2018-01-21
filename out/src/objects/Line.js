define(["require", "exports", "../geom/Sphere", "../geom/Ray", "../core/Object3D", "../core/BufferGeometry", "../math/Matrix4", "../math/Vector3", "../materials/LineBasicMaterial", "./LineSegments"], function (require, exports, Sphere_1, Ray_1, Object3D_1, BufferGeometry_1, Matrix4_1, Vector3_1, LineBasicMaterial_1, LineSegments_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Line extends Object3D_1.Object3D {
        constructor(geometry, material, data) {
            super();
            this.type = 'Line';
            this.geometry = geometry !== undefined ? geometry : new BufferGeometry_1.BufferGeometry();
            this.material = material !== undefined ? material : new LineBasicMaterial_1.LineBasicMaterial({ color: Math.random() * 0xffffff });
        }
        raycast(raycaster, intersects) {
            var inverseMatrix = new Matrix4_1.Matrix4();
            var ray = new Ray_1.Ray();
            var sphere = new Sphere_1.Sphere();
            var precision = raycaster.linePrecision;
            var precisionSq = precision * precision;
            var geometry = this.geometry;
            var matrixWorld = this.matrixWorld;
            if (geometry.boundingSphere === null)
                geometry.computeBoundingSphere();
            sphere.copy(geometry.boundingSphere);
            sphere.applyMatrix4(matrixWorld);
            if (raycaster.ray.intersectsSphere(sphere) === false)
                return;
            inverseMatrix.getInverse(matrixWorld);
            ray.copy(raycaster.ray).applyMatrix4(inverseMatrix);
            var vStart = new Vector3_1.Vector3();
            var vEnd = new Vector3_1.Vector3();
            var interSegment = new Vector3_1.Vector3();
            var interRay = new Vector3_1.Vector3();
            var step = (this && this instanceof LineSegments_1.LineSegments) ? 2 : 1;
            if (geometry.isBufferGeometry) {
                var index = geometry.index;
                var attributes = geometry.attributes;
                var positions = attributes.position.array;
                if (index !== null) {
                    var indices = index.array;
                    for (var i = 0, l = indices.length - 1; i < l; i += step) {
                        var a = indices[i];
                        var b = indices[i + 1];
                        vStart.fromArray(positions, a * 3);
                        vEnd.fromArray(positions, b * 3);
                        var distSq = ray.distanceSqToSegment(vStart, vEnd, interRay, interSegment);
                        if (distSq > precisionSq)
                            continue;
                        interRay.applyMatrix4(this.matrixWorld);
                        var distance = raycaster.ray.origin.distanceTo(interRay);
                        if (distance < raycaster.near || distance > raycaster.far)
                            continue;
                        intersects.push({
                            distance: distance,
                            point: interSegment.clone().applyMatrix4(this.matrixWorld),
                            index: i,
                            face: null,
                            faceIndex: null,
                            object: this
                        });
                    }
                }
                else {
                    for (var i = 0, l = positions.length / 3 - 1; i < l; i += step) {
                        vStart.fromArray(positions, 3 * i);
                        vEnd.fromArray(positions, 3 * i + 3);
                        var distSq = ray.distanceSqToSegment(vStart, vEnd, interRay, interSegment);
                        if (distSq > precisionSq)
                            continue;
                        interRay.applyMatrix4(this.matrixWorld);
                        var distance = raycaster.ray.origin.distanceTo(interRay);
                        if (distance < raycaster.near || distance > raycaster.far)
                            continue;
                        intersects.push({
                            distance: distance,
                            point: interSegment.clone().applyMatrix4(this.matrixWorld),
                            index: i,
                            face: null,
                            faceIndex: null,
                            object: this
                        });
                    }
                }
            }
            else if (geometry.isGeometry) {
                var vertices = geometry.vertices;
                var nbVertices = vertices.length;
                for (var i = 0; i < nbVertices - 1; i += step) {
                    var distSq = ray.distanceSqToSegment(vertices[i], vertices[i + 1], interRay, interSegment);
                    if (distSq > precisionSq)
                        continue;
                    interRay.applyMatrix4(this.matrixWorld);
                    var distance = raycaster.ray.origin.distanceTo(interRay);
                    if (distance < raycaster.near || distance > raycaster.far)
                        continue;
                    intersects.push({
                        distance: distance,
                        point: interSegment.clone().applyMatrix4(this.matrixWorld),
                        index: i,
                        face: null,
                        faceIndex: null,
                        object: this
                    });
                }
            }
        }
        clone() {
            return new Line(this.geometry, this.material).copy(this);
        }
    }
    exports.Line = Line;
});
//# sourceMappingURL=Line.js.map