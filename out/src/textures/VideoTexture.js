define(["require", "exports", "./Texture.js"], function (require, exports, Texture_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class VideoTexture extends Texture_js_1.Texture {
        constructor(video, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy) {
            super(video, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy);
            this.onLoaded = () => {
                this.image.removeEventListener('loadeddata', this.onLoaded, false);
                this.needsUpdate = true;
            };
            this.generateMipmaps = false;
            video.addEventListener('loadeddata', this.onLoaded, false);
        }
        update() {
            var video = this.image;
            if (video.readyState >= video.HAVE_CURRENT_DATA)
                this.needsUpdate = true;
        }
    }
    exports.VideoTexture = VideoTexture;
});
//# sourceMappingURL=VideoTexture.js.map