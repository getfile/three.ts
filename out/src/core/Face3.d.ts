import { Color } from '../math/Color';
import { Vector3 } from '../math/Vector3';
declare class Face3 {
    a: any;
    b: any;
    c: any;
    color: Color;
    normal: Vector3;
    vertexColors: Array<Color>;
    vertexNormals: Array<Vector3>;
    materialIndex: number;
    constructor(a?: number, b?: number, c?: number, normal?: Vector3 | Vector3[], color?: Color | Color[], materialIndex?: number);
    clone(): Face3;
    copy(source: Face3): Face3;
}
export { Face3 };
