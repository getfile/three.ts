define(["require", "exports", "./Path", "../../math/Math"], function (require, exports, Path_1, Math_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Shape extends Path_1.Path {
        constructor(points) {
            super(points);
            this.uuid = Math_1._Math.generateUUID();
            this.type = 'Shape';
            this.holes = [];
        }
        getPointsHoles(divisions) {
            var holesPts = [];
            for (var i = 0, l = this.holes.length; i < l; i++)
                holesPts[i] = this.holes[i].getPoints(divisions);
            return holesPts;
        }
        extractPoints(divisions) {
            return {
                shape: this.getPoints(divisions),
                holes: this.getPointsHoles(divisions)
            };
        }
        copy(source) {
            super.copy(source);
            this.holes = [];
            for (var i = 0, l = source.holes.length; i < l; i++) {
                var hole = source.holes[i];
                this.holes.push(hole.clone());
            }
            return this;
        }
        toJSON() {
            var data = super.toJSON();
            data.uuid = this.uuid;
            data.holes = [];
            for (var i = 0, l = this.holes.length; i < l; i++) {
                var hole = this.holes[i];
                data.holes.push(hole.toJSON());
            }
            return data;
        }
        fromJSON(json) {
            super.fromJSON(json);
            this.uuid = json.uuid;
            this.holes = [];
            for (var i = 0, l = json.holes.length; i < l; i++) {
                var hole = json.holes[i];
                this.holes.push(new Path_1.Path().fromJSON(hole));
            }
            return this;
        }
    }
    exports.Shape = Shape;
});
//# sourceMappingURL=Shape.js.map