import { Matrix4 } from './Matrix4';
declare class Euler {
    static RotationOrders: string[];
    static DefaultOrder: string;
    private onChangeCallback;
    private _x;
    private _y;
    private _z;
    private _order;
    constructor(x?: number, y?: number, z?: number, order?: string);
    x: number;
    y: number;
    z: number;
    order: string;
    set(x: number, y: number, z: number, order: string): Euler;
    clone(): Euler;
    copy(euler: Euler): Euler;
    setFromRotationMatrix(m: Matrix4, order: string, update: any): Euler;
    setFromQuaternion(q: any, order: any, update?: boolean): Euler;
    setFromVector3(v: any, order: any): Euler;
    reorder(newOrder: any): Euler;
    equals(euler: any): boolean;
    fromArray(array: any): this;
    toArray(array: any, offset: any): any;
    toVector3(optionalResult: any): any;
    onChange(callback: any): Euler;
}
export { Euler };
