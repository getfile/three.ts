define(["require", "exports", "./LightShadow", "../cameras/OrthographicCamera"], function (require, exports, LightShadow_1, OrthographicCamera_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class DirectionalLightShadow extends LightShadow_1.LightShadow {
        constructor() {
            super(new OrthographicCamera_1.OrthographicCamera(-5, 5, 5, -5, 0.5, 500));
        }
    }
    exports.DirectionalLightShadow = DirectionalLightShadow;
});
//# sourceMappingURL=DirectionalLightShadow.js.map