declare class LightShadow {
    camera: any;
    bias: any;
    radius: any;
    mapSize: any;
    map: any;
    matrix: any;
    constructor(camera: any);
    copy(source: any): this;
    clone(): LightShadow;
    toJSON(): {};
}
export { LightShadow };
