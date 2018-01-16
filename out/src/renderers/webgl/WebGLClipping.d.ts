declare class WebGLClipping {
    uniform: any;
    numPlanes: any;
    numIntersection: any;
    globalState: any;
    numGlobalPlanes: any;
    localClippingEnabled: any;
    renderingShadows: any;
    plane: any;
    viewNormalMatrix: any;
    constructor();
    init(planes: any, enableLocalClipping: any, camera: any): any;
    beginShadows(): void;
    endShadows(): void;
    setState(planes: any, clipIntersection: any, clipShadows: any, camera: any, cache: any, fromCache: any): void;
    resetGlobalState(): void;
    projectPlanes(planes: any, camera?: any, dstOffset?: any, skipTransform?: any): any;
}
export { WebGLClipping };
