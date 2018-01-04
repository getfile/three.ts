import { Texture } from './Texture.js';
declare class VideoTexture extends Texture {
    constructor(video: any, mapping: any, wrapS: any, wrapT: any, magFilter: any, minFilter: any, format: any, type: any, anisotropy: any);
    onLoaded: () => void;
    update(): void;
}
export { VideoTexture };
