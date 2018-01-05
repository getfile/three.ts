import { EventDispatcher } from '../core/EventDispatcher';
declare class WebGLRenderTarget extends EventDispatcher {
    width: any;
    height: any;
    scissor: any;
    scissorTest: any;
    viewport: any;
    texture: any;
    depthBuffer: any;
    stencilBuffer: any;
    depthTexture: any;
    constructor(width: any, height: any, options?: any);
    setSize(width: any, height: any): void;
    clone(): WebGLRenderTarget;
    copy(source: any): this;
    dispose(): void;
}
export { WebGLRenderTarget };
