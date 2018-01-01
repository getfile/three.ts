declare class EventDispatcher {
    private _listeners;
    constructor();
    addEventListener(type: string, listener: Function): void;
    hasEventListener(type: string, listener: Function): boolean;
    removeEventListener(type: string, listener: Function): void;
    dispatchEvent(event: any): void;
}
export { EventDispatcher };
