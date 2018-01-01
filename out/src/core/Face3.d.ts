import { Color } from '../math/Color';
import { Vector3 } from '../math/Vector3';
declare class Face3 {
    a: any;
    b: any;
    c: any;
    color: Color;
    vertexColors: Array<Color>;
    normal: Vector3;
    vertexNormals: Array<Vector3>;
    materialIndex: number;
    constructor(a: any, b: any, c: any, normal: Vector3, color: Color, materialIndex?: number);
    clone(): Face3;
    copy(source: Face3): Face3;
}
export { Face3 };
