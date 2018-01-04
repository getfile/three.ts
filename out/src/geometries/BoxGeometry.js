define(["require", "exports", "../core/Geometry", "../core/BufferGeometry", "../core/BufferAttribute", "../math/Vector3"], function (require, exports, Geometry_1, BufferGeometry_1, BufferAttribute_1, Vector3_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class BoxGeometry extends Geometry_1.Geometry {
        constructor(width, height, depth, widthSegments, heightSegments, depthSegments) {
            super();
            this.type = 'BoxGeometry';
            this.parameters = {
                width: width,
                height: height,
                depth: depth,
                widthSegments: widthSegments,
                heightSegments: heightSegments,
                depthSegments: depthSegments
            };
            this.fromBufferGeometry(new BoxBufferGeometry(width, height, depth, widthSegments, heightSegments, depthSegments));
            this.mergeVertices();
        }
    }
    exports.BoxGeometry = BoxGeometry;
    class BoxBufferGeometry extends BufferGeometry_1.BufferGeometry {
        constructor(width, height, depth, widthSegments, heightSegments, depthSegments) {
            super();
            this.type = 'BoxBufferGeometry';
            this.parameters = {
                width: width,
                height: height,
                depth: depth,
                widthSegments: widthSegments,
                heightSegments: heightSegments,
                depthSegments: depthSegments
            };
            width = width || 1;
            height = height || 1;
            depth = depth || 1;
            widthSegments = Math.floor(widthSegments) || 1;
            heightSegments = Math.floor(heightSegments) || 1;
            depthSegments = Math.floor(depthSegments) || 1;
            let indices = [];
            let vertices = [];
            let normals = [];
            let uvs = [];
            let numberOfVertices = 0;
            let groupStart = 0;
            buildPlane('z', 'y', 'x', -1, -1, depth, height, width, depthSegments, heightSegments, 0);
            buildPlane('z', 'y', 'x', 1, -1, depth, height, -width, depthSegments, heightSegments, 1);
            buildPlane('x', 'z', 'y', 1, 1, width, depth, height, widthSegments, depthSegments, 2);
            buildPlane('x', 'z', 'y', 1, -1, width, depth, -height, widthSegments, depthSegments, 3);
            buildPlane('x', 'y', 'z', 1, -1, width, height, depth, widthSegments, heightSegments, 4);
            buildPlane('x', 'y', 'z', -1, -1, width, height, -depth, widthSegments, heightSegments, 5);
            this.setIndex(indices);
            this.addAttribute('position', new BufferAttribute_1.Float32BufferAttribute(vertices, 3));
            this.addAttribute('normal', new BufferAttribute_1.Float32BufferAttribute(normals, 3));
            this.addAttribute('uv', new BufferAttribute_1.Float32BufferAttribute(uvs, 2));
            function buildPlane(u, v, w, udir, vdir, width, height, depth, gridX, gridY, materialIndex) {
                let segmentWidth = width / gridX;
                let segmentHeight = height / gridY;
                let widthHalf = width / 2;
                let heightHalf = height / 2;
                let depthHalf = depth / 2;
                let gridX1 = gridX + 1;
                let gridY1 = gridY + 1;
                let vertexCounter = 0;
                let groupCount = 0;
                let ix, iy;
                let vector = new Vector3_1.Vector3();
                for (iy = 0; iy < gridY1; iy++) {
                    let y = iy * segmentHeight - heightHalf;
                    for (ix = 0; ix < gridX1; ix++) {
                        let x = ix * segmentWidth - widthHalf;
                        vector[u] = x * udir;
                        vector[v] = y * vdir;
                        vector[w] = depthHalf;
                        vertices.push(vector.x, vector.y, vector.z);
                        vector[u] = 0;
                        vector[v] = 0;
                        vector[w] = depth > 0 ? 1 : -1;
                        normals.push(vector.x, vector.y, vector.z);
                        uvs.push(ix / gridX);
                        uvs.push(1 - (iy / gridY));
                        vertexCounter += 1;
                    }
                }
                for (iy = 0; iy < gridY; iy++) {
                    for (ix = 0; ix < gridX; ix++) {
                        let a = numberOfVertices + ix + gridX1 * iy;
                        let b = numberOfVertices + ix + gridX1 * (iy + 1);
                        let c = numberOfVertices + (ix + 1) + gridX1 * (iy + 1);
                        let d = numberOfVertices + (ix + 1) + gridX1 * iy;
                        indices.push(a, b, d);
                        indices.push(b, c, d);
                        groupCount += 6;
                    }
                }
                this.addGroup(groupStart, groupCount, materialIndex);
                groupStart += groupCount;
                numberOfVertices += vertexCounter;
            }
        }
    }
    exports.BoxBufferGeometry = BoxBufferGeometry;
});
//# sourceMappingURL=BoxGeometry.js.map