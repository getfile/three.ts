import { Light } from './Light';
declare class SpotLight extends Light {
    target: any;
    constructor(color: any, intensity: any, distance: any, angle: any, penumbra: any, decay: any);
    power: number;
    copy(source: any): this;
}
export { SpotLight };
