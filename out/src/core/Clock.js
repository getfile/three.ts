define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Clock {
        constructor(autoStart = true) {
            this.autoStart = autoStart;
            this.startTime = 0;
            this.oldTime = 0;
            this.elapsedTime = 0;
            this.running = false;
        }
        start() {
            this.startTime = (typeof performance === 'undefined' ? Date : performance).now();
            this.oldTime = this.startTime;
            this.elapsedTime = 0;
            this.running = true;
        }
        stop() {
            this.getElapsedTime();
            this.running = false;
            this.autoStart = false;
        }
        getElapsedTime() {
            this.getDelta();
            return this.elapsedTime;
        }
        getDelta() {
            let diff = 0;
            if (this.autoStart && !this.running) {
                this.start();
                return 0;
            }
            if (this.running) {
                let newTime = (typeof performance === 'undefined' ? Date : performance).now();
                diff = (newTime - this.oldTime) / 1000;
                this.oldTime = newTime;
                this.elapsedTime += diff;
            }
            return diff;
        }
    }
    exports.Clock = Clock;
});
//# sourceMappingURL=Clock.js.map