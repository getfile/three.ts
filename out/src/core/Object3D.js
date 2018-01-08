define(["require", "exports", "./EventDispatcher", "./Layers", "../math/Vector3", "../math/Matrix3", "../math/Matrix4", "../math/Euler", "../math/Quaternion", "../math/Math", "../cameras/Camera"], function (require, exports, EventDispatcher_1, Layers_1, Vector3_1, Matrix3_1, Matrix4_1, Euler_1, Quaternion_1, Math_1, Camera_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let object3DId = 0;
    class Object3D extends EventDispatcher_1.EventDispatcher {
        constructor() {
            super();
            this.matrix = new Matrix4_1.Matrix4();
            this.matrixWorld = new Matrix4_1.Matrix4();
            this.onBeforeRender = () => { };
            this.onAfterRender = () => { };
            this.id = object3DId++;
            this.uuid = Math_1._Math.generateUUID();
            this.name = '';
            this.type = 'Object3D';
            this.parent = null;
            this.children = [];
            this.up = Object3D.DefaultUp.clone();
            this.position = new Vector3_1.Vector3();
            this.rotation = new Euler_1.Euler();
            this.quaternion = new Quaternion_1.Quaternion();
            this.scale = new Vector3_1.Vector3(1, 1, 1);
            this.rotation.onChange(this.onRotationChange);
            this.quaternion.onChange(this.onQuaternionChange);
            this.modelViewMatrix = new Matrix4_1.Matrix4();
            this.normalMatrix = new Matrix3_1.Matrix3();
            this.matrix = new Matrix4_1.Matrix4();
            this.matrixWorld = new Matrix4_1.Matrix4();
            this.matrixAutoUpdate = Object3D.DefaultMatrixAutoUpdate;
            this.matrixWorldNeedsUpdate = false;
            this.layers = new Layers_1.Layers();
            this.visible = true;
            this.castShadow = false;
            this.receiveShadow = false;
            this.frustumCulled = true;
            this.renderOrder = 0;
            this.userData = {};
        }
        onRotationChange() {
            this.quaternion.setFromEuler(this.rotation, false);
        }
        onQuaternionChange() {
            this.rotation.setFromQuaternion(this.quaternion, undefined, false);
        }
        applyMatrix(matrix) {
            this.matrix.multiplyMatrices(matrix, this.matrix);
            this.matrix.decompose(this.position, this.quaternion, this.scale);
        }
        applyQuaternion(q) {
            this.quaternion.premultiply(q);
            return this;
        }
        setRotationFromAxisAngle(axis, angle) {
            this.quaternion.setFromAxisAngle(axis, angle);
        }
        setRotationFromEuler(euler) {
            this.quaternion.setFromEuler(euler, true);
        }
        setRotationFromMatrix(m) {
            this.quaternion.setFromRotationMatrix(m);
        }
        setRotationFromQuaternion(q) {
            this.quaternion.copy(q);
        }
        rotateOnAxis(axis, angle) {
            let q1 = new Quaternion_1.Quaternion();
            q1.setFromAxisAngle(axis, angle);
            this.quaternion.multiply(q1);
            return this;
        }
        rotateOnWorldAxis(axis, angle) {
            let q1 = new Quaternion_1.Quaternion();
            q1.setFromAxisAngle(axis, angle);
            this.quaternion.premultiply(q1);
            return this;
        }
        rotateX(angle) {
            let v1 = new Vector3_1.Vector3(1, 0, 0);
            return this.rotateOnAxis(v1, angle);
        }
        rotateY(angle) {
            let v1 = new Vector3_1.Vector3(0, 1, 0);
            return this.rotateOnAxis(v1, angle);
        }
        ;
        rotateZ(angle) {
            let v1 = new Vector3_1.Vector3(0, 0, 1);
            return this.rotateOnAxis(v1, angle);
        }
        ;
        translateOnAxis(axis, distance) {
            let v1 = new Vector3_1.Vector3();
            v1.copy(axis).applyQuaternion(this.quaternion);
            this.position.add(v1.multiplyScalar(distance));
            return this;
        }
        ;
        translateX(distance) {
            let v1 = new Vector3_1.Vector3(1, 0, 0);
            return this.translateOnAxis(v1, distance);
        }
        ;
        translateY(distance) {
            let v1 = new Vector3_1.Vector3(0, 1, 0);
            return this.translateOnAxis(v1, distance);
        }
        ;
        translateZ(distance) {
            let v1 = new Vector3_1.Vector3(0, 0, 1);
            return this.translateOnAxis(v1, distance);
        }
        ;
        localToWorld(vector) {
            return vector.applyMatrix4(this.matrixWorld);
        }
        worldToLocal(vector) {
            let m1 = new Matrix4_1.Matrix4();
            return vector.applyMatrix4(m1.getInverse(this.matrixWorld));
        }
        ;
        lookAt(x, y = 0, z = 0) {
            let m1 = new Matrix4_1.Matrix4();
            let vector = new Vector3_1.Vector3();
            if (x.isVector3)
                vector.copy(x);
            else
                vector.set(x, y, z);
            if (this instanceof Camera_1.Camera)
                m1.lookAt(this.position, vector, this.up);
            else
                m1.lookAt(vector, this.position, this.up);
            this.quaternion.setFromRotationMatrix(m1);
        }
        add(object) {
            if (arguments.length > 1) {
                for (let i = 0; i < arguments.length; i++)
                    this.add(arguments[i]);
                return this;
            }
            if (object === this) {
                console.error("THREE.Object3D.add: object can't be added as a child of itself.", object);
                return this;
            }
            if ((object && object.isObject3D)) {
                if (object.parent !== null)
                    object.parent.remove(object);
                object.parent = this;
                object.dispatchEvent({ type: 'added' });
                this.children.push(object);
            }
            else
                console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.", object);
            return this;
        }
        remove(object) {
            if (arguments.length > 1) {
                for (let i = 0; i < arguments.length; i++)
                    this.remove(arguments[i]);
                return this;
            }
            let index = this.children.indexOf(object);
            if (index !== -1) {
                object.parent = null;
                object.dispatchEvent({ type: 'removed' });
                this.children.splice(index, 1);
            }
            return this;
        }
        getObjectById(id) {
            return this.getObjectByProperty('id', id);
        }
        getObjectByName(name) {
            return this.getObjectByProperty('name', name);
        }
        getObjectByProperty(name, value) {
            if (this[name] === value)
                return this;
            for (let i = 0, l = this.children.length; i < l; i++) {
                let child = this.children[i];
                let object = child.getObjectByProperty(name, value);
                if (object !== undefined)
                    return object;
            }
            return undefined;
        }
        getWorldPosition(optionalTarget) {
            let result = optionalTarget || new Vector3_1.Vector3();
            this.updateMatrixWorld(true);
            return result.setFromMatrixPosition(this.matrixWorld);
        }
        getWorldQuaternion(optionalTarget) {
            let position = new Vector3_1.Vector3();
            let scale = new Vector3_1.Vector3();
            let result = optionalTarget || new Quaternion_1.Quaternion();
            this.updateMatrixWorld(true);
            this.matrixWorld.decompose(position, result, scale);
            return result;
        }
        getWorldRotation(optionalTarget) {
            let quaternion = new Quaternion_1.Quaternion();
            let result = optionalTarget || new Euler_1.Euler();
            this.getWorldQuaternion(quaternion);
            return result.setFromQuaternion(quaternion, this.rotation.order, false);
        }
        getWorldScale(optionalTarget) {
            let position = new Vector3_1.Vector3();
            let quaternion = new Quaternion_1.Quaternion();
            let result = optionalTarget || new Vector3_1.Vector3();
            this.updateMatrixWorld(true);
            this.matrixWorld.decompose(position, quaternion, result);
            return result;
        }
        getWorldDirection(optionalTarget) {
            let quaternion = new Quaternion_1.Quaternion();
            let result = optionalTarget || new Vector3_1.Vector3();
            this.getWorldQuaternion(quaternion);
            return result.set(0, 0, 1).applyQuaternion(quaternion);
        }
        raycast(raycaster, intersects) { }
        traverse(callback) {
            callback(this);
            let children = this.children;
            for (let i = 0, l = children.length; i < l; i++)
                children[i].traverse(callback);
        }
        traverseVisible(callback) {
            if (this.visible === false)
                return;
            callback(this);
            let children = this.children;
            for (let i = 0, l = children.length; i < l; i++)
                children[i].traverseVisible(callback);
        }
        traverseAncestors(callback) {
            let parent = this.parent;
            if (parent !== null) {
                callback(parent);
                parent.traverseAncestors(callback);
            }
        }
        updateMatrix() {
            this.matrix.compose(this.position, this.quaternion, this.scale);
            this.matrixWorldNeedsUpdate = true;
        }
        updateMatrixWorld(force) {
            if (this.matrixAutoUpdate)
                this.updateMatrix();
            if (this.matrixWorldNeedsUpdate || force) {
                if (this.parent === null)
                    this.matrixWorld.copy(this.matrix);
                else
                    this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix);
                this.matrixWorldNeedsUpdate = false;
                force = true;
            }
            let children = this.children;
            for (let i = 0, l = children.length; i < l; i++)
                children[i].updateMatrixWorld(force);
        }
        toJSON(meta) {
            let isRootObject = (meta === undefined || typeof meta === 'string');
            let output = {};
            if (isRootObject) {
                meta = {
                    geometries: {},
                    materials: {},
                    textures: {},
                    images: {},
                    shapes: {}
                };
                output.metadata = {
                    version: 4.5,
                    type: 'Object',
                    generator: 'Object3D.toJSON'
                };
            }
            let object = {};
            object.uuid = this.uuid;
            object.type = this.type;
            if (this.name !== '')
                object.name = this.name;
            if (this.castShadow === true)
                object.castShadow = true;
            if (this.receiveShadow === true)
                object.receiveShadow = true;
            if (this.visible === false)
                object.visible = false;
            if (JSON.stringify(this.userData) !== '{}')
                object.userData = this.userData;
            object.matrix = this.matrix.toArray();
            if (this.geometry !== undefined) {
                object.geometry = serialize(meta.geometries, this.geometry);
                let parameters = this.geometry.parameters;
                if (parameters !== undefined && parameters.shapes !== undefined) {
                    let shapes = parameters.shapes;
                    if (Array.isArray(shapes)) {
                        for (let i = 0, l = shapes.length; i < l; i++) {
                            let shape = shapes[i];
                            serialize(meta.shapes, shape);
                        }
                    }
                    else
                        serialize(meta.shapes, shapes);
                }
            }
            if (this.material !== undefined) {
                if (Array.isArray(this.material)) {
                    let uuids = [];
                    for (let i = 0, l = this.material.length; i < l; i++)
                        uuids.push(serialize(meta.materials, this.material[i]));
                    object.material = uuids;
                }
                else
                    object.material = serialize(meta.materials, this.material);
            }
            if (this.children.length > 0) {
                object.children = [];
                for (let i = 0; i < this.children.length; i++)
                    object.children.push(this.children[i].toJSON(meta).object);
            }
            if (isRootObject) {
                let geometries = extractFromCache(meta.geometries);
                let materials = extractFromCache(meta.materials);
                let textures = extractFromCache(meta.textures);
                let images = extractFromCache(meta.images);
                let shapes = extractFromCache(meta.shapes);
                if (geometries.length > 0)
                    output.geometries = geometries;
                if (materials.length > 0)
                    output.materials = materials;
                if (textures.length > 0)
                    output.textures = textures;
                if (images.length > 0)
                    output.images = images;
                if (shapes.length > 0)
                    output.shapes = shapes;
            }
            output.object = object;
            return output;
            function serialize(library, element) {
                if (library[element.uuid] === undefined)
                    library[element.uuid] = element.toJSON(meta);
                return element.uuid;
            }
            function extractFromCache(cache) {
                let values = [];
                for (let key in cache) {
                    let data = cache[key];
                    delete data.metadata;
                    values.push(data);
                }
                return values;
            }
        }
        clone(recursive) {
            return new Object3D().copy(this, recursive);
        }
        copy(source, recursive = true) {
            this.name = source.name;
            this.up.copy(source.up);
            this.position.copy(source.position);
            this.quaternion.copy(source.quaternion);
            this.scale.copy(source.scale);
            this.matrix.copy(source.matrix);
            this.matrixWorld.copy(source.matrixWorld);
            this.matrixAutoUpdate = source.matrixAutoUpdate;
            this.matrixWorldNeedsUpdate = source.matrixWorldNeedsUpdate;
            this.layers.mask = source.layers.mask;
            this.visible = source.visible;
            this.castShadow = source.castShadow;
            this.receiveShadow = source.receiveShadow;
            this.frustumCulled = source.frustumCulled;
            this.renderOrder = source.renderOrder;
            this.userData = JSON.parse(JSON.stringify(source.userData));
            if (recursive === true) {
                for (let i = 0; i < source.children.length; i++) {
                    let child = source.children[i];
                    this.add(child.clone());
                }
            }
            return this;
        }
    }
    Object3D.DefaultUp = new Vector3_1.Vector3(0, 1, 0);
    Object3D.DefaultMatrixAutoUpdate = true;
    exports.Object3D = Object3D;
});
//# sourceMappingURL=Object3D.js.map