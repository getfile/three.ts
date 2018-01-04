define(["require", "exports", "../../constants", "../../cameras/OrthographicCamera", "../../geometries/BoxGeometry", "../../geometries/PlaneGeometry", "../../materials/MeshBasicMaterial", "../../materials/ShaderMaterial", "../../math/Color", "../../objects/Mesh", "../shaders/ShaderLib"], function (require, exports, constants_1, OrthographicCamera_1, BoxGeometry_1, PlaneGeometry_1, MeshBasicMaterial_1, ShaderMaterial_1, Color_1, Mesh_1, ShaderLib_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class WebGLBackground {
        constructor(renderer, state, geometries, premultipliedAlpha) {
            this.clearColor = new Color_1.Color(0x000000);
            this.clearAlpha = 0;
            this.renderer = renderer;
            this.state = state;
            this.geometries = geometries;
            this.premultipliedAlpha = premultipliedAlpha;
        }
        render(renderList, scene, camera, forceClear) {
            var background = scene.background;
            if (background === null) {
                this.setClear(this.clearColor, this.clearAlpha);
            }
            else if (background && background.isColor) {
                this.setClear(background, 1);
                forceClear = true;
            }
            if (this.renderer.autoClear || forceClear)
                this.renderer.clear(this.renderer.autoClearColor, this.renderer.autoClearDepth, this.renderer.autoClearStencil);
            if (background && background.isCubeTexture) {
                if (this.boxMesh === undefined) {
                    this.boxMesh = new Mesh_1.Mesh(new BoxGeometry_1.BoxBufferGeometry(1, 1, 1), new ShaderMaterial_1.ShaderMaterial({
                        uniforms: ShaderLib_1.ShaderLib.cube.uniforms,
                        vertexShader: ShaderLib_1.ShaderLib.cube.vertexShader,
                        fragmentShader: ShaderLib_1.ShaderLib.cube.fragmentShader,
                        side: constants_1.BackSide,
                        depthTest: true,
                        depthWrite: false,
                        fog: false
                    }));
                    this.boxMesh.geometry.removeAttribute('normal');
                    this.boxMesh.geometry.removeAttribute('uv');
                    this.boxMesh.onBeforeRender = function (renderer, scene, camera) {
                        this.matrixWorld.copyPosition(camera.matrixWorld);
                    };
                    this.geometries.update(this.boxMesh.geometry);
                }
                this.boxMesh.material.uniforms.tCube.value = background;
                renderList.push(this.boxMesh, this.boxMesh.geometry, this.boxMesh.material, 0, null);
            }
            else if (background && background.isTexture) {
                if (this.planeCamera === undefined) {
                    this.planeCamera = new OrthographicCamera_1.OrthographicCamera(-1, 1, 1, -1, 0, 1);
                    this.planeMesh = new Mesh_1.Mesh(new PlaneGeometry_1.PlaneBufferGeometry(2, 2), new MeshBasicMaterial_1.MeshBasicMaterial({ depthTest: false, depthWrite: false, fog: false }));
                    this.geometries.update(this.planeMesh.geometry);
                }
                this.planeMesh.material.map = background;
                this.renderer.renderBufferDirect(this.planeCamera, null, this.planeMesh.geometry, this.planeMesh.material, this.planeMesh, null);
            }
        }
        setClear(color, alpha) {
            this.state.buffers.color.setClear(color.r, color.g, color.b, alpha, this.premultipliedAlpha);
        }
        getClearColor() {
            return this.clearColor;
        }
        setClearColor(color, alpha) {
            this.clearColor.set(color);
            this.clearAlpha = alpha !== undefined ? alpha : 1;
            this.setClear(this.clearColor, this.clearAlpha);
        }
        getClearAlpha() {
            return this.clearAlpha;
        }
        setClearAlpha(alpha) {
            this.clearAlpha = alpha;
            this.setClear(this.clearColor, this.clearAlpha);
        }
    }
    exports.WebGLBackground = WebGLBackground;
});
//# sourceMappingURL=WebGLBackground.js.map