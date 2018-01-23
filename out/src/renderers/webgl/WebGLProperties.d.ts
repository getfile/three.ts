import { EventDispatcher } from "../../core/EventDispatcher";
declare class WebGLProperties {
    properties: any;
    constructor();
    get(object: EventDispatcher): any;
    remove(object: any): void;
    clear(): void;
}
export { WebGLProperties };
