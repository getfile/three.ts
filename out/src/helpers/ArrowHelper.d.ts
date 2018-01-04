import { Object3D } from '../core/Object3D';
declare class ArrowHelper extends Object3D {
    line: any;
    cone: any;
    constructor(dir: any, origin: any, length: any, color: any, headLength: any, headWidth: any);
    setDirection(dir: any): void;
    setLength(length: any, headLength: any, headWidth: any): void;
    setColor(color: any): void;
}
export { ArrowHelper };
