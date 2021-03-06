define(["require", "exports", "../geom/Ray"], function (require, exports, Ray_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Raycaster {
        constructor(origin, direction, near, far) {
            this.linePrecision = 1;
            this.ray = new Ray_1.Ray(origin, direction);
            this.near = near || 0;
            this.far = far || Infinity;
            this.params = {
                Mesh: {},
                Line: {},
                LOD: {},
                Points: { threshold: 1 },
                Sprite: {},
                PointCloud: {
                    get: function () {
                        console.warn('THREE.Raycaster: params.PointCloud has been renamed to params.Points.');
                        return this.Points;
                    }
                }
            };
        }
        set(origin, direction) {
            this.ray.set(origin, direction);
        }
        setFromCamera(coords, camera) {
            if ((camera && camera.isPerspectiveCamera)) {
                this.ray.origin.setFromMatrixPosition(camera.matrixWorld);
                this.ray.direction.set(coords.x, coords.y, 0.5).unproject(camera).sub(this.ray.origin).normalize();
            }
            else if ((camera && camera.isOrthographicCamera)) {
                this.ray.origin.set(coords.x, coords.y, (camera.near + camera.far) / (camera.near - camera.far)).unproject(camera);
                this.ray.direction.set(0, 0, -1).transformDirection(camera.matrixWorld);
            }
            else
                console.error('THREE.Raycaster: Unsupported camera type.');
        }
        intersectObject(object, recursive) {
            var intersects = [];
            intersectObject(object, this, intersects, recursive);
            intersects.sort(ascSort);
            return intersects;
        }
        intersectObjects(objects, recursive) {
            var intersects = [];
            if (Array.isArray(objects) === false) {
                console.warn('THREE.Raycaster.intersectObjects: objects is not an Array.');
                return intersects;
            }
            for (var i = 0, l = objects.length; i < l; i++)
                intersectObject(objects[i], this, intersects, recursive);
            intersects.sort(ascSort);
            return intersects;
        }
    }
    exports.Raycaster = Raycaster;
    function ascSort(a, b) {
        return a.distance - b.distance;
    }
    function intersectObject(object, raycaster, intersects, recursive) {
        if (object.visible === false)
            return;
        object.raycast(raycaster, intersects);
        if (recursive === true) {
            var children = object.children;
            for (var i = 0, l = children.length; i < l; i++)
                intersectObject(children[i], raycaster, intersects, true);
        }
    }
});
//# sourceMappingURL=Raycaster.js.map