declare class MaterialLoader {
    manager: any;
    textures: any;
    constructor(manager?: any);
    load(url: any, onLoad: any, onProgress: any, onError: any): void;
    setTextures(value: any): void;
    parse(json: any): any;
}
export { MaterialLoader };
