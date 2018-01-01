declare class Cylindrical {
    radius: number;
    theta: number;
    y: number;
    constructor(radius?: number, theta?: number, y?: number);
    set(radius: any, theta: any, y: any): this;
    clone(): Cylindrical;
    copy(other: any): this;
    setFromVector3(vec3: any): this;
}
export { Cylindrical };
