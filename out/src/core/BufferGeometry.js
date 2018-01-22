define(["require", "exports", "../math/Vector3", "../math/Matrix4", "../math/Matrix3", "../math/Math", "../geom/Box3", "../geom/Sphere", "./EventDispatcher", "./BufferAttribute", "./InterleavedBufferAttribute", "./DirectGeometry", "./Object3D", "../utils"], function (require, exports, Vector3_1, Matrix4_1, Matrix3_1, Math_1, Box3_1, Sphere_1, EventDispatcher_1, BufferAttribute_1, InterleavedBufferAttribute_1, DirectGeometry_1, Object3D_1, utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let bufferGeometryId = 1;
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
            if (!(attribute instanceof BufferAttribute_1.BufferAttribute) && !(attribute instanceof InterleavedBufferAttribute_1.InterleavedBufferAttribute)) {
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
        addGroup(start, count, materialIndex = 0) {
            this.groups.push({
                start: start,
                count: count,
                materialIndex: materialIndex
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
            let position = this.attributes.position;
            if (position !== undefined) {
                matrix.applyToBufferAttribute(position);
                position.needsUpdate = true;
            }
            let normal = this.attributes.normal;
            if (normal !== undefined) {
                let normalMatrix = new Matrix3_1.Matrix3().getNormalMatrix(matrix);
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
            let m1 = new Matrix4_1.Matrix4();
            m1.makeRotationX(angle);
            this.applyMatrix(m1);
            return this;
        }
        rotateY(angle) {
            let m1 = new Matrix4_1.Matrix4();
            m1.makeRotationY(angle);
            this.applyMatrix(m1);
            return this;
        }
        rotateZ(angle) {
            let m1 = new Matrix4_1.Matrix4();
            m1.makeRotationZ(angle);
            this.applyMatrix(m1);
            return this;
        }
        translate(x, y, z) {
            let m1 = new Matrix4_1.Matrix4();
            m1.makeTranslation(x, y, z);
            this.applyMatrix(m1);
            return this;
        }
        ;
        scale(x, y, z) {
            let m1 = new Matrix4_1.Matrix4();
            m1.makeScale(x, y, z);
            this.applyMatrix(m1);
            return this;
        }
        lookAt(vector) {
            let obj = new Object3D_1.Object3D();
            obj.lookAt(vector);
            obj.updateMatrix();
            this.applyMatrix(obj.matrix);
        }
        ;
        center() {
            this.computeBoundingBox();
            let offset = this.boundingBox.getCenter().negate();
            this.translate(offset.x, offset.y, offset.z);
            return offset;
        }
        setFromObject(object) {
            let geometry = object.geometry;
            if (object.isPoints || object.isLine) {
                let positions = new BufferAttribute_1.Float32BufferAttribute(geometry.vertices.length * 3, 3);
                let colors = new BufferAttribute_1.Float32BufferAttribute(geometry.colors.length * 3, 3);
                this.addAttribute('position', positions.copyVector3sArray(geometry.vertices));
                this.addAttribute('color', colors.copyColorsArray(geometry.colors));
                if (geometry.lineDistances && geometry.lineDistances.length === geometry.vertices.length) {
                    let lineDistances = new BufferAttribute_1.Float32BufferAttribute(geometry.lineDistances.length, 1);
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
            let position = [];
            for (let i = 0, l = points.length; i < l; i++) {
                let point = points[i];
                position.push(point.x, point.y, point.z || 0);
            }
            this.addAttribute('position', new BufferAttribute_1.Float32BufferAttribute(position, 3));
            return this;
        }
        updateFromObject(object) {
            let geometry = object.geometry;
            if (object.isMesh) {
                let direct = geometry.__directGeometry;
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
            let attribute;
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
            let positions = new Float32Array(geometry.vertices.length * 3);
            this.addAttribute('position', new BufferAttribute_1.BufferAttribute(positions, 3).copyVector3sArray(geometry.vertices));
            if (geometry.normals.length > 0) {
                let normals = new Float32Array(geometry.normals.length * 3);
                this.addAttribute('normal', new BufferAttribute_1.BufferAttribute(normals, 3).copyVector3sArray(geometry.normals));
            }
            if (geometry.colors.length > 0) {
                let colors = new Float32Array(geometry.colors.length * 3);
                this.addAttribute('color', new BufferAttribute_1.BufferAttribute(colors, 3).copyColorsArray(geometry.colors));
            }
            if (geometry.uvs.length > 0) {
                let uvs = new Float32Array(geometry.uvs.length * 2);
                this.addAttribute('uv', new BufferAttribute_1.BufferAttribute(uvs, 2).copyVector2sArray(geometry.uvs));
            }
            if (geometry.uvs2.length > 0) {
                let uvs2 = new Float32Array(geometry.uvs2.length * 2);
                this.addAttribute('uv2', new BufferAttribute_1.BufferAttribute(uvs2, 2).copyVector2sArray(geometry.uvs2));
            }
            if (geometry.indices.length > 0) {
                let TypeArray = utils_1.arrayMax(geometry.indices) > 65535 ? Uint32Array : Uint16Array;
                let indices = new TypeArray(geometry.indices.length * 3);
                this.setIndex(new BufferAttribute_1.BufferAttribute(indices, 1).copyIndicesArray(geometry.indices));
            }
            this.groups = geometry.groups;
            for (let name in geometry.morphTargets) {
                let array = [];
                let morphTargets = geometry.morphTargets[name];
                for (let i = 0, l = morphTargets.length; i < l; i++) {
                    let morphTarget = morphTargets[i];
                    let attribute = new BufferAttribute_1.Float32BufferAttribute(morphTarget.length * 3, 3);
                    array.push(attribute.copyVector3sArray(morphTarget));
                }
                this.morphAttributes[name] = array;
            }
            if (geometry.skinIndices.length > 0) {
                let skinIndices = new BufferAttribute_1.Float32BufferAttribute(geometry.skinIndices.length * 4, 4);
                this.addAttribute('skinIndex', skinIndices.copyVector4sArray(geometry.skinIndices));
            }
            if (geometry.skinWeights.length > 0) {
                let skinWeights = new BufferAttribute_1.Float32BufferAttribute(geometry.skinWeights.length * 4, 4);
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
            let position = this.attributes.position;
            if (position !== undefined)
                this.boundingBox.setFromBufferAttribute(position);
            else
                this.boundingBox.makeEmpty();
            if (isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z))
                console.error('THREE.BufferGeometry.computeBoundingBox: Computed min/max have NaN values. The "position" attribute is likely to have NaN values.', this);
        }
        computeBoundingSphere() {
            let box = new Box3_1.Box3();
            let vector = new Vector3_1.Vector3();
            if (this.boundingSphere === null)
                this.boundingSphere = new Sphere_1.Sphere();
            let position = this.attributes.position;
            if (position) {
                let center = this.boundingSphere.center;
                box.setFromBufferAttribute(position);
                box.getCenter(center);
                let maxRadiusSq = 0;
                for (let i = 0, il = position.count; i < il; i++) {
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
            let index = this.index;
            let attributes = this.attributes;
            let groups = this.groups;
            if (attributes.position) {
                let positions = attributes.position.array;
                if (attributes.normal === undefined)
                    this.addAttribute('normal', new BufferAttribute_1.BufferAttribute(new Float32Array(positions.length), 3));
                else {
                    let array = attributes.normal.array;
                    for (let i = 0, il = array.length; i < il; i++)
                        array[i] = 0;
                }
                let normals = attributes.normal.array;
                let vA, vB, vC;
                let pA = new Vector3_1.Vector3(), pB = new Vector3_1.Vector3(), pC = new Vector3_1.Vector3();
                let cb = new Vector3_1.Vector3(), ab = new Vector3_1.Vector3();
                if (index) {
                    let indices = index.array;
                    if (groups.length === 0)
                        this.addGroup(0, indices.length);
                    for (let j = 0, jl = groups.length; j < jl; ++j) {
                        let group = groups[j];
                        let start = group.start;
                        let count = group.count;
                        for (let i = start, il = start + count; i < il; i += 3) {
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
                    for (let i = 0, il = positions.length; i < il; i += 9) {
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
            let attributes = this.attributes;
            for (let key in attributes) {
                if (geometry.attributes[key] === undefined)
                    continue;
                let attribute1 = attributes[key];
                let attributeArray1 = attribute1.array;
                let attribute2 = geometry.attributes[key];
                let attributeArray2 = attribute2.array;
                let attributeSize = attribute2.itemSize;
                for (let i = 0, j = attributeSize * offset; i < attributeArray2.length; i++, j++)
                    attributeArray1[j] = attributeArray2[i];
            }
            return this;
        }
        normalizeNormals() {
            let vector = new Vector3_1.Vector3();
            let normals = this.attributes.normal;
            for (let i = 0, il = normals.count; i < il; i++) {
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
            let geometry2 = new BufferGeometry();
            let indices = this.index.array;
            let attributes = this.attributes;
            for (let name in attributes) {
                let attribute = attributes[name];
                let array = attribute.array;
                let itemSize = attribute.itemSize;
                let array2 = new array.constructor(indices.length * itemSize);
                let index = 0, index2 = 0;
                for (let i = 0, l = indices.length; i < l; i++) {
                    index = indices[i] * itemSize;
                    for (let j = 0; j < itemSize; j++)
                        array2[index2++] = array[index++];
                }
                geometry2.addAttribute(name, new BufferAttribute_1.BufferAttribute(array2, itemSize));
            }
            return geometry2;
        }
        toJSON() {
            let data = {
                metadata: {
                    version: 4.5,
                    type: 'BufferGeometry',
                    generator: 'BufferGeometry.toJSON'
                },
                name: '',
                uuid: '',
                type: '',
                data: null
            };
            data.uuid = this.uuid;
            data.type = this.type;
            if (this.name !== '')
                data.name = this.name;
            if (this.parameters !== undefined) {
                let parameters = this.parameters;
                for (let key in parameters)
                    if (parameters[key] !== undefined)
                        data[key] = parameters[key];
                return data;
            }
            data.data = { attributes: {} };
            let index = this.index;
            if (index !== null) {
                let array = Array.prototype.slice.call(index.array);
                data.data.index = {
                    type: index.array.constructor.name,
                    array: array
                };
            }
            let attributes = this.attributes;
            for (let key in attributes) {
                let attribute = attributes[key];
                let array = Array.prototype.slice.call(attribute.array);
                data.data.attributes[key] = {
                    itemSize: attribute.itemSize,
                    type: attribute.array.constructor.name,
                    array: array,
                    normalized: attribute.normalized
                };
            }
            let groups = this.groups;
            if (groups.length > 0)
                data.data.groups = JSON.parse(JSON.stringify(groups));
            let boundingSphere = this.boundingSphere;
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
            let name, i, l;
            this.index = null;
            this.attributes = {};
            this.morphAttributes = {};
            this.groups = [];
            this.boundingBox = null;
            this.boundingSphere = null;
            this.name = source.name;
            let index = source.index;
            if (index !== null)
                this.setIndex(index.clone());
            let attributes = source.attributes;
            for (name in attributes) {
                let attribute = attributes[name];
                this.addAttribute(name, attribute.clone());
            }
            let morphAttributes = source.morphAttributes;
            for (name in morphAttributes) {
                let array = [];
                let morphAttribute = morphAttributes[name];
                for (i = 0, l = morphAttribute.length; i < l; i++)
                    array.push(morphAttribute[i].clone());
                this.morphAttributes[name] = array;
            }
            let groups = source.groups;
            for (i = 0, l = groups.length; i < l; i++) {
                let group = groups[i];
                this.addGroup(group.start, group.count, group.materialIndex);
            }
            let boundingBox = source.boundingBox;
            if (boundingBox !== null)
                this.boundingBox = boundingBox.clone();
            let boundingSphere = source.boundingSphere;
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