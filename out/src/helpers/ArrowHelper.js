define(["require", "exports", "../core/BufferAttribute", "../core/BufferGeometry", "../core/Object3D", "../geometries/CylinderGeometry", "../materials/MeshBasicMaterial", "../materials/LineBasicMaterial", "../objects/Mesh", "../objects/Line", "../math/Vector3"], function (require, exports, BufferAttribute_1, BufferGeometry_1, Object3D_1, CylinderGeometry_1, MeshBasicMaterial_1, LineBasicMaterial_1, Mesh_1, Line_1, Vector3_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var lineGeometry, coneGeometry;
    class ArrowHelper extends Object3D_1.Object3D {
        constructor(dir, origin, length, color, headLength, headWidth) {
            super();
            if (color === undefined)
                color = 0xffff00;
            if (length === undefined)
                length = 1;
            if (headLength === undefined)
                headLength = 0.2 * length;
            if (headWidth === undefined)
                headWidth = 0.2 * headLength;
            if (lineGeometry === undefined) {
                lineGeometry = new BufferGeometry_1.BufferGeometry();
                lineGeometry.addAttribute('position', new BufferAttribute_1.Float32BufferAttribute([0, 0, 0, 0, 1, 0], 3));
                coneGeometry = new CylinderGeometry_1.CylinderBufferGeometry(0, 0.5, 1, 5, 1);
                coneGeometry.translate(0, -0.5, 0);
            }
            this.position.copy(origin);
            this.line = new Line_1.Line(lineGeometry, new LineBasicMaterial_1.LineBasicMaterial({ color: color }));
            this.line.matrixAutoUpdate = false;
            this.add(this.line);
            this.cone = new Mesh_1.Mesh(coneGeometry, new MeshBasicMaterial_1.MeshBasicMaterial({ color: color }));
            this.cone.matrixAutoUpdate = false;
            this.add(this.cone);
            this.setDirection(dir);
            this.setLength(length, headLength, headWidth);
        }
        setDirection(dir) {
            var axis = new Vector3_1.Vector3();
            var radians;
            if (dir.y > 0.99999)
                this.quaternion.set(0, 0, 0, 1);
            else if (dir.y < -0.99999)
                this.quaternion.set(1, 0, 0, 0);
            else {
                axis.set(dir.z, 0, -dir.x).normalize();
                radians = Math.acos(dir.y);
                this.quaternion.setFromAxisAngle(axis, radians);
            }
        }
        setLength(length, headLength, headWidth) {
            if (headLength === undefined)
                headLength = 0.2 * length;
            if (headWidth === undefined)
                headWidth = 0.2 * headLength;
            this.line.scale.set(1, Math.max(0, length - headLength), 1);
            this.line.updateMatrix();
            this.cone.scale.set(headWidth, headLength, headWidth);
            this.cone.position.y = length;
            this.cone.updateMatrix();
        }
        setColor(color) {
            this.line.material.color.copy(color);
            this.cone.material.color.copy(color);
        }
    }
    exports.ArrowHelper = ArrowHelper;
});
//# sourceMappingURL=ArrowHelper.js.map