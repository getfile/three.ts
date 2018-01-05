define(["require", "exports", "../core/Object3D", "../core/Face3", "../core/BufferGeometry", "../math/Vector3", "../math/Vector2", "../math/Matrix4", "../geom/Sphere", "../geom/Ray", "../geom/Triangle", "../constants", "../materials/MeshBasicMaterial"], function (require, exports, Object3D_1, Face3_1, BufferGeometry_1, Vector3_1, Vector2_1, Matrix4_1, Sphere_1, Ray_1, Triangle_1, constants_1, MeshBasicMaterial_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Mesh extends Object3D_1.Object3D {
        constructor(geometry, material) {
            super();
            this.type = 'Mesh';
            this.geometry = geometry !== undefined ? geometry : new BufferGeometry_1.BufferGeometry();
            this.material = material !== undefined ? material : new MeshBasicMaterial_1.MeshBasicMaterial({ color: Math.random() * 0xffffff });
            this.drawMode = constants_1.TrianglesDrawMode;
            this.updateMorphTargets();
        }
        setDrawMode(value) {
            this.drawMode = value;
        }
        copy(source) {
            super.copy(source);
            this.drawMode = source.drawMode;
            if (source.morphTargetInfluences !== undefined)
                this.morphTargetInfluences = source.morphTargetInfluences.slice();
            if (source.morphTargetDictionary !== undefined)
                this.morphTargetDictionary = Object.assign({}, source.morphTargetDictionary);
            return this;
        }
        updateMorphTargets() {
            let geometry = this.geometry;
            let m, ml, name;
            if (geometry.isBufferGeometry) {
                let morphAttributes = geometry.morphAttributes;
                let keys = Object.keys(morphAttributes);
                if (keys.length > 0) {
                    let morphAttribute = morphAttributes[keys[0]];
                    if (morphAttribute !== undefined) {
                        this.morphTargetInfluences = [];
                        this.morphTargetDictionary = {};
                        for (m = 0, ml = morphAttribute.length; m < ml; m++) {
                            name = morphAttribute[m].name || String(m);
                            this.morphTargetInfluences.push(0);
                            this.morphTargetDictionary[name] = m;
                        }
                    }
                }
            }
            else {
                let morphTargets = geometry.morphTargets;
                if (morphTargets !== undefined && morphTargets.length > 0) {
                    this.morphTargetInfluences = [];
                    this.morphTargetDictionary = {};
                    for (m = 0, ml = morphTargets.length; m < ml; m++) {
                        name = morphTargets[m].name || String(m);
                        this.morphTargetInfluences.push(0);
                        this.morphTargetDictionary[name] = m;
                    }
                }
            }
        }
        raycast(raycaster, intersects) {
            let inverseMatrix = new Matrix4_1.Matrix4();
            let ray = new Ray_1.Ray();
            let sphere = new Sphere_1.Sphere();
            let vA = new Vector3_1.Vector3();
            let vB = new Vector3_1.Vector3();
            let vC = new Vector3_1.Vector3();
            let tempA = new Vector3_1.Vector3();
            let tempB = new Vector3_1.Vector3();
            let tempC = new Vector3_1.Vector3();
            let uvA = new Vector2_1.Vector2();
            let uvB = new Vector2_1.Vector2();
            let uvC = new Vector2_1.Vector2();
            let barycoord = new Vector3_1.Vector3();
            let intersectionPoint = new Vector3_1.Vector3();
            let intersectionPointWorld = new Vector3_1.Vector3();
            function uvIntersection(point, p1, p2, p3, uv1, uv2, uv3) {
                Triangle_1.Triangle.barycoordFromPoint(point, p1, p2, p3, barycoord);
                uv1.multiplyScalar(barycoord.x);
                uv2.multiplyScalar(barycoord.y);
                uv3.multiplyScalar(barycoord.z);
                uv1.add(uv2).add(uv3);
                return uv1.clone();
            }
            function checkIntersection(object, material, raycaster, ray, pA, pB, pC, point) {
                let intersect;
                if (material.side === constants_1.BackSide)
                    intersect = ray.intersectTriangle(pC, pB, pA, true, point);
                else
                    intersect = ray.intersectTriangle(pA, pB, pC, material.side !== constants_1.DoubleSide, point);
                if (intersect === null)
                    return null;
                intersectionPointWorld.copy(point);
                intersectionPointWorld.applyMatrix4(object.matrixWorld);
                let distance = raycaster.ray.origin.distanceTo(intersectionPointWorld);
                if (distance < raycaster.near || distance > raycaster.far)
                    return null;
                return {
                    distance: distance,
                    point: intersectionPointWorld.clone(),
                    object: object
                };
            }
            function checkBufferGeometryIntersection(object, raycaster, ray, position, uv, a, b, c) {
                vA.fromBufferAttribute(position, a);
                vB.fromBufferAttribute(position, b);
                vC.fromBufferAttribute(position, c);
                let intersection = checkIntersection(object, object.material, raycaster, ray, vA, vB, vC, intersectionPoint);
                if (intersection) {
                    if (uv) {
                        uvA.fromBufferAttribute(uv, a);
                        uvB.fromBufferAttribute(uv, b);
                        uvC.fromBufferAttribute(uv, c);
                        intersection.uv = uvIntersection(intersectionPoint, vA, vB, vC, uvA, uvB, uvC);
                    }
                    intersection.face = new Face3_1.Face3(a, b, c, Triangle_1.Triangle.normal(vA, vB, vC));
                    intersection.faceIndex = a;
                }
                return intersection;
            }
            let geometry = this.geometry;
            let material = this.material;
            let matrixWorld = this.matrixWorld;
            if (material === undefined)
                return;
            if (geometry.boundingSphere === null)
                geometry.computeBoundingSphere();
            sphere.copy(geometry.boundingSphere);
            sphere.applyMatrix4(matrixWorld);
            if (raycaster.ray.intersectsSphere(sphere) === false)
                return;
            inverseMatrix.getInverse(matrixWorld);
            ray.copy(raycaster.ray).applyMatrix4(inverseMatrix);
            if (geometry.boundingBox !== null)
                if (ray.intersectsBox(geometry.boundingBox) === false)
                    return;
            let intersection;
            if (geometry.isBufferGeometry) {
                let a, b, c;
                let index = geometry.index;
                let position = geometry.attributes.position;
                let uv = geometry.attributes.uv;
                let i, l;
                if (index !== null) {
                    for (i = 0, l = index.count; i < l; i += 3) {
                        a = index.getX(i);
                        b = index.getX(i + 1);
                        c = index.getX(i + 2);
                        intersection = checkBufferGeometryIntersection(this, raycaster, ray, position, uv, a, b, c);
                        if (intersection) {
                            intersection.faceIndex = Math.floor(i / 3);
                            intersects.push(intersection);
                        }
                    }
                }
                else if (position !== undefined) {
                    for (i = 0, l = position.count; i < l; i += 3) {
                        a = i;
                        b = i + 1;
                        c = i + 2;
                        intersection = checkBufferGeometryIntersection(this, raycaster, ray, position, uv, a, b, c);
                        if (intersection) {
                            intersection.index = a;
                            intersects.push(intersection);
                        }
                    }
                }
            }
            else if (geometry.isGeometry) {
                let fvA, fvB, fvC;
                let isMultiMaterial = Array.isArray(material);
                let vertices = geometry.vertices;
                let faces = geometry.faces;
                let uvs;
                let faceVertexUvs = geometry.faceVertexUvs[0];
                if (faceVertexUvs.length > 0)
                    uvs = faceVertexUvs;
                for (let f = 0, fl = faces.length; f < fl; f++) {
                    let face = faces[f];
                    let faceMaterial = isMultiMaterial ? material[face.materialIndex] : material;
                    if (faceMaterial === undefined)
                        continue;
                    fvA = vertices[face.a];
                    fvB = vertices[face.b];
                    fvC = vertices[face.c];
                    if (faceMaterial.morphTargets === true) {
                        let morphTargets = geometry.morphTargets;
                        let morphInfluences = this.morphTargetInfluences;
                        vA.set(0, 0, 0);
                        vB.set(0, 0, 0);
                        vC.set(0, 0, 0);
                        for (let t = 0, tl = morphTargets.length; t < tl; t++) {
                            let influence = morphInfluences[t];
                            if (influence === 0)
                                continue;
                            let targets = morphTargets[t].vertices;
                            vA.addScaledVector(tempA.subVectors(targets[face.a], fvA), influence);
                            vB.addScaledVector(tempB.subVectors(targets[face.b], fvB), influence);
                            vC.addScaledVector(tempC.subVectors(targets[face.c], fvC), influence);
                        }
                        vA.add(fvA);
                        vB.add(fvB);
                        vC.add(fvC);
                        fvA = vA;
                        fvB = vB;
                        fvC = vC;
                    }
                    intersection = checkIntersection(this, faceMaterial, raycaster, ray, fvA, fvB, fvC, intersectionPoint);
                    if (intersection) {
                        if (uvs && uvs[f]) {
                            let uvs_f = uvs[f];
                            uvA.copy(uvs_f[0]);
                            uvB.copy(uvs_f[1]);
                            uvC.copy(uvs_f[2]);
                            intersection.uv = uvIntersection(intersectionPoint, fvA, fvB, fvC, uvA, uvB, uvC);
                        }
                        intersection.face = face;
                        intersection.faceIndex = f;
                        intersects.push(intersection);
                    }
                }
            }
        }
        clone() {
            return new Mesh(this.geometry, this.material).copy(this);
        }
    }
    exports.Mesh = Mesh;
});
//# sourceMappingURL=Mesh.js.map