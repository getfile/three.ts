define(["require", "exports", "./WebGLRenderTarget"], function (require, exports, WebGLRenderTarget_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class WebGLRenderTargetCube extends WebGLRenderTarget_1.WebGLRenderTarget {
        constructor(width, height, options) {
            super(width, height, options);
            this.activeCubeFace = 0;
            this.activeMipMapLevel = 0;
        }
    }
    exports.WebGLRenderTargetCube = WebGLRenderTargetCube;
});
//# sourceMappingURL=WebGLRenderTargetCube.js.map