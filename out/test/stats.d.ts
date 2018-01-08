declare class Stats {
    constructor();
    static REVISION: any;
    mode: any;
    dom: any;
    domElement: any;
    onClick: (event: any) => void;
    beginTime: any;
    prevTime: any;
    frames: any;
    msPanel: any;
    memPanel: any;
    fpsPanel: any;
    addPanel(panel: any): any;
    showPanel(id: any): void;
    begin(): void;
    end(): number;
    update(): void;
}
export { Stats as default };
