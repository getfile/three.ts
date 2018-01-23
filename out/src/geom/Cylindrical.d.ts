import { Vector3 } from "../math/Vector3";
declare class Cylindrical {
    radius: number;
    theta: number;
    y: number;
    constructor(radius?: number, theta?: number, y?: number);
    set(radius: number, theta: number, y: number): Cylindrical;
    clone(): Cylindrical;
    copy(other: Cylindrical): Cylindrical;
    setFromVector3(vec3: Vector3): Cylindrical;
}
export { Cylindrical };
