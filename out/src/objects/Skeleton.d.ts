declare class Skeleton {
    bones: any;
    boneMatrices: any;
    boneInverses: any;
    boneTexture: any;
    constructor(bones: any, boneInverses: any);
    calculateInverses(): void;
    pose(): void;
    update(): void;
    clone(): Skeleton;
}
export { Skeleton };
