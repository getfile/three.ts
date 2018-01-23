import { Vector3 } from "../math/Vector3";
declare class Spherical {
    radius: number;
    phi: number;
    theta: number;
    constructor(radius?: number, phi?: number, theta?: number);
    set(radius: number, phi: number, theta: number): Spherical;
    clone(): Spherical;
    copy(other: Spherical): Spherical;
    makeSafe(): Spherical;
    setFromVector3(vec3: Vector3): Spherical;
}
export { Spherical };
