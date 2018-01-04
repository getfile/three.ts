declare class FogExp2 {
    name: any;
    color: any;
    density: any;
    constructor(color: any, density: any);
    clone(): FogExp2;
    toJSON(): {
        type: string;
        color: any;
        density: any;
    };
}
export { FogExp2 };
