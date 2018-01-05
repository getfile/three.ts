define(["require", "exports", "../math/Vector3", "../core/Object3D"], function (require, exports, Vector3_1, Object3D_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class LOD extends Object3D_1.Object3D {
        constructor() {
            super();
            this.type = 'LOD';
            Object.defineProperties(this, {
                levels: {
                    enumerable: true,
                    value: []
                }
            });
        }
        copy(source) {
            super.copy(source, false);
            let levels = source.levels;
            for (let i = 0, l = levels.length; i < l; i++) {
                let level = levels[i];
                this.addLevel(level.object.clone(), level.distance);
            }
            return this;
        }
        addLevel(object, distance) {
            if (distance === undefined)
                distance = 0;
            distance = Math.abs(distance);
            let levels = this.levels;
            let l = 0;
            for (l = 0; l < levels.length; l++) {
                if (distance < levels[l].distance)
                    break;
            }
            levels.splice(l, 0, { distance: distance, object: object });
            this.add(object);
        }
        getObjectForDistance(distance) {
            let levels = this.levels;
            for (var i = 1, l = levels.length; i < l; i++) {
                if (distance < levels[i].distance)
                    break;
            }
            return levels[i - 1].object;
        }
        raycast(raycaster, intersects) {
            let matrixPosition = new Vector3_1.Vector3();
            matrixPosition.setFromMatrixPosition(this.matrixWorld);
            let distance = raycaster.ray.origin.distanceTo(matrixPosition);
            this.getObjectForDistance(distance).raycast(raycaster, intersects);
        }
        update(camera) {
            let v1 = new Vector3_1.Vector3();
            let v2 = new Vector3_1.Vector3();
            let levels = this.levels;
            if (levels.length > 1) {
                v1.setFromMatrixPosition(camera.matrixWorld);
                v2.setFromMatrixPosition(this.matrixWorld);
                let distance = v1.distanceTo(v2);
                levels[0].object.visible = true;
                for (var i = 1, l = levels.length; i < l; i++) {
                    if (distance >= levels[i].distance) {
                        levels[i - 1].object.visible = false;
                        levels[i].object.visible = true;
                    }
                    else
                        break;
                }
                for (; i < l; i++)
                    levels[i].object.visible = false;
            }
        }
        toJSON(meta) {
            let data = super.toJSON(meta);
            data.object.levels = [];
            let levels = this.levels;
            for (let i = 0, l = levels.length; i < l; i++) {
                let level = levels[i];
                data.object.levels.push({
                    object: level.object.uuid,
                    distance: level.distance
                });
            }
            return data;
        }
    }
    exports.LOD = LOD;
});
//# sourceMappingURL=LOD.js.map