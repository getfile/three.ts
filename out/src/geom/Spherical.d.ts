declare class Spherical {
    radius: number;
    phi: number;
    theta: number;
    constructor(radius?: number, phi?: number, theta?: number);
    set(radius: any, phi: any, theta: any): this;
    clone(): Spherical;
    copy(other: any): this;
    makeSafe(): this;
    setFromVector3(vec3: any): this;
}
export { Spherical };
