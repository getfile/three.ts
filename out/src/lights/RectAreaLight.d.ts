import { Light } from './Light';
declare class RectAreaLight extends Light {
    width: any;
    height: any;
    constructor(color: any, intensity: any, width: any, height: any);
    copy(source: any): this;
    toJSON(meta: any): {};
}
export { RectAreaLight };
