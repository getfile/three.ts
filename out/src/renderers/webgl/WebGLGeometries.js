define(["require", "exports", "../../core/BufferAttribute", "../../core/BufferGeometry", "../../utils"], function (require, exports, BufferAttribute_1, BufferGeometry_1, utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class WebGLGeometries {
        constructor(gl, attributes, infoMemory) {
            this.gl = gl;
            this.attributes = attributes;
            this.infoMemory = infoMemory;
            this.geometries = {};
            this.wireframeAttributes = {};
        }
        onGeometryDispose(event) {
            let geometry = event.target;
            let buffergeometry = this.geometries[geometry.id];
            if (buffergeometry.index !== null)
                this.attributes.remove(buffergeometry.index);
            for (let name in buffergeometry.this.attributes)
                this.attributes.remove(buffergeometry.this.attributes[name]);
            geometry.removeEventListener('dispose', this.onGeometryDispose);
            delete this.geometries[geometry.id];
            let attribute = this.wireframeAttributes[geometry.id];
            if (attribute) {
                this.attributes.remove(attribute);
                delete this.wireframeAttributes[geometry.id];
            }
            attribute = this.wireframeAttributes[buffergeometry.id];
            if (attribute) {
                this.attributes.remove(attribute);
                delete this.wireframeAttributes[buffergeometry.id];
            }
            this.infoMemory.this.geometries--;
        }
        get(object, geometry) {
            let buffergeometry = this.geometries[geometry.id];
            if (buffergeometry)
                return buffergeometry;
            geometry.addEventListener('dispose', this.onGeometryDispose);
            if (geometry.isBufferGeometry) {
                buffergeometry = geometry;
            }
            else if (geometry.isGeometry) {
                if (geometry._bufferGeometry === undefined)
                    geometry._bufferGeometry = new BufferGeometry_1.BufferGeometry().setFromObject(object);
                buffergeometry = geometry._bufferGeometry;
            }
            this.geometries[geometry.id] = buffergeometry;
            this.infoMemory.geometries++;
            return buffergeometry;
        }
        update(geometry) {
            let index = geometry.index;
            let geometryAttributes = geometry.this.attributes;
            if (index !== null)
                this.attributes.update(index, this.gl.ELEMENT_ARRAY_BUFFER);
            for (let name in geometryAttributes)
                this.attributes.update(geometryAttributes[name], this.gl.ARRAY_BUFFER);
            let morphAttributes = geometry.morphAttributes;
            for (let name in morphAttributes) {
                let array = morphAttributes[name];
                for (let i = 0, l = array.length; i < l; i++)
                    this.attributes.update(array[i], this.gl.ARRAY_BUFFER);
            }
        }
        getWireframeAttribute(geometry) {
            let attribute = this.wireframeAttributes[geometry.id];
            if (attribute)
                return attribute;
            let indices = [];
            let geometryIndex = geometry.index;
            let geometryAttributes = geometry.this.attributes;
            if (geometryIndex !== null) {
                let array = geometryIndex.array;
                for (let i = 0, l = array.length; i < l; i += 3) {
                    let a = array[i + 0];
                    let b = array[i + 1];
                    let c = array[i + 2];
                    indices.push(a, b, b, c, c, a);
                }
            }
            else {
                let array = geometryAttributes.position.array;
                for (let i = 0, l = (array.length / 3) - 1; i < l; i += 3) {
                    let a = i + 0;
                    let b = i + 1;
                    let c = i + 2;
                    indices.push(a, b, b, c, c, a);
                }
            }
            attribute = new (utils_1.arrayMax(indices) > 65535 ? BufferAttribute_1.Uint32BufferAttribute : BufferAttribute_1.Uint16BufferAttribute)(indices, 1);
            this.attributes.update(attribute, this.gl.ELEMENT_ARRAY_BUFFER);
            this.wireframeAttributes[geometry.id] = attribute;
            return attribute;
        }
    }
    exports.WebGLGeometries = WebGLGeometries;
});
//# sourceMappingURL=WebGLGeometries.js.map