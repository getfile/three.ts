import { Geometry } from '../core/Geometry';
import { BufferGeometry } from '../core/BufferGeometry';
declare class BoxGeometry extends Geometry {
    constructor(width: any, height: any, depth: any, widthSegments: any, heightSegments: any, depthSegments: any);
}
declare class BoxBufferGeometry extends BufferGeometry {
    constructor(width?: number, height?: number, depth?: number, widthSegments?: number, heightSegments?: number, depthSegments?: number);
}
export { BoxGeometry, BoxBufferGeometry };
