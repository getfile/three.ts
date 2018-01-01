interface HSL {
    h: number;
    s: number;
    l: number;
}
declare class Color {
    style: string;
    r: number;
    g: number;
    b: number;
    constructor(r?: any, g?: number, b?: number);
    set(value: any): Color;
    setScalar(scalar: number): Color;
    setHex(hex: number): Color;
    setRGB(r: number, g: number, b: number): Color;
    private hue2rgb(p, q, t);
    setHSL(h: number, s: number, l: number): Color;
    handleAlpha(str: string): void;
    setStyle(style: string): Color;
    clone(): Color;
    copy(color: Color): Color;
    copyGammaToLinear(color: Color, gammaFactor?: number): Color;
    copyLinearToGamma(color: Color, gammaFactor?: number): Color;
    convertGammaToLinear(): Color;
    convertLinearToGamma(): Color;
    getHex(): number;
    getHexString(): string;
    getHSL(optionalTarget?: HSL): HSL;
    getStyle(): string;
    offsetHSL(h: any, s: any, l: any): this;
    add(color: Color): Color;
    addColors(color1: Color, color2: Color): Color;
    addScalar(s: number): Color;
    sub(color: Color): Color;
    multiply(color: Color): Color;
    multiplyScalar(s: number): Color;
    lerp(color: Color, alpha: number): Color;
    equals(c: Color): boolean;
    fromArray(array: Array<number>, offset: number): Color;
    toArray(array: Array<number>, offset: number): Array<number>;
    toJSON(): number;
}
export { HSL, Color };
