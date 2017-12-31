define(["require", "exports", "../src/math/Math", "../src/core/Clock"], function (require, exports, Math_1, Clock_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function main() {
        console.info("hello");
        for (let i = 0; i < 11; i++)
            console.info(i + " uuid: " + Math_1._Math.generateUUID());
        console.warn("end");
        let c = new Clock_1.Clock();
        c.start();
        console.info(c.getElapsedTime());
    }
    exports.main = main;
    main();
});
//# sourceMappingURL=main.js.map