define(["require", "exports", "../geom/Sphere", "../geom/Ray", "../core/Object3D", "../core/BufferGeometry", "../math/Matrix4", "../math/Vector3", "../materials/PointsMaterial"], function (require, exports, Sphere_1, Ray_1, Object3D_1, BufferGeometry_1, Matrix4_1, Vector3_1, PointsMaterial_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Points extends Object3D_1.Object3D {
        constructor(geometry, material) {
            super();
            this.type = 'Points';
            this.geometry = geometry !== undefined ? geometry : new BufferGeometry_1.BufferGeometry();
            this.material = material !== undefined ? material : new PointsMaterial_1.PointsMaterial({ color: Math.random() * 0xffffff });
        }
        raycast(raycaster, intersects) {
            let inverseMatrix = new Matrix4_1.Matrix4();
            let ray = new Ray_1.Ray();
            let sphere = new Sphere_1.Sphere();
            let object = this;
            let geometry = this.geometry;
            let matrixWorld = this.matrixWorld;
            let threshold = raycaster.params.Points.threshold;
            if (geometry.boundingSphere === null)
                geometry.computeBoundingSphere();
            sphere.copy(geometry.boundingSphere);
            sphere.applyMatrix4(matrixWorld);
            sphere.radius += threshold;
            if (raycaster.ray.intersectsSphere(sphere) === false)
                return;
            inverseMatrix.getInverse(matrixWorld);
            ray.copy(raycaster.ray).applyMatrix4(inverseMatrix);
            let localThreshold = threshold / ((this.scale.x + this.scale.y + this.scale.z) / 3);
            let localThresholdSq = localThreshold * localThreshold;
            let position = new Vector3_1.Vector3();
            function testPoint(point, index) {
                let rayPointDistanceSq = ray.distanceSqToPoint(point);
                if (rayPointDistanceSq < localThresholdSq) {
                    let intersectPoint = ray.closestPointToPoint(point);
                    intersectPoint.applyMatrix4(matrixWorld);
                    let distance = raycaster.ray.origin.distanceTo(intersectPoint);
                    if (distance < raycaster.near || distance > raycaster.far)
                        return;
                    intersects.push({
                        distance: distance,
                        distanceToRay: Math.sqrt(rayPointDistanceSq),
                        point: intersectPoint.clone(),
                        index: index,
                        face: null,
                        object: object
                    });
                }
            }
            if (geometry.isBufferGeometry) {
                let index = geometry.index;
                let attributes = geometry.attributes;
                let positions = attributes.position.array;
                if (index !== null) {
                    let indices = index.array;
                    for (let i = 0, il = indices.length; i < il; i++) {
                        let a = indices[i];
                        position.fromArray(positions, a * 3);
                        testPoint(position, a);
                    }
                }
                else {
                    for (let i = 0, l = positions.length / 3; i < l; i++) {
                        position.fromArray(positions, i * 3);
                        testPoint(position, i);
                    }
                }
            }
            else {
                let vertices = geometry.vertices;
                for (let i = 0, l = vertices.length; i < l; i++)
                    testPoint(vertices[i], i);
            }
        }
        clone() {
            return new Points(this.geometry, this.material).copy(this);
        }
    }
    exports.Points = Points;
});
//# sourceMappingURL=Points.js.map