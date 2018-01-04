declare class Fog {
    name: any;
    color: any;
    near: any;
    far: any;
    constructor(color: any, near: any, far: any);
    clone(): Fog;
    toJSON(): {
        type: string;
        color: any;
        near: any;
        far: any;
    };
}
export { Fog };
