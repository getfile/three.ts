define(["require", "exports", "../objects/LineSegments", "../materials/LineBasicMaterial", "../core/BufferAttribute", "../core/BufferAttribute", "../core/BufferGeometry"], function (require, exports, LineSegments_1, LineBasicMaterial_1, BufferAttribute_1, BufferAttribute_2, BufferGeometry_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Box3Helper extends LineSegments_1.LineSegments {
        constructor(box, hex) {
            super();
            this.type = 'Box3Helper';
            this.box = box;
            var color = (hex !== undefined) ? hex : 0xffff00;
            var indices = new Uint16Array([0, 1, 1, 2, 2, 3, 3, 0, 4, 5, 5, 6, 6, 7, 7, 4, 0, 4, 1, 5, 2, 6, 3, 7]);
            var positions = [1, 1, 1, -1, 1, 1, -1, -1, 1, 1, -1, 1, 1, 1, -1, -1, 1, -1, -1, -1, -1, 1, -1, -1];
            var geometry = new BufferGeometry_1.BufferGeometry();
            geometry.setIndex(new BufferAttribute_1.BufferAttribute(indices, 1));
            geometry.addAttribute('position', new BufferAttribute_2.Float32BufferAttribute(positions, 3));
            LineSegments_1.LineSegments.call(this, geometry, new LineBasicMaterial_1.LineBasicMaterial({ color: color }));
            this.geometry.computeBoundingSphere();
        }
        updateMatrixWorld(force) {
            var box = this.box;
            if (box.isEmpty())
                return;
            box.getCenter(this.position);
            box.getSize(this.scale);
            this.scale.multiplyScalar(0.5);
            super.updateMatrixWorld(force);
        }
    }
    exports.Box3Helper = Box3Helper;
});
//# sourceMappingURL=Box3Helper.js.map