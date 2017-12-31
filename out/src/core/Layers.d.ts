declare class Layers {
    mask: number;
    constructor();
    set(channel: any): void;
    enable(channel: any): void;
    toggle(channel: any): void;
    disable(channel: any): void;
    test(layers: Layers): boolean;
}
export { Layers };
