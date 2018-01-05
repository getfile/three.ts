define(["require", "exports", "../core/EventDispatcher", "../constants", "../constants", "../math/Math", "../math/Vector2", "../math/Matrix3"], function (require, exports, EventDispatcher_1, constants_1, constants_2, Math_1, Vector2_1, Matrix3_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var textureId = 0;
    class Texture extends EventDispatcher_1.EventDispatcher {
        constructor(image, mapping = Texture.DEFAULT_MAPPING, wrapS = constants_2.ClampToEdgeWrapping, wrapT = constants_2.ClampToEdgeWrapping, magFilter = constants_2.LinearFilter, minFilter = constants_2.LinearMipMapLinearFilter, format = constants_2.RGBAFormat, type = constants_2.UnsignedByteType, anisotropy = 1, encoding = constants_2.LinearEncoding) {
            super();
            this.id = textureId++;
            this.uuid = Math_1._Math.generateUUID();
            this.name = '';
            this.type = type + '';
            this.image = (image !== undefined ? image : Texture.DEFAULT_IMAGE);
            this.mipmaps = [];
            this.mapping = mapping;
            this.wrapS = wrapS;
            this.wrapT = wrapT;
            this.magFilter = magFilter;
            this.minFilter = minFilter;
            this.anisotropy = anisotropy;
            this.format = format;
            this.offset = new Vector2_1.Vector2(0, 0);
            this.repeat = new Vector2_1.Vector2(1, 1);
            this.center = new Vector2_1.Vector2(0, 0);
            this.rotation = 0;
            this.matrixAutoUpdate = true;
            this.matrix = new Matrix3_1.Matrix3();
            this.generateMipmaps = true;
            this.premultiplyAlpha = false;
            this.flipY = true;
            this.unpackAlignment = 4;
            this.encoding = encoding;
            this.version = 0;
            this.onUpdate = null;
        }
        set needsUpdate(value) {
            if (value === true)
                this.version++;
        }
        clone() {
            return new Texture().copy(this);
        }
        copy(source) {
            this.name = source.name;
            this.image = source.image;
            this.mipmaps = source.mipmaps.slice(0);
            this.mapping = source.mapping;
            this.wrapS = source.wrapS;
            this.wrapT = source.wrapT;
            this.magFilter = source.magFilter;
            this.minFilter = source.minFilter;
            this.anisotropy = source.anisotropy;
            this.format = source.format;
            this.type = source.type;
            this.offset.copy(source.offset);
            this.repeat.copy(source.repeat);
            this.center.copy(source.center);
            this.rotation = source.rotation;
            this.matrixAutoUpdate = source.matrixAutoUpdate;
            this.matrix.copy(source.matrix);
            this.generateMipmaps = source.generateMipmaps;
            this.premultiplyAlpha = source.premultiplyAlpha;
            this.flipY = source.flipY;
            this.unpackAlignment = source.unpackAlignment;
            this.encoding = source.encoding;
            return this;
        }
        toJSON(meta) {
            var isRootObject = (meta === undefined || typeof meta === 'string');
            if (!isRootObject && meta.textures[this.uuid] !== undefined)
                return meta.textures[this.uuid];
            function getDataURL(image) {
                var canvas;
                if (image instanceof HTMLCanvasElement)
                    canvas = image;
                else {
                    canvas = document.createElementNS('http://www.w3.org/1999/xhtml', 'canvas');
                    canvas.width = image.width;
                    canvas.height = image.height;
                    var context = canvas.getContext('2d');
                    if (image instanceof ImageData)
                        context.putImageData(image, 0, 0);
                    else
                        context.drawImage(image, 0, 0, image.width, image.height);
                }
                if (canvas.width > 2048 || canvas.height > 2048)
                    return canvas.toDataURL('image/jpeg', 0.6);
                else
                    return canvas.toDataURL('image/png');
            }
            var output = {
                metadata: {
                    version: 4.5,
                    type: 'Texture',
                    generator: 'Texture.toJSON'
                },
                uuid: this.uuid,
                name: this.name,
                mapping: this.mapping,
                repeat: [this.repeat.x, this.repeat.y],
                offset: [this.offset.x, this.offset.y],
                center: [this.center.x, this.center.y],
                rotation: this.rotation,
                wrap: [this.wrapS, this.wrapT],
                minFilter: this.minFilter,
                magFilter: this.magFilter,
                anisotropy: this.anisotropy,
                flipY: this.flipY,
                image: undefined
            };
            if (this.image !== undefined) {
                var image = this.image;
                if (image.uuid === undefined)
                    image.uuid = Math_1._Math.generateUUID();
                if (!isRootObject && meta.images[image.uuid] === undefined) {
                    meta.images[image.uuid] = {
                        uuid: image.uuid,
                        url: getDataURL(image)
                    };
                }
                output.image = image.uuid;
            }
            if (!isRootObject)
                meta.textures[this.uuid] = output;
            return output;
        }
        dispose() {
            this.dispatchEvent({ type: 'dispose' });
        }
        transformUv(uv) {
            if (this.mapping !== constants_1.UVMapping)
                return;
            uv.applyMatrix3(this.matrix);
            if (uv.x < 0 || uv.x > 1) {
                switch (this.wrapS) {
                    case constants_2.RepeatWrapping:
                        uv.x = uv.x - Math.floor(uv.x);
                        break;
                    case constants_2.ClampToEdgeWrapping:
                        uv.x = uv.x < 0 ? 0 : 1;
                        break;
                    case constants_2.MirroredRepeatWrapping:
                        if (Math.abs(Math.floor(uv.x) % 2) === 1)
                            uv.x = Math.ceil(uv.x) - uv.x;
                        else
                            uv.x = uv.x - Math.floor(uv.x);
                        break;
                }
            }
            if (uv.y < 0 || uv.y > 1) {
                switch (this.wrapT) {
                    case constants_2.RepeatWrapping:
                        uv.y = uv.y - Math.floor(uv.y);
                        break;
                    case constants_2.ClampToEdgeWrapping:
                        uv.y = uv.y < 0 ? 0 : 1;
                        break;
                    case constants_2.MirroredRepeatWrapping:
                        if (Math.abs(Math.floor(uv.y) % 2) === 1)
                            uv.y = Math.ceil(uv.y) - uv.y;
                        else
                            uv.y = uv.y - Math.floor(uv.y);
                        break;
                }
            }
            if (this.flipY)
                uv.y = 1 - uv.y;
        }
    }
    Texture.DEFAULT_IMAGE = undefined;
    Texture.DEFAULT_MAPPING = constants_1.UVMapping;
    exports.Texture = Texture;
});
//# sourceMappingURL=Texture.js.map