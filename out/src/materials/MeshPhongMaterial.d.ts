import { Material } from './Material';
declare class MeshPhongMaterial extends Material {
    lightMapIntensity: any;
    aoMap: any;
    aoMapIntensity: any;
    combine: any;
    reflectivity: any;
    refractionRatio: any;
    morphNormals: any;
    constructor(parameters: any);
    copy(source: any): this;
}
export { MeshPhongMaterial };
