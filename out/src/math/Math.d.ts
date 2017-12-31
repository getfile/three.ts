declare class _Math {
    static readonly DEG2RAD: number;
    static readonly RAD2DEG: number;
    static lut: string[];
    static generateUUID(): string;
    static clamp(value: number, min: number, max: number): number;
    static euclideanModulo(n: number, m: number): number;
    static mapLinear(x: number, a1: number, a2: number, b1: number, b2: number): number;
    static lerp(x: number, y: number, t: number): number;
    static smoothstep(x: number, min: number, max: number): number;
    static smootherstep(x: number, min: number, max: number): number;
    static randInt(low: number, high: number): number;
    static randFloat(low: number, high: number): number;
    static randFloatSpread(range: number): number;
    static degToRad(degrees: number): number;
    static radToDeg(radians: number): number;
    static isPowerOfTwo(value: number): boolean;
    static ceilPowerOfTwo(value: number): number;
    static floorPowerOfTwo(value: number): number;
}
export { _Math };
