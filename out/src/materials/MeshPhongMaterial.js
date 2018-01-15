define(["require", "exports", "./Material", "../constants", "../math/Vector2", "../math/Color"], function (require, exports, Material_1, constants_1, Vector2_1, Color_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class MeshPhongMaterial extends Material_1.Material {
        constructor(parameters) {
            super();
            this.type = 'MeshPhongMaterial';
            this.color = new Color_1.Color(0xffffff);
            this.specular = new Color_1.Color(0x111111);
            this.shininess = 30;
            this.map = null;
            this.lightMap = null;
            this.lightMapIntensity = 1.0;
            this.aoMap = null;
            this.aoMapIntensity = 1.0;
            this.emissive = new Color_1.Color(0x000000);
            this.emissiveIntensity = 1.0;
            this.emissiveMap = null;
            this.bumpMap = null;
            this.bumpScale = 1;
            this.normalMap = null;
            this.normalScale = new Vector2_1.Vector2(1, 1);
            this.displacementMap = null;
            this.displacementScale = 1;
            this.displacementBias = 0;
            this.specularMap = null;
            this.alphaMap = null;
            this.envMap = null;
            this.combine = constants_1.MultiplyOperation;
            this.reflectivity = 1;
            this.refractionRatio = 0.98;
            this.wireframe = false;
            this.wireframeLinewidth = 1;
            this.wireframeLinecap = 'round';
            this.wireframeLinejoin = 'round';
            this.skinning = false;
            this.morphTargets = false;
            this.morphNormals = false;
            this.setValues(parameters);
        }
        copy(source) {
            Material_1.Material.prototype.copy.call(this, source);
            this.color.copy(source.color);
            this.specular.copy(source.specular);
            this.shininess = source.shininess;
            this.map = source.map;
            this.lightMap = source.lightMap;
            this.lightMapIntensity = source.lightMapIntensity;
            this.aoMap = source.aoMap;
            this.aoMapIntensity = source.aoMapIntensity;
            this.emissive.copy(source.emissive);
            this.emissiveMap = source.emissiveMap;
            this.emissiveIntensity = source.emissiveIntensity;
            this.bumpMap = source.bumpMap;
            this.bumpScale = source.bumpScale;
            this.normalMap = source.normalMap;
            this.normalScale.copy(source.normalScale);
            this.displacementMap = source.displacementMap;
            this.displacementScale = source.displacementScale;
            this.displacementBias = source.displacementBias;
            this.specularMap = source.specularMap;
            this.alphaMap = source.alphaMap;
            this.envMap = source.envMap;
            this.combine = source.combine;
            this.reflectivity = source.reflectivity;
            this.refractionRatio = source.refractionRatio;
            this.wireframe = source.wireframe;
            this.wireframeLinewidth = source.wireframeLinewidth;
            this.wireframeLinecap = source.wireframeLinecap;
            this.wireframeLinejoin = source.wireframeLinejoin;
            this.skinning = source.skinning;
            this.morphTargets = source.morphTargets;
            this.morphNormals = source.morphNormals;
            return this;
        }
    }
    exports.MeshPhongMaterial = MeshPhongMaterial;
});
//# sourceMappingURL=MeshPhongMaterial.js.map