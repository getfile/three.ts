import { Light } from './Light.js';
declare class DirectionalLight extends Light {
    target: any;
    constructor(color: any, intensity: any);
    copy(source: any): this;
}
export { DirectionalLight };
