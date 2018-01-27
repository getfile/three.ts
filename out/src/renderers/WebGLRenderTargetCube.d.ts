import { WebGLRenderTarget } from './WebGLRenderTarget';
declare class WebGLRenderTargetCube extends WebGLRenderTarget {
    activeCubeFace: number;
    activeMipMapLevel: number;
    constructor(width: number, height: number, options: any);
}
export { WebGLRenderTargetCube };
