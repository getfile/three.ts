import { EventDispatcher } from '../core/EventDispatcher';
declare class Material extends EventDispatcher {
    fog: any;
    lights: any;
    blending: any;
    side: any;
    flatShading: any;
    vertexColors: any;
    opacity: any;
    transparent: any;
    blendSrc: any;
    blendDst: any;
    blendEquation: any;
    blendSrcAlpha: any;
    blendDstAlpha: any;
    blendEquationAlpha: any;
    depthFunc: any;
    depthTest: any;
    depthWrite: any;
    clippingPlanes: any;
    clipIntersection: any;
    clipShadows: any;
    colorWrite: any;
    precision: any;
    polygonOffset: any;
    polygonOffsetFactor: any;
    polygonOffsetUnits: any;
    dithering: any;
    alphaTest: any;
    premultipliedAlpha: any;
    overdraw: any;
    visible: any;
    userData: any;
    needsUpdate: any;
    constructor();
    onBeforeCompile(): void;
    setValues(values: any): void;
    toJSON(meta: any): {
        metadata: {
            version: number;
            type: string;
            generator: string;
        };
    };
    clone(): Material;
    copy(source: any): this;
    dispose(): void;
}
export { Material };
