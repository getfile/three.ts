import { EventDispatcher } from '../core/EventDispatcher';
import { Texture } from '../textures/Texture';
import { Vector4 } from '../math/Vector4';
declare class WebGLRenderTarget extends EventDispatcher {
    width: number;
    height: number;
    scissorTest: boolean;
    scissor: Vector4;
    viewport: Vector4;
    texture: Texture;
    depthTexture: Texture;
    depthBuffer: boolean;
    stencilBuffer: boolean;
    constructor(width: number, height: number, options?: any);
    setSize(width: number, height: number): void;
    clone(): WebGLRenderTarget;
    copy(source: WebGLRenderTarget): WebGLRenderTarget;
    dispose(): void;
}
export { WebGLRenderTarget };
