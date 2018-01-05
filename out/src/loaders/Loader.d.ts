declare class Loader {
    onLoadStart: any;
    onLoadProgress: any;
    onLoadComplete: any;
    handlers: any;
    constructor();
    add(regex: any, loader: any): void;
    get(file: any): any;
    crossOrigin: any;
    initMaterials(materials: any, texturePath: any, crossOrigin: any): any[];
    createMaterial(m: any, texturePath: any, crossOrigin: any): any;
}
export { Loader };
