declare class ShapePath {
    type: any;
    subPaths: any;
    currentPath: any;
    constructor();
    moveTo(x: any, y: any): void;
    lineTo(x: any, y: any): void;
    quadraticCurveTo(aCPx: any, aCPy: any, aX: any, aY: any): void;
    bezierCurveTo(aCP1x: any, aCP1y: any, aCP2x: any, aCP2y: any, aX: any, aY: any): void;
    splineThru(pts: any): void;
    toShapes(isCCW: any, noHoles: any): any[];
}
export { ShapePath };
