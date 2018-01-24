import { WebGLState } from './WebGLState';
declare class WebGLTextures {
    private _gl;
    extensions: any;
    state: WebGLState;
    properties: any;
    capabilities: any;
    utils: any;
    infoMemory: any;
    _isWebGL2: boolean;
    _videoTextures: any;
    constructor(_gl: any, extensions: any, state: any, properties: any, capabilities: any, utils: any, infoMemory: any);
    clampToMaxSize(image: any, maxSize: any): any;
    isPowerOfTwo(image: any): boolean;
    makePowerOfTwo(image: any): any;
    textureNeedsPowerOfTwo(texture: any): boolean;
    textureNeedsGenerateMipmaps(texture: any, isPowerOfTwo: any): boolean;
    filterFallback(f: any): number;
    onTextureDispose(event: any): void;
    onRenderTargetDispose(event: any): void;
    deallocateTexture(texture: any): void;
    deallocateRenderTarget(renderTarget: any): void;
    setTexture2D(texture: any, slot: any): void;
    setTextureCube(texture: any, slot: any): void;
    setTextureCubeDynamic(texture: any, slot: any): void;
    setTextureParameters(textureType: any, texture: any, isPowerOfTwoImage: any): void;
    uploadTexture(textureProperties: any, texture: any, slot: any): void;
    setupFrameBufferTexture(framebuffer: any, renderTarget: any, attachment: any, textureTarget: any): void;
    setupRenderBufferStorage(renderbuffer: any, renderTarget: any): void;
    setupDepthTexture(framebuffer: any, renderTarget: any): void;
    setupDepthRenderbuffer(renderTarget: any): void;
    setupRenderTarget(renderTarget: any): void;
    updateRenderTargetMipmap(renderTarget: any): void;
    updateVideoTextures(): void;
}
export { WebGLTextures };
