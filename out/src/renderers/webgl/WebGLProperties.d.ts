import { EventDispatcher } from "../../core/EventDispatcher";
declare class WebGLProperties {
    properties: any;
    constructor();
    get(object: EventDispatcher): any;
    remove(object: EventDispatcher): void;
    clear(): void;
}
export { WebGLProperties };
