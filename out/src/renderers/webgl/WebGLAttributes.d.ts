declare class WebGLAttributes {
    gl: WebGLRenderingContext;
    buffers: any;
    constructor(gl: any);
    createBuffer(attribute: any, bufferType: any): {
        buffer: WebGLBuffer;
        type: number;
        bytesPerElement: any;
        version: any;
    };
    private updateBuffer(buffer, attribute, bufferType);
    get(attribute: any): any;
    remove(attribute: any): void;
    update(attribute: any, bufferType: any): void;
}
export { WebGLAttributes };
