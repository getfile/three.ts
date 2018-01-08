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
    function createSquare(config) {
        let newSquare = { color: "white", area: 100 };
        if (config.color)
            newSquare.color = config.color;
        if (config.width)
            newSquare.area = config.width * config.width;
        return newSquare;
    }
    let mySquare = createSquare({ color: "red", width: 100 });
    console.info(mySquare);
    main();
});
//# sourceMappingURL=main.js.map