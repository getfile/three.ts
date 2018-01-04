define(["require", "exports", "../math/Vector2.js"], function (require, exports, Vector2_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function DirectGeometry() {
        this.indices = [];
        this.vertices = [];
        this.normals = [];
        this.colors = [];
        this.uvs = [];
        this.uvs2 = [];
        this.groups = [];
        this.morphTargets = {};
        this.skinWeights = [];
        this.skinIndices = [];
        this.boundingBox = null;
        this.boundingSphere = null;
        this.verticesNeedUpdate = false;
        this.normalsNeedUpdate = false;
        this.colorsNeedUpdate = false;
        this.uvsNeedUpdate = false;
        this.groupsNeedUpdate = false;
    }
    exports.DirectGeometry = DirectGeometry;
    Object.assign(DirectGeometry.prototype, {
        computeGroups: function (geometry) {
            var group;
            var groups = [];
            var materialIndex = undefined;
            var faces = geometry.faces;
            for (var i = 0; i < faces.length; i++) {
                var face = faces[i];
                if (face.materialIndex !== materialIndex) {
                    materialIndex = face.materialIndex;
                    if (group !== undefined) {
                        group.count = (i * 3) - group.start;
                        groups.push(group);
                    }
                    group = {
                        start: i * 3,
                        materialIndex: materialIndex
                    };
                }
            }
            if (group !== undefined) {
                group.count = (i * 3) - group.start;
                groups.push(group);
            }
            this.groups = groups;
        },
        fromGeometry: function (geometry) {
            var faces = geometry.faces;
            var vertices = geometry.vertices;
            var faceVertexUvs = geometry.faceVertexUvs;
            var hasFaceVertexUv = faceVertexUvs[0] && faceVertexUvs[0].length > 0;
            var hasFaceVertexUv2 = faceVertexUvs[1] && faceVertexUvs[1].length > 0;
            var morphTargets = geometry.morphTargets;
            var morphTargetsLength = morphTargets.length;
            var morphTargetsPosition;
            if (morphTargetsLength > 0) {
                morphTargetsPosition = [];
                for (var i = 0; i < morphTargetsLength; i++) {
                    morphTargetsPosition[i] = [];
                }
                this.morphTargets.position = morphTargetsPosition;
            }
            var morphNormals = geometry.morphNormals;
            var morphNormalsLength = morphNormals.length;
            var morphTargetsNormal;
            if (morphNormalsLength > 0) {
                morphTargetsNormal = [];
                for (var i = 0; i < morphNormalsLength; i++) {
                    morphTargetsNormal[i] = [];
                }
                this.morphTargets.normal = morphTargetsNormal;
            }
            var skinIndices = geometry.skinIndices;
            var skinWeights = geometry.skinWeights;
            var hasSkinIndices = skinIndices.length === vertices.length;
            var hasSkinWeights = skinWeights.length === vertices.length;
            for (var i = 0; i < faces.length; i++) {
                var face = faces[i];
                this.vertices.push(vertices[face.a], vertices[face.b], vertices[face.c]);
                var vertexNormals = face.vertexNormals;
                if (vertexNormals.length === 3) {
                    this.normals.push(vertexNormals[0], vertexNormals[1], vertexNormals[2]);
                }
                else {
                    var normal = face.normal;
                    this.normals.push(normal, normal, normal);
                }
                var vertexColors = face.vertexColors;
                if (vertexColors.length === 3) {
                    this.colors.push(vertexColors[0], vertexColors[1], vertexColors[2]);
                }
                else {
                    var color = face.color;
                    this.colors.push(color, color, color);
                }
                if (hasFaceVertexUv === true) {
                    var vertexUvs = faceVertexUvs[0][i];
                    if (vertexUvs !== undefined) {
                        this.uvs.push(vertexUvs[0], vertexUvs[1], vertexUvs[2]);
                    }
                    else {
                        console.warn('THREE.DirectGeometry.fromGeometry(): Undefined vertexUv ', i);
                        this.uvs.push(new Vector2_js_1.Vector2(), new Vector2_js_1.Vector2(), new Vector2_js_1.Vector2());
                    }
                }
                if (hasFaceVertexUv2 === true) {
                    var vertexUvs = faceVertexUvs[1][i];
                    if (vertexUvs !== undefined) {
                        this.uvs2.push(vertexUvs[0], vertexUvs[1], vertexUvs[2]);
                    }
                    else {
                        console.warn('THREE.DirectGeometry.fromGeometry(): Undefined vertexUv2 ', i);
                        this.uvs2.push(new Vector2_js_1.Vector2(), new Vector2_js_1.Vector2(), new Vector2_js_1.Vector2());
                    }
                }
                for (var j = 0; j < morphTargetsLength; j++) {
                    var morphTarget = morphTargets[j].vertices;
                    morphTargetsPosition[j].push(morphTarget[face.a], morphTarget[face.b], morphTarget[face.c]);
                }
                for (var j = 0; j < morphNormalsLength; j++) {
                    var morphNormal = morphNormals[j].vertexNormals[i];
                    morphTargetsNormal[j].push(morphNormal.a, morphNormal.b, morphNormal.c);
                }
                if (hasSkinIndices) {
                    this.skinIndices.push(skinIndices[face.a], skinIndices[face.b], skinIndices[face.c]);
                }
                if (hasSkinWeights) {
                    this.skinWeights.push(skinWeights[face.a], skinWeights[face.b], skinWeights[face.c]);
                }
            }
            this.computeGroups(geometry);
            this.verticesNeedUpdate = geometry.verticesNeedUpdate;
            this.normalsNeedUpdate = geometry.normalsNeedUpdate;
            this.colorsNeedUpdate = geometry.colorsNeedUpdate;
            this.uvsNeedUpdate = geometry.uvsNeedUpdate;
            this.groupsNeedUpdate = geometry.groupsNeedUpdate;
            return this;
        }
    });
});
//# sourceMappingURL=DirectGeometry.js.map