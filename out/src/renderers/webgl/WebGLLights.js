define(["require", "exports", "../../math/Color.js", "../../math/Matrix4.js", "../../math/Vector2.js", "../../math/Vector3.js"], function (require, exports, Color_js_1, Matrix4_js_1, Vector2_js_1, Vector3_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class UniformsCache {
        constructor() {
            this.lights = {};
        }
        get(light) {
            if (this.lights[light.id] !== undefined)
                return this.lights[light.id];
            var uniforms;
            switch (light.type) {
                case 'DirectionalLight':
                    uniforms = {
                        direction: new Vector3_js_1.Vector3(),
                        color: new Color_js_1.Color(),
                        shadow: false,
                        shadowBias: 0,
                        shadowRadius: 1,
                        shadowMapSize: new Vector2_js_1.Vector2()
                    };
                    break;
                case 'SpotLight':
                    uniforms = {
                        position: new Vector3_js_1.Vector3(),
                        direction: new Vector3_js_1.Vector3(),
                        color: new Color_js_1.Color(),
                        distance: 0,
                        coneCos: 0,
                        penumbraCos: 0,
                        decay: 0,
                        shadow: false,
                        shadowBias: 0,
                        shadowRadius: 1,
                        shadowMapSize: new Vector2_js_1.Vector2()
                    };
                    break;
                case 'PointLight':
                    uniforms = {
                        position: new Vector3_js_1.Vector3(),
                        color: new Color_js_1.Color(),
                        distance: 0,
                        decay: 0,
                        shadow: false,
                        shadowBias: 0,
                        shadowRadius: 1,
                        shadowMapSize: new Vector2_js_1.Vector2(),
                        shadowCameraNear: 1,
                        shadowCameraFar: 1000
                    };
                    break;
                case 'HemisphereLight':
                    uniforms = {
                        direction: new Vector3_js_1.Vector3(),
                        skyColor: new Color_js_1.Color(),
                        groundColor: new Color_js_1.Color()
                    };
                    break;
                case 'RectAreaLight':
                    uniforms = {
                        color: new Color_js_1.Color(),
                        position: new Vector3_js_1.Vector3(),
                        halfWidth: new Vector3_js_1.Vector3(),
                        halfHeight: new Vector3_js_1.Vector3()
                    };
                    break;
            }
            this.lights[light.id] = uniforms;
            return uniforms;
        }
    }
    class WebGLLights {
        constructor() {
            this.cache = new UniformsCache();
            this.state = {
                hash: '',
                ambient: [0, 0, 0],
                directional: [],
                directionalShadowMap: [],
                directionalShadowMatrix: [],
                spot: [],
                spotShadowMap: [],
                spotShadowMatrix: [],
                rectArea: [],
                point: [],
                pointShadowMap: [],
                pointShadowMatrix: [],
                hemi: []
            };
            this.vector3 = new Vector3_js_1.Vector3();
            this.matrix4 = new Matrix4_js_1.Matrix4();
            this.matrix42 = new Matrix4_js_1.Matrix4();
        }
        setup(lights, shadows, camera) {
            var r = 0, g = 0, b = 0;
            var directionalLength = 0;
            var pointLength = 0;
            var spotLength = 0;
            var rectAreaLength = 0;
            var hemiLength = 0;
            var viewMatrix = camera.matrixWorldInverse;
            for (var i = 0, l = lights.length; i < l; i++) {
                var light = lights[i];
                var color = light.color;
                var intensity = light.intensity;
                var distance = light.distance;
                var shadowMap = (light.shadow && light.shadow.map) ? light.shadow.map.texture : null;
                if (light.isAmbientLight) {
                    r += color.r * intensity;
                    g += color.g * intensity;
                    b += color.b * intensity;
                }
                else if (light.isDirectionalLight) {
                    var uniforms = this.cache.get(light);
                    uniforms.color.copy(light.color).multiplyScalar(light.intensity);
                    uniforms.direction.setFromMatrixPosition(light.matrixWorld);
                    this.vector3.setFromMatrixPosition(light.target.matrixWorld);
                    uniforms.direction.sub(this.vector3);
                    uniforms.direction.transformDirection(viewMatrix);
                    uniforms.shadow = light.castShadow;
                    if (light.castShadow) {
                        var shadow = light.shadow;
                        uniforms.shadowBias = shadow.bias;
                        uniforms.shadowRadius = shadow.radius;
                        uniforms.shadowMapSize = shadow.mapSize;
                    }
                    this.state.directionalShadowMap[directionalLength] = shadowMap;
                    this.state.directionalShadowMatrix[directionalLength] = light.shadow.matrix;
                    this.state.directional[directionalLength] = uniforms;
                    directionalLength++;
                }
                else if (light.isSpotLight) {
                    var uniforms = this.cache.get(light);
                    uniforms.position.setFromMatrixPosition(light.matrixWorld);
                    uniforms.position.applyMatrix4(viewMatrix);
                    uniforms.color.copy(color).multiplyScalar(intensity);
                    uniforms.distance = distance;
                    uniforms.direction.setFromMatrixPosition(light.matrixWorld);
                    this.vector3.setFromMatrixPosition(light.target.matrixWorld);
                    uniforms.direction.sub(this.vector3);
                    uniforms.direction.transformDirection(viewMatrix);
                    uniforms.coneCos = Math.cos(light.angle);
                    uniforms.penumbraCos = Math.cos(light.angle * (1 - light.penumbra));
                    uniforms.decay = (light.distance === 0) ? 0.0 : light.decay;
                    uniforms.shadow = light.castShadow;
                    if (light.castShadow) {
                        var shadow = light.shadow;
                        uniforms.shadowBias = shadow.bias;
                        uniforms.shadowRadius = shadow.radius;
                        uniforms.shadowMapSize = shadow.mapSize;
                    }
                    this.state.spotShadowMap[spotLength] = shadowMap;
                    this.state.spotShadowMatrix[spotLength] = light.shadow.matrix;
                    this.state.spot[spotLength] = uniforms;
                    spotLength++;
                }
                else if (light.isRectAreaLight) {
                    var uniforms = this.cache.get(light);
                    uniforms.color
                        .copy(color)
                        .multiplyScalar(intensity / (light.width * light.height));
                    uniforms.position.setFromMatrixPosition(light.matrixWorld);
                    uniforms.position.applyMatrix4(viewMatrix);
                    this.matrix42.identity();
                    this.matrix4.copy(light.matrixWorld);
                    this.matrix4.premultiply(viewMatrix);
                    this.matrix42.extractRotation(this.matrix4);
                    uniforms.halfWidth.set(light.width * 0.5, 0.0, 0.0);
                    uniforms.halfHeight.set(0.0, light.height * 0.5, 0.0);
                    uniforms.halfWidth.applyMatrix4(this.matrix42);
                    uniforms.halfHeight.applyMatrix4(this.matrix42);
                    this.state.rectArea[rectAreaLength] = uniforms;
                    rectAreaLength++;
                }
                else if (light.isPointLight) {
                    var uniforms = this.cache.get(light);
                    uniforms.position.setFromMatrixPosition(light.matrixWorld);
                    uniforms.position.applyMatrix4(viewMatrix);
                    uniforms.color.copy(light.color).multiplyScalar(light.intensity);
                    uniforms.distance = light.distance;
                    uniforms.decay = (light.distance === 0) ? 0.0 : light.decay;
                    uniforms.shadow = light.castShadow;
                    if (light.castShadow) {
                        var shadow = light.shadow;
                        uniforms.shadowBias = shadow.bias;
                        uniforms.shadowRadius = shadow.radius;
                        uniforms.shadowMapSize = shadow.mapSize;
                        uniforms.shadowCameraNear = shadow.camera.near;
                        uniforms.shadowCameraFar = shadow.camera.far;
                    }
                    this.state.pointShadowMap[pointLength] = shadowMap;
                    this.state.pointShadowMatrix[pointLength] = light.shadow.matrix;
                    this.state.point[pointLength] = uniforms;
                    pointLength++;
                }
                else if (light.isHemisphereLight) {
                    var uniforms = this.cache.get(light);
                    uniforms.direction.setFromMatrixPosition(light.matrixWorld);
                    uniforms.direction.transformDirection(viewMatrix);
                    uniforms.direction.normalize();
                    uniforms.skyColor.copy(light.color).multiplyScalar(intensity);
                    uniforms.groundColor.copy(light.groundColor).multiplyScalar(intensity);
                    this.state.hemi[hemiLength] = uniforms;
                    hemiLength++;
                }
            }
            this.state.ambient[0] = r;
            this.state.ambient[1] = g;
            this.state.ambient[2] = b;
            this.state.directional.length = directionalLength;
            this.state.spot.length = spotLength;
            this.state.rectArea.length = rectAreaLength;
            this.state.point.length = pointLength;
            this.state.hemi.length = hemiLength;
            this.state.hash = directionalLength + ',' + pointLength + ',' + spotLength + ',' + rectAreaLength + ',' + hemiLength + ',' + shadows.length;
        }
    }
    exports.WebGLLights = WebGLLights;
});
//# sourceMappingURL=WebGLLights.js.map