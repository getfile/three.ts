define(["require", "exports", "../math/Vector3", "../geom/Box3", "../geom/Sphere", "./EventDispatcher", "./BufferAttribute", "./DirectGeometry", "./Object3D", "../math/Matrix4", "../math/Matrix3", "../math/Math", "../utils"], function (require, exports, Vector3_1, Box3_1, Sphere_1, EventDispatcher_1, BufferAttribute_1, DirectGeometry_1, Object3D_1, Matrix4_1, Matrix3_1, Math_1, utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var bufferGeometryId = 1;
    class BufferGeometry extends EventDispatcher_1.EventDispatcher {
        constructor() {
            super();
            this.id = bufferGeometryId += 2;
            this.uuid = Math_1._Math.generateUUID();
            this.name = '';
            this.type = 'BufferGeometry';
            this.index = null;
            this.attributes = {};
            this.morphAttributes = {};
            this.groups = [];
            this.boundingBox = null;
            this.boundingSphere = null;
            this.drawRange = { start: 0, count: Infinity };
        }
        getIndex() {
            return this.index;
        }
        setIndex(index) {
            if (Array.isArray(index))
                this.index = new (utils_1.arrayMax(index) > 65535 ? BufferAttribute_1.Uint32BufferAttribute : BufferAttribute_1.Uint16BufferAttribute)(index, 1);
            else
                this.index = index;
        }
        addAttribute(name, attribute) {
            if (!(attribute && attribute.isBufferAttribute) && !(attribute && attribute.isInterleavedBufferAttribute)) {
                console.warn('THREE.BufferGeometry: .addAttribute() now expects ( name, attribute ).');
                this.addAttribute(name, new BufferAttribute_1.BufferAttribute(arguments[1], arguments[2]));
                return;
            }
            if (name === 'index') {
                console.warn('THREE.BufferGeometry.addAttribute: Use .setIndex() for index attribute.');
                this.setIndex(attribute);
                return;
            }
            this.attributes[name] = attribute;
            return this;
        }
        getAttribute(name) {
            return this.attributes[name];
        }
        removeAttribute(name) {
            delete this.attributes[name];
            return this;
        }
        addGroup(start, count, materialIndex) {
            this.groups.push({
                start: start,
                count: count,
                materialIndex: materialIndex !== undefined ? materialIndex : 0
            });
        }
        clearGroups() {
            this.groups = [];
        }
        setDrawRange(start, count) {
            this.drawRange.start = start;
            this.drawRange.count = count;
        }
        applyMatrix(matrix) {
            var position = this.attributes.position;
            if (position !== undefined) {
                matrix.applyToBufferAttribute(position);
                position.needsUpdate = true;
            }
            var normal = this.attributes.normal;
            if (normal !== undefined) {
                var normalMatrix = new Matrix3_1.Matrix3().getNormalMatrix(matrix);
                normalMatrix.applyToBufferAttribute(normal);
                normal.needsUpdate = true;
            }
            if (this.boundingBox !== null)
                this.computeBoundingBox();
            if (this.boundingSphere !== null)
                this.computeBoundingSphere();
            return this;
        }
        rotateX(angle) {
            var m1 = new Matrix4_1.Matrix4();
            m1.makeRotationX(angle);
            this.applyMatrix(m1);
            return this;
        }
        rotateY(angle) {
            var m1 = new Matrix4_1.Matrix4();
            m1.makeRotationY(angle);
            this.applyMatrix(m1);
            return this;
        }
        rotateZ(angle) {
            var m1 = new Matrix4_1.Matrix4();
            m1.makeRotationZ(angle);
            this.applyMatrix(m1);
            return this;
        }
        translate(x, y, z) {
            var m1 = new Matrix4_1.Matrix4();
            m1.makeTranslation(x, y, z);
            this.applyMatrix(m1);
            return this;
        }
        ;
        scale(x, y, z) {
            var m1 = new Matrix4_1.Matrix4();
            m1.makeScale(x, y, z);
            this.applyMatrix(m1);
            return this;
        }
        lookAt(vector) {
            var obj = new Object3D_1.Object3D();
            obj.lookAt(vector);
            obj.updateMatrix();
            this.applyMatrix(obj.matrix);
        }
        ;
        center() {
            this.computeBoundingBox();
            var offset = this.boundingBox.getCenter().negate();
            this.translate(offset.x, offset.y, offset.z);
            return offset;
        }
        setFromObject(object) {
            var geometry = object.geometry;
            if (object.isPoints || object.isLine) {
                var positions = new BufferAttribute_1.Float32BufferAttribute(geometry.vertices.length * 3, 3);
                var colors = new BufferAttribute_1.Float32BufferAttribute(geometry.colors.length * 3, 3);
                this.addAttribute('position', positions.copyVector3sArray(geometry.vertices));
                this.addAttribute('color', colors.copyColorsArray(geometry.colors));
                if (geometry.lineDistances && geometry.lineDistances.length === geometry.vertices.length) {
                    var lineDistances = new BufferAttribute_1.Float32BufferAttribute(geometry.lineDistances.length, 1);
                    this.addAttribute('lineDistance', lineDistances.copyArray(geometry.lineDistances));
                }
                if (geometry.boundingSphere !== null)
                    this.boundingSphere = geometry.boundingSphere.clone();
                if (geometry.boundingBox !== null)
                    this.boundingBox = geometry.boundingBox.clone();
            }
            else if (object.isMesh) {
                if (geometry && geometry.isGeometry)
                    this.fromGeometry(geometry);
            }
            return this;
        }
        setFromPoints(points) {
            var position = [];
            for (var i = 0, l = points.length; i < l; i++) {
                var point = points[i];
                position.push(point.x, point.y, point.z || 0);
            }
            this.addAttribute('position', new BufferAttribute_1.Float32BufferAttribute(position, 3));
            return this;
        }
        updateFromObject(object) {
            var geometry = object.geometry;
            if (object.isMesh) {
                var direct = geometry.__directGeometry;
                if (geometry.elementsNeedUpdate === true) {
                    direct = undefined;
                    geometry.elementsNeedUpdate = false;
                }
                if (direct === undefined)
                    return this.fromGeometry(geometry);
                direct.verticesNeedUpdate = geometry.verticesNeedUpdate;
                direct.normalsNeedUpdate = geometry.normalsNeedUpdate;
                direct.colorsNeedUpdate = geometry.colorsNeedUpdate;
                direct.uvsNeedUpdate = geometry.uvsNeedUpdate;
                direct.groupsNeedUpdate = geometry.groupsNeedUpdate;
                geometry.verticesNeedUpdate = false;
                geometry.normalsNeedUpdate = false;
                geometry.colorsNeedUpdate = false;
                geometry.uvsNeedUpdate = false;
                geometry.groupsNeedUpdate = false;
                geometry = direct;
            }
            var attribute;
            if (geometry.verticesNeedUpdate === true) {
                attribute = this.attributes.position;
                if (attribute !== undefined) {
                    attribute.copyVector3sArray(geometry.vertices);
                    attribute.needsUpdate = true;
                }
                geometry.verticesNeedUpdate = false;
            }
            if (geometry.normalsNeedUpdate === true) {
                attribute = this.attributes.normal;
                if (attribute !== undefined) {
                    attribute.copyVector3sArray(geometry.normals);
                    attribute.needsUpdate = true;
                }
                geometry.normalsNeedUpdate = false;
            }
            if (geometry.colorsNeedUpdate === true) {
                attribute = this.attributes.color;
                if (attribute !== undefined) {
                    attribute.copyColorsArray(geometry.colors);
                    attribute.needsUpdate = true;
                }
                geometry.colorsNeedUpdate = false;
            }
            if (geometry.uvsNeedUpdate) {
                attribute = this.attributes.uv;
                if (attribute !== undefined) {
                    attribute.copyVector2sArray(geometry.uvs);
                    attribute.needsUpdate = true;
                }
                geometry.uvsNeedUpdate = false;
            }
            if (geometry.lineDistancesNeedUpdate) {
                attribute = this.attributes.lineDistance;
                if (attribute !== undefined) {
                    attribute.copyArray(geometry.lineDistances);
                    attribute.needsUpdate = true;
                }
                geometry.lineDistancesNeedUpdate = false;
            }
            if (geometry.groupsNeedUpdate) {
                geometry.computeGroups(object.geometry);
                this.groups = geometry.groups;
                geometry.groupsNeedUpdate = false;
            }
            return this;
        }
        fromGeometry(geometry) {
            geometry.__directGeometry = new DirectGeometry_1.DirectGeometry().fromGeometry(geometry);
            return this.fromDirectGeometry(geometry.__directGeometry);
        }
        fromDirectGeometry(geometry) {
            var positions = new Float32Array(geometry.vertices.length * 3);
            this.addAttribute('position', new BufferAttribute_1.BufferAttribute(positions, 3).copyVector3sArray(geometry.vertices));
            if (geometry.normals.length > 0) {
                var normals = new Float32Array(geometry.normals.length * 3);
                this.addAttribute('normal', new BufferAttribute_1.BufferAttribute(normals, 3).copyVector3sArray(geometry.normals));
            }
            if (geometry.colors.length > 0) {
                var colors = new Float32Array(geometry.colors.length * 3);
                this.addAttribute('color', new BufferAttribute_1.BufferAttribute(colors, 3).copyColorsArray(geometry.colors));
            }
            if (geometry.uvs.length > 0) {
                var uvs = new Float32Array(geometry.uvs.length * 2);
                this.addAttribute('uv', new BufferAttribute_1.BufferAttribute(uvs, 2).copyVector2sArray(geometry.uvs));
            }
            if (geometry.uvs2.length > 0) {
                var uvs2 = new Float32Array(geometry.uvs2.length * 2);
                this.addAttribute('uv2', new BufferAttribute_1.BufferAttribute(uvs2, 2).copyVector2sArray(geometry.uvs2));
            }
            if (geometry.indices.length > 0) {
                var TypeArray = utils_1.arrayMax(geometry.indices) > 65535 ? Uint32Array : Uint16Array;
                var indices = new TypeArray(geometry.indices.length * 3);
                this.setIndex(new BufferAttribute_1.BufferAttribute(indices, 1).copyIndicesArray(geometry.indices));
            }
            this.groups = geometry.groups;
            for (var name in geometry.morphTargets) {
                var array = [];
                var morphTargets = geometry.morphTargets[name];
                for (var i = 0, l = morphTargets.length; i < l; i++) {
                    var morphTarget = morphTargets[i];
                    var attribute = new BufferAttribute_1.Float32BufferAttribute(morphTarget.length * 3, 3);
                    array.push(attribute.copyVector3sArray(morphTarget));
                }
                this.morphAttributes[name] = array;
            }
            if (geometry.skinIndices.length > 0) {
                var skinIndices = new BufferAttribute_1.Float32BufferAttribute(geometry.skinIndices.length * 4, 4);
                this.addAttribute('skinIndex', skinIndices.copyVector4sArray(geometry.skinIndices));
            }
            if (geometry.skinWeights.length > 0) {
                var skinWeights = new BufferAttribute_1.Float32BufferAttribute(geometry.skinWeights.length * 4, 4);
                this.addAttribute('skinWeight', skinWeights.copyVector4sArray(geometry.skinWeights));
            }
            if (geometry.boundingSphere !== null)
                this.boundingSphere = geometry.boundingSphere.clone();
            if (geometry.boundingBox !== null)
                this.boundingBox = geometry.boundingBox.clone();
            return this;
        }
        computeBoundingBox() {
            if (this.boundingBox === null)
                this.boundingBox = new Box3_1.Box3();
            var position = this.attributes.position;
            if (position !== undefined)
                this.boundingBox.setFromBufferAttribute(position);
            else
                this.boundingBox.makeEmpty();
            if (isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z))
                console.error('THREE.BufferGeometry.computeBoundingBox: Computed min/max have NaN values. The "position" attribute is likely to have NaN values.', this);
        }
        computeBoundingSphere() {
            var box = new Box3_1.Box3();
            var vector = new Vector3_1.Vector3();
            if (this.boundingSphere === null)
                this.boundingSphere = new Sphere_1.Sphere();
            var position = this.attributes.position;
            if (position) {
                var center = this.boundingSphere.center;
                box.setFromBufferAttribute(position);
                box.getCenter(center);
                var maxRadiusSq = 0;
                for (var i = 0, il = position.count; i < il; i++) {
                    vector.x = position.getX(i);
                    vector.y = position.getY(i);
                    vector.z = position.getZ(i);
                    maxRadiusSq = Math.max(maxRadiusSq, center.distanceToSquared(vector));
                }
                this.boundingSphere.radius = Math.sqrt(maxRadiusSq);
                if (isNaN(this.boundingSphere.radius))
                    console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.', this);
            }
        }
        computeFaceNormals() {
        }
        computeVertexNormals() {
            var index = this.index;
            var attributes = this.attributes;
            var groups = this.groups;
            if (attributes.position) {
                var positions = attributes.position.array;
                if (attributes.normal === undefined)
                    this.addAttribute('normal', new BufferAttribute_1.BufferAttribute(new Float32Array(positions.length), 3));
                else {
                    var array = attributes.normal.array;
                    for (var i = 0, il = array.length; i < il; i++)
                        array[i] = 0;
                }
                var normals = attributes.normal.array;
                var vA, vB, vC;
                var pA = new Vector3_1.Vector3(), pB = new Vector3_1.Vector3(), pC = new Vector3_1.Vector3();
                var cb = new Vector3_1.Vector3(), ab = new Vector3_1.Vector3();
                if (index) {
                    var indices = index.array;
                    if (groups.length === 0)
                        this.addGroup(0, indices.length);
                    for (var j = 0, jl = groups.length; j < jl; ++j) {
                        var group = groups[j];
                        var start = group.start;
                        var count = group.count;
                        for (var i = start, il = start + count; i < il; i += 3) {
                            vA = indices[i + 0] * 3;
                            vB = indices[i + 1] * 3;
                            vC = indices[i + 2] * 3;
                            pA.fromArray(positions, vA);
                            pB.fromArray(positions, vB);
                            pC.fromArray(positions, vC);
                            cb.subVectors(pC, pB);
                            ab.subVectors(pA, pB);
                            cb.cross(ab);
                            normals[vA] += cb.x;
                            normals[vA + 1] += cb.y;
                            normals[vA + 2] += cb.z;
                            normals[vB] += cb.x;
                            normals[vB + 1] += cb.y;
                            normals[vB + 2] += cb.z;
                            normals[vC] += cb.x;
                            normals[vC + 1] += cb.y;
                            normals[vC + 2] += cb.z;
                        }
                    }
                }
                else {
                    for (var i = 0, il = positions.length; i < il; i += 9) {
                        pA.fromArray(positions, i);
                        pB.fromArray(positions, i + 3);
                        pC.fromArray(positions, i + 6);
                        cb.subVectors(pC, pB);
                        ab.subVectors(pA, pB);
                        cb.cross(ab);
                        normals[i] = cb.x;
                        normals[i + 1] = cb.y;
                        normals[i + 2] = cb.z;
                        normals[i + 3] = cb.x;
                        normals[i + 4] = cb.y;
                        normals[i + 5] = cb.z;
                        normals[i + 6] = cb.x;
                        normals[i + 7] = cb.y;
                        normals[i + 8] = cb.z;
                    }
                }
                this.normalizeNormals();
                attributes.normal.needsUpdate = true;
            }
        }
        merge(geometry, offset) {
            if (!(geometry && geometry.isBufferGeometry)) {
                console.error('THREE.BufferGeometry.merge(): geometry not an instance of THREE.BufferGeometry.', geometry);
                return;
            }
            if (offset === undefined)
                offset = 0;
            var attributes = this.attributes;
            for (var key in attributes) {
                if (geometry.attributes[key] === undefined)
                    continue;
                var attribute1 = attributes[key];
                var attributeArray1 = attribute1.array;
                var attribute2 = geometry.attributes[key];
                var attributeArray2 = attribute2.array;
                var attributeSize = attribute2.itemSize;
                for (var i = 0, j = attributeSize * offset; i < attributeArray2.length; i++, j++)
                    attributeArray1[j] = attributeArray2[i];
            }
            return this;
        }
        normalizeNormals() {
            var vector = new Vector3_1.Vector3();
            var normals = this.attributes.normal;
            for (var i = 0, il = normals.count; i < il; i++) {
                vector.x = normals.getX(i);
                vector.y = normals.getY(i);
                vector.z = normals.getZ(i);
                vector.normalize();
                normals.setXYZ(i, vector.x, vector.y, vector.z);
            }
        }
        toNonIndexed() {
            if (this.index === null) {
                console.warn('THREE.BufferGeometry.toNonIndexed(): Geometry is already non-indexed.');
                return this;
            }
            var geometry2 = new BufferGeometry();
            var indices = this.index.array;
            var attributes = this.attributes;
            for (var name in attributes) {
                var attribute = attributes[name];
                var array = attribute.array;
                var itemSize = attribute.itemSize;
                var array2 = new array.constructor(indices.length * itemSize);
                var index = 0, index2 = 0;
                for (var i = 0, l = indices.length; i < l; i++) {
                    index = indices[i] * itemSize;
                    for (var j = 0; j < itemSize; j++)
                        array2[index2++] = array[index++];
                }
                geometry2.addAttribute(name, new BufferAttribute_1.BufferAttribute(array2, itemSize));
            }
            return geometry2;
        }
        toJSON() {
            var data = {
                metadata: {
                    version: 4.5,
                    type: 'BufferGeometry',
                    generator: 'BufferGeometry.toJSON'
                }
            };
            data.uuid = this.uuid;
            data.type = this.type;
            if (this.name !== '')
                data.name = this.name;
            if (this.parameters !== undefined) {
                var parameters = this.parameters;
                for (var key in parameters)
                    if (parameters[key] !== undefined)
                        data[key] = parameters[key];
                return data;
            }
            data.data = { attributes: {} };
            var index = this.index;
            if (index !== null) {
                var array = Array.prototype.slice.call(index.array);
                data.data.index = {
                    type: index.array.constructor.name,
                    array: array
                };
            }
            var attributes = this.attributes;
            for (var key in attributes) {
                var attribute = attributes[key];
                var array = Array.prototype.slice.call(attribute.array);
                data.data.attributes[key] = {
                    itemSize: attribute.itemSize,
                    type: attribute.array.constructor.name,
                    array: array,
                    normalized: attribute.normalized
                };
            }
            var groups = this.groups;
            if (groups.length > 0)
                data.data.groups = JSON.parse(JSON.stringify(groups));
            var boundingSphere = this.boundingSphere;
            if (boundingSphere !== null) {
                data.data.boundingSphere = {
                    center: boundingSphere.center.toArray(),
                    radius: boundingSphere.radius
                };
            }
            return data;
        }
        clone() {
            return new BufferGeometry().copy(this);
        }
        copy(source) {
            var name, i, l;
            this.index = null;
            this.attributes = {};
            this.morphAttributes = {};
            this.groups = [];
            this.boundingBox = null;
            this.boundingSphere = null;
            this.name = source.name;
            var index = source.index;
            if (index !== null)
                this.setIndex(index.clone());
            var attributes = source.attributes;
            for (name in attributes) {
                var attribute = attributes[name];
                this.addAttribute(name, attribute.clone());
            }
            var morphAttributes = source.morphAttributes;
            for (name in morphAttributes) {
                var array = [];
                var morphAttribute = morphAttributes[name];
                for (i = 0, l = morphAttribute.length; i < l; i++)
                    array.push(morphAttribute[i].clone());
                this.morphAttributes[name] = array;
            }
            var groups = source.groups;
            for (i = 0, l = groups.length; i < l; i++) {
                var group = groups[i];
                this.addGroup(group.start, group.count, group.materialIndex);
            }
            var boundingBox = source.boundingBox;
            if (boundingBox !== null)
                this.boundingBox = boundingBox.clone();
            var boundingSphere = source.boundingSphere;
            if (boundingSphere !== null)
                this.boundingSphere = boundingSphere.clone();
            this.drawRange.start = source.drawRange.start;
            this.drawRange.count = source.drawRange.count;
            return this;
        }
        dispose() {
            this.dispatchEvent({ type: 'dispose' });
        }
    }
    exports.BufferGeometry = BufferGeometry;
});
//# sourceMappingURL=BufferGeometry.js.map