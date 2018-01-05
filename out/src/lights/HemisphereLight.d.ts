import { Light } from './Light';
declare class HemisphereLight extends Light {
    constructor(skyColor: any, groundColor: any, intensity: any);
    copy(source: any): this;
}
export { HemisphereLight };
