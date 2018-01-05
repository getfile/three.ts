define(["require", "exports", "../core/EventDispatcher", "../textures/Texture", "../constants", "../math/Vector4", "../math/Math"], function (require, exports, EventDispatcher_1, Texture_1, constants_1, Vector4_1, Math_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class WebGLRenderTarget extends EventDispatcher_1.EventDispatcher {
        constructor(width, height, options) {
            super();
            this.uuid = Math_1._Math.generateUUID();
            this.width = width;
            this.height = height;
            this.scissor = new Vector4_1.Vector4(0, 0, width, height);
            this.scissorTest = false;
            this.viewport = new Vector4_1.Vector4(0, 0, width, height);
            options = options || {};
            if (options.minFilter === undefined)
                options.minFilter = constants_1.LinearFilter;
            this.texture = new Texture_1.Texture(undefined, undefined, options.wrapS, options.wrapT, options.magFilter, options.minFilter, options.format, options.type, options.anisotropy, options.encoding);
            this.depthBuffer = options.depthBuffer !== undefined ? options.depthBuffer : true;
            this.stencilBuffer = options.stencilBuffer !== undefined ? options.stencilBuffer : true;
            this.depthTexture = options.depthTexture !== undefined ? options.depthTexture : null;
        }
        setSize(width, height) {
            if (this.width !== width || this.height !== height) {
                this.width = width;
                this.height = height;
                this.dispose();
            }
            this.viewport.set(0, 0, width, height);
            this.scissor.set(0, 0, width, height);
        }
        clone() {
            return new WebGLRenderTarget(this.width, this.height).copy(this);
        }
        copy(source) {
            this.width = source.width;
            this.height = source.height;
            this.viewport.copy(source.viewport);
            this.texture = source.texture.clone();
            this.depthBuffer = source.depthBuffer;
            this.stencilBuffer = source.stencilBuffer;
            this.depthTexture = source.depthTexture;
            return this;
        }
        dispose() {
            this.dispatchEvent({ type: 'dispose' });
        }
    }
    exports.WebGLRenderTarget = WebGLRenderTarget;
});
//# sourceMappingURL=WebGLRenderTarget.js.map