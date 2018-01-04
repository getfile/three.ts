declare class WebGLAttributes {
    gl: WebGLRenderingContext;
    constructor(gl: any);
    buffers: {};
    createBuffer(attribute: any, bufferType: any): {
        buffer: WebGLBuffer;
        type: number;
        bytesPerElement: any;
        version: any;
    };
    updateBuffer(buffer: any, attribute: any, bufferType: any): void;
    get(attribute: any): any;
    remove(attribute: any): void;
    update(attribute: any, bufferType: any): void;
}
export { WebGLAttributes };
