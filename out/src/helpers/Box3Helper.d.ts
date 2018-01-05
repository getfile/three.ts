import { LineSegments } from '../objects/LineSegments';
declare class Box3Helper extends LineSegments {
    box: any;
    constructor(box: any, hex: any);
    updateMatrixWorld(force: any): void;
}
export { Box3Helper };
