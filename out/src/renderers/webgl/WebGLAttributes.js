define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class WebGLAttributes {
        constructor(gl) {
            this.gl = gl;
            this.buffers = {};
        }
        createBuffer(attribute, bufferType) {
            let array = attribute.array;
            let usage = attribute.dynamic ? this.gl.DYNAMIC_DRAW : this.gl.STATIC_DRAW;
            let buffer = this.gl.createBuffer();
            this.gl.bindBuffer(bufferType, buffer);
            this.gl.bufferData(bufferType, array, usage);
            attribute.onUploadCallback();
            let type = this.gl.FLOAT;
            if (array instanceof Float32Array)
                type = this.gl.FLOAT;
            else if (array instanceof Float64Array)
                console.warn('THREE.WebGLAttributes: Unsupported data buffer format: Float64Array.');
            else if (array instanceof Uint16Array)
                type = this.gl.UNSIGNED_SHORT;
            else if (array instanceof Int16Array)
                type = this.gl.SHORT;
            else if (array instanceof Uint32Array)
                type = this.gl.UNSIGNED_INT;
            else if (array instanceof Int32Array)
                type = this.gl.INT;
            else if (array instanceof Int8Array)
                type = this.gl.BYTE;
            else if (array instanceof Uint8Array)
                type = this.gl.UNSIGNED_BYTE;
            return {
                buffer: buffer,
                type: type,
                bytesPerElement: array.BYTES_PER_ELEMENT,
                version: attribute.version
            };
        }
        updateBuffer(buffer, attribute, bufferType) {
            let array = attribute.array;
            let updateRange = attribute.updateRange;
            this.gl.bindBuffer(bufferType, buffer);
            if (attribute.dynamic === false)
                this.gl.bufferData(bufferType, array, this.gl.STATIC_DRAW);
            else if (updateRange.count === -1)
                this.gl.bufferSubData(bufferType, 0, array);
            else if (updateRange.count === 0)
                console.error('THREE.WebGLObjects.updateBuffer: dynamic THREE.BufferAttribute marked as needsUpdate but updateRange.count is 0, ensure you are using set methods or updating manually.');
            else {
                this.gl.bufferSubData(bufferType, updateRange.offset * array.BYTES_PER_ELEMENT, array.subarray(updateRange.offset, updateRange.offset + updateRange.count));
                updateRange.count = -1;
            }
        }
        get(attribute) {
            if (attribute.isInterleavedBufferAttribute)
                attribute = attribute.data;
            return this.buffers[attribute.uuid];
        }
        remove(attribute) {
            if (attribute.isInterleavedBufferAttribute)
                attribute = attribute.data;
            let data = this.buffers[attribute.uuid];
            if (data) {
                this.gl.deleteBuffer(data.buffer);
                delete this.buffers[attribute.uuid];
            }
        }
        update(attribute, bufferType) {
            if (attribute.isInterleavedBufferAttribute)
                attribute = attribute.data;
            let data = this.buffers[attribute.uuid];
            if (data === undefined)
                this.buffers[attribute.uuid] = this.createBuffer(attribute, bufferType);
            else if (data.version < attribute.version) {
                this.updateBuffer(data.buffer, attribute, bufferType);
                data.version = attribute.version;
            }
        }
    }
    exports.WebGLAttributes = WebGLAttributes;
});
//# sourceMappingURL=WebGLAttributes.js.map