declare class UniformContainer {
    seq: any;
    map: any;
    constructor();
}
declare class WebGLUniforms extends UniformContainer {
    renderer: any;
    constructor(gl: any, program: any, renderer: any);
    setValue(gl: any, name: any, value: any): void;
    setOptional(gl: any, object: any, name: any): void;
    static upload(gl: any, seq: any, values: any, renderer: any): void;
    static seqWithValue(seq: any, values: any): any[];
}
export { UniformContainer, WebGLUniforms };
