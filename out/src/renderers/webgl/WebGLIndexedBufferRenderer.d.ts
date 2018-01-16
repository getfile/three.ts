declare class WebGLIndexedBufferRenderer {
    gl: any;
    extensions: any;
    infoRender: any;
    mode: any;
    type: any;
    bytesPerElement: any;
    constructor(gl: any, extensions: any, infoRender: any);
    setMode(value: any): void;
    setIndex(value: any): void;
    render(start: any, count: any): void;
    renderInstances(geometry: any, start: any, count: any): void;
}
export { WebGLIndexedBufferRenderer };
