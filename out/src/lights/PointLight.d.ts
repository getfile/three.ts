import { Light } from './Light';
declare class PointLight extends Light {
    constructor(color: any, intensity: any, distance: any, decay: any);
    power: number;
    copy(source: any): this;
}
export { PointLight };
