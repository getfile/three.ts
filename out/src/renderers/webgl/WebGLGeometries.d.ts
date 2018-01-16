declare class WebGLGeometries {
    gl: any;
    attributes: any;
    infoMemory: any;
    geometries: any;
    wireframeAttributes: any;
    constructor(gl: any, attributes: any, infoMemory: any);
    onGeometryDispose(event: any): void;
    get(object: any, geometry: any): any;
    update(geometry: any): void;
    getWireframeAttribute(geometry: any): any;
}
export { WebGLGeometries };
