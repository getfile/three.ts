declare class ShapeUtils {
    static area(contour: any): number;
    static isClockWise(pts: any): boolean;
    static triangulateShape(contour: any, holes: any): any[];
}
export { ShapeUtils };
