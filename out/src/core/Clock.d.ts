declare class Clock {
    private autoStart;
    private startTime;
    private oldTime;
    private elapsedTime;
    private running;
    constructor(autoStart?: boolean);
    start(): void;
    stop(): void;
    getElapsedTime(): number;
    getDelta(): number;
}
export { Clock };
