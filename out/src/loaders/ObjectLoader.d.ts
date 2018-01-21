declare class ObjectLoader {
    manager: any;
    texturePath: any;
    crossOrigin: any;
    TEXTURE_MAPPING: any;
    TEXTURE_WRAPPING: any;
    TEXTURE_FILTER: any;
    constructor(manager: any);
    load(url: any, onLoad: any, onProgress: any, onError: any): void;
    setTexturePath(value: any): void;
    setCrossOrigin(value: any): void;
    parse(json: any, onLoad: any): any;
    parseShape(json: any): {};
    parseGeometries(json: any, shapes: any): {};
    parseMaterials(json: any, textures: any): {};
    parseAnimations(json: any): any[];
    parseImages(json: any, onLoad: any): {};
    parseConstant(value: any, type: any): any;
    parseTextures(json: any, images: any): {};
    parseObject(data: any, geometries?: any, materials?: any): any;
}
export { ObjectLoader };
