define(["require", "exports", "../../constants", "../WebGLRenderTarget", "../../materials/MeshDepthMaterial", "../../materials/MeshDistanceMaterial", "../../math/Vector4", "../../math/Vector3", "../../math/Vector2", "../../math/Matrix4", "../../geom/Frustum"], function (require, exports, constants_1, WebGLRenderTarget_1, MeshDepthMaterial_1, MeshDistanceMaterial_1, Vector4_1, Vector3_1, Vector2_1, Matrix4_1, Frustum_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class WebGLShadowMap {
        constructor(_renderer, _objects, maxTextureSize) {
            this._renderer = _renderer;
            this._objects = _objects;
            this._frustum = new Frustum_1.Frustum();
            this._projScreenMatrix = new Matrix4_1.Matrix4();
            this._shadowMapSize = new Vector2_1.Vector2();
            this._maxShadowMapSize = new Vector2_1.Vector2(maxTextureSize, maxTextureSize);
            this._lookTarget = new Vector3_1.Vector3();
            this._lightPositionWorld = new Vector3_1.Vector3();
            this._MorphingFlag = 1;
            this._SkinningFlag = 2;
            this._NumberOfMaterialVariants = (this._MorphingFlag | this._SkinningFlag) + 1;
            this._depthMaterials = new Array(this._NumberOfMaterialVariants);
            this._distanceMaterials = new Array(this._NumberOfMaterialVariants);
            this._materialCache = {};
            this.cubeDirections = [
                new Vector3_1.Vector3(1, 0, 0), new Vector3_1.Vector3(-1, 0, 0), new Vector3_1.Vector3(0, 0, 1),
                new Vector3_1.Vector3(0, 0, -1), new Vector3_1.Vector3(0, 1, 0), new Vector3_1.Vector3(0, -1, 0)
            ];
            this.cubeUps = [
                new Vector3_1.Vector3(0, 1, 0), new Vector3_1.Vector3(0, 1, 0), new Vector3_1.Vector3(0, 1, 0),
                new Vector3_1.Vector3(0, 1, 0), new Vector3_1.Vector3(0, 0, 1), new Vector3_1.Vector3(0, 0, -1)
            ];
            this.cube2DViewPorts = [
                new Vector4_1.Vector4(), new Vector4_1.Vector4(), new Vector4_1.Vector4(),
                new Vector4_1.Vector4(), new Vector4_1.Vector4(), new Vector4_1.Vector4()
            ];
            for (var i = 0; i !== this._NumberOfMaterialVariants; ++i) {
                var useMorphing = (i & this._MorphingFlag) !== 0;
                var useSkinning = (i & this._SkinningFlag) !== 0;
                var depthMaterial = new MeshDepthMaterial_1.MeshDepthMaterial({
                    depthPacking: constants_1.RGBADepthPacking,
                    morphTargets: useMorphing,
                    skinning: useSkinning
                });
                this._depthMaterials[i] = depthMaterial;
                var distanceMaterial = new MeshDistanceMaterial_1.MeshDistanceMaterial({
                    morphTargets: useMorphing,
                    skinning: useSkinning
                });
                this._distanceMaterials[i] = distanceMaterial;
            }
            this.enabled = false;
            this.autoUpdate = true;
            this.needsUpdate = false;
            this.type = constants_1.PCFShadowMap;
            this.renderReverseSided = true;
            this.renderSingleSided = true;
        }
        render(lights, scene, camera) {
            if (this.enabled === false)
                return;
            if (this.autoUpdate === false && this.needsUpdate === false)
                return;
            if (lights.length === 0)
                return;
            var _gl = this._renderer.context;
            var _state = this._renderer.state;
            _state.disable(_gl.BLEND);
            _state.buffers.color.setClear(1, 1, 1, 1);
            _state.buffers.depth.setTest(true);
            _state.setScissorTest(false);
            var faceCount;
            for (var i = 0, il = lights.length; i < il; i++) {
                var light = lights[i];
                var shadow = light.shadow;
                var isPointLight = light && light.isPointLight;
                if (shadow === undefined) {
                    console.warn('THREE.WebGLShadowMap:', light, 'has no shadow.');
                    continue;
                }
                var shadowCamera = shadow.camera;
                this._shadowMapSize.copy(shadow.mapSize);
                this._shadowMapSize.min(this._maxShadowMapSize);
                if (isPointLight) {
                    var vpWidth = this._shadowMapSize.x;
                    var vpHeight = this._shadowMapSize.y;
                    this.cube2DViewPorts[0].set(vpWidth * 2, vpHeight, vpWidth, vpHeight);
                    this.cube2DViewPorts[1].set(0, vpHeight, vpWidth, vpHeight);
                    this.cube2DViewPorts[2].set(vpWidth * 3, vpHeight, vpWidth, vpHeight);
                    this.cube2DViewPorts[3].set(vpWidth, vpHeight, vpWidth, vpHeight);
                    this.cube2DViewPorts[4].set(vpWidth * 3, 0, vpWidth, vpHeight);
                    this.cube2DViewPorts[5].set(vpWidth, 0, vpWidth, vpHeight);
                    this._shadowMapSize.x *= 4.0;
                    this._shadowMapSize.y *= 2.0;
                }
                if (shadow.map === null) {
                    var pars = { minFilter: constants_1.NearestFilter, magFilter: constants_1.NearestFilter, format: constants_1.RGBAFormat };
                    shadow.map = new WebGLRenderTarget_1.WebGLRenderTarget(this._shadowMapSize.x, this._shadowMapSize.y, pars);
                    shadow.map.texture.name = light.name + ".shadowMap";
                    shadowCamera.updateProjectionMatrix();
                }
                if (shadow.isSpotLightShadow)
                    shadow.update(light);
                var shadowMap = shadow.map;
                var shadowMatrix = shadow.matrix;
                this._lightPositionWorld.setFromMatrixPosition(light.matrixWorld);
                shadowCamera.position.copy(this._lightPositionWorld);
                if (isPointLight) {
                    faceCount = 6;
                    shadowMatrix.makeTranslation(-this._lightPositionWorld.x, -this._lightPositionWorld.y, -this._lightPositionWorld.z);
                }
                else {
                    faceCount = 1;
                    this._lookTarget.setFromMatrixPosition(light.target.matrixWorld);
                    shadowCamera.lookAt(this._lookTarget);
                    shadowCamera.updateMatrixWorld();
                    shadowMatrix.set(0.5, 0.0, 0.0, 0.5, 0.0, 0.5, 0.0, 0.5, 0.0, 0.0, 0.5, 0.5, 0.0, 0.0, 0.0, 1.0);
                    shadowMatrix.multiply(shadowCamera.projectionMatrix);
                    shadowMatrix.multiply(shadowCamera.matrixWorldInverse);
                }
                this._renderer.setRenderTarget(shadowMap);
                this._renderer.clear();
                for (var face = 0; face < faceCount; face++) {
                    if (isPointLight) {
                        this._lookTarget.copy(shadowCamera.position);
                        this._lookTarget.add(this.cubeDirections[face]);
                        shadowCamera.up.copy(this.cubeUps[face]);
                        shadowCamera.lookAt(this._lookTarget);
                        shadowCamera.updateMatrixWorld();
                        var vpDimensions = this.cube2DViewPorts[face];
                        _state.viewport(vpDimensions);
                    }
                    this._projScreenMatrix.multiplyMatrices(shadowCamera.projectionMatrix, shadowCamera.matrixWorldInverse);
                    this._frustum.setFromMatrix(this._projScreenMatrix);
                    this.renderObject(scene, camera, shadowCamera, isPointLight);
                }
            }
            this.needsUpdate = false;
        }
        getDepthMaterial(object, material, isPointLight, lightPositionWorld, shadowCameraNear, shadowCameraFar) {
            var geometry = object.geometry;
            var result = null;
            var materialVariants = this._depthMaterials;
            var customMaterial = object.customDepthMaterial;
            if (isPointLight) {
                materialVariants = this._distanceMaterials;
                customMaterial = object.customDistanceMaterial;
            }
            if (!customMaterial) {
                var useMorphing = false;
                if (material.morphTargets) {
                    if (geometry && geometry.isBufferGeometry) {
                        useMorphing = geometry.morphAttributes && geometry.morphAttributes.position && geometry.morphAttributes.position.length > 0;
                    }
                    else if (geometry && geometry.isGeometry)
                        useMorphing = geometry.morphTargets && geometry.morphTargets.length > 0;
                }
                if (object.isSkinnedMesh && material.skinning === false)
                    console.warn('THREE.WebGLShadowMap: THREE.SkinnedMesh with material.skinning set to false:', object);
                var useSkinning = object.isSkinnedMesh && material.skinning;
                var variantIndex = 0;
                if (useMorphing)
                    variantIndex |= this._MorphingFlag;
                if (useSkinning)
                    variantIndex |= this._SkinningFlag;
                result = materialVariants[variantIndex];
            }
            else
                result = customMaterial;
            if (this._renderer.localClippingEnabled &&
                material.clipShadows === true &&
                material.clippingPlanes.length !== 0) {
                var keyA = result.uuid, keyB = material.uuid;
                var materialsForVariant = this._materialCache[keyA];
                if (materialsForVariant === undefined) {
                    materialsForVariant = {};
                    this._materialCache[keyA] = materialsForVariant;
                }
                var cachedMaterial = materialsForVariant[keyB];
                if (cachedMaterial === undefined) {
                    cachedMaterial = result.clone();
                    materialsForVariant[keyB] = cachedMaterial;
                }
                result = cachedMaterial;
            }
            result.visible = material.visible;
            result.wireframe = material.wireframe;
            var side = material.side;
            if (this.renderSingleSided && side == constants_1.DoubleSide)
                side = constants_1.FrontSide;
            if (this.renderReverseSided) {
                if (side === constants_1.FrontSide)
                    side = constants_1.BackSide;
                else if (side === constants_1.BackSide)
                    side = constants_1.FrontSide;
            }
            result.side = side;
            result.clipShadows = material.clipShadows;
            result.clippingPlanes = material.clippingPlanes;
            result.clipIntersection = material.clipIntersection;
            result.wireframeLinewidth = material.wireframeLinewidth;
            result.linewidth = material.linewidth;
            if (isPointLight && result.isMeshDistanceMaterial) {
                result.referencePosition.copy(lightPositionWorld);
                result.nearDistance = shadowCameraNear;
                result.farDistance = shadowCameraFar;
            }
            return result;
        }
        renderObject(object, camera, shadowCamera, isPointLight) {
            if (object.visible === false)
                return;
            var visible = object.layers.test(camera.layers);
            if (visible && (object.isMesh || object.isLine || object.isPoints)) {
                if (object.castShadow && (!object.frustumCulled || this._frustum.intersectsObject(object))) {
                    object.modelViewMatrix.multiplyMatrices(shadowCamera.matrixWorldInverse, object.matrixWorld);
                    var geometry = this._objects.update(object);
                    var material = object.material;
                    if (Array.isArray(material)) {
                        var groups = geometry.groups;
                        for (var k = 0, kl = groups.length; k < kl; k++) {
                            var group = groups[k];
                            var groupMaterial = material[group.materialIndex];
                            if (groupMaterial && groupMaterial.visible) {
                                var depthMaterial = this.getDepthMaterial(object, groupMaterial, isPointLight, this._lightPositionWorld, shadowCamera.near, shadowCamera.far);
                                this._renderer.renderBufferDirect(shadowCamera, null, geometry, depthMaterial, object, group);
                            }
                        }
                    }
                    else if (material.visible) {
                        var depthMaterial = this.getDepthMaterial(object, material, isPointLight, this._lightPositionWorld, shadowCamera.near, shadowCamera.far);
                        this._renderer.renderBufferDirect(shadowCamera, null, geometry, depthMaterial, object, null);
                    }
                }
            }
            var children = object.children;
            for (var i = 0, l = children.length; i < l; i++)
                this.renderObject(children[i], camera, shadowCamera, isPointLight);
        }
    }
    exports.WebGLShadowMap = WebGLShadowMap;
});
//# sourceMappingURL=WebGLShadowMap.js.map