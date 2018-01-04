define(["require", "exports", "../math/Vector3", "../core/Object3D", "../materials/SpriteMaterial"], function (require, exports, Vector3_1, Object3D_1, SpriteMaterial_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Sprite extends Object3D_1.Object3D {
        constructor(material) {
            super();
            this.type = 'Sprite';
            this.material = (material !== undefined) ? material : new SpriteMaterial_1.SpriteMaterial();
        }
        raycast(raycaster, intersects) {
            var intersectPoint = new Vector3_1.Vector3();
            var worldPosition = new Vector3_1.Vector3();
            var worldScale = new Vector3_1.Vector3();
            worldPosition.setFromMatrixPosition(this.matrixWorld);
            raycaster.ray.closestPointToPoint(worldPosition, intersectPoint);
            worldScale.setFromMatrixScale(this.matrixWorld);
            var guessSizeSq = worldScale.x * worldScale.y / 4;
            if (worldPosition.distanceToSquared(intersectPoint) > guessSizeSq)
                return;
            var distance = raycaster.ray.origin.distanceTo(intersectPoint);
            if (distance < raycaster.near || distance > raycaster.far)
                return;
            intersects.push({
                distance: distance,
                point: intersectPoint.clone(),
                face: null,
                object: this
            });
        }
        clone() {
            return new Sprite(this.material).copy(this);
        }
    }
    exports.Sprite = Sprite;
});
//# sourceMappingURL=Sprite.js.map