define(["require", "exports", "../core/Object3D", "../constants", "../math/Color", "../math/Vector3"], function (require, exports, Object3D_1, constants_1, Color_1, Vector3_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class LensFlare extends Object3D_1.Object3D {
        constructor(texture, size, distance, blending, color) {
            super();
            this.lensFlares = [];
            this.positionScreen = new Vector3_1.Vector3();
            this.customUpdateCallback = undefined;
            if (texture !== undefined)
                this.add(texture, size, distance, blending, color);
        }
        copy(source) {
            super.copy(source);
            this.positionScreen.copy(source.positionScreen);
            this.customUpdateCallback = source.customUpdateCallback;
            for (var i = 0, l = source.lensFlares.length; i < l; i++)
                this.lensFlares.push(source.lensFlares[i]);
            return this;
        }
        add(texture, size, distance, blending, color, opacity = 1) {
            if (size === undefined)
                size = -1;
            if (distance === undefined)
                distance = 0;
            if (opacity === undefined)
                opacity = 1;
            if (color === undefined)
                color = new Color_1.Color(0xffffff);
            if (blending === undefined)
                blending = constants_1.NormalBlending;
            distance = Math.min(distance, Math.max(0, distance));
            this.lensFlares.push({
                texture: texture,
                size: size,
                distance: distance,
                x: 0, y: 0, z: 0,
                scale: 1,
                rotation: 0,
                opacity: opacity,
                color: color,
                blending: blending
            });
        }
        updateLensFlares() {
            var f, fl = this.lensFlares.length;
            var flare;
            var vecX = -this.positionScreen.x * 2;
            var vecY = -this.positionScreen.y * 2;
            for (f = 0; f < fl; f++) {
                flare = this.lensFlares[f];
                flare.x = this.positionScreen.x + vecX * flare.distance;
                flare.y = this.positionScreen.y + vecY * flare.distance;
                flare.wantedRotation = flare.x * Math.PI * 0.25;
                flare.rotation += (flare.wantedRotation - flare.rotation) * 0.25;
            }
        }
    }
    exports.LensFlare = LensFlare;
});
//# sourceMappingURL=LensFlare.js.map