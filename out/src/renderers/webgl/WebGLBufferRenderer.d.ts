declare class WebGLBufferRenderer {
    gl: any;
    extensions: any;
    infoRender: any;
    mode: any;
    constructor(gl: any, extensions: any, infoRender: any);
    setMode(value: any): void;
    render(start: any, count: any): void;
    renderInstances(geometry: any, start: any, count: any): void;
}
export { WebGLBufferRenderer };
