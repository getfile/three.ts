import { BufferAttribute } from "../../core/BufferAttribute";
declare class WebGLAttributes {
    gl: WebGLRenderingContext;
    buffers: Object;
    constructor(gl: any);
    createBuffer(attribute: BufferAttribute, bufferType: number): {
        buffer: WebGLBuffer;
        type: number;
        bytesPerElement: any;
        version: number;
    };
    private updateBuffer(buffer, attribute, bufferType);
    get(attribute: BufferAttribute): any;
    remove(attribute: any): void;
    update(attribute: BufferAttribute, bufferType: any): void;
}
export { WebGLAttributes };
