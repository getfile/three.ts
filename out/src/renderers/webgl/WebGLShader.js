define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function addLineNumbers(string) {
        var lines = string.split('\n');
        for (var i = 0; i < lines.length; i++)
            lines[i] = (i + 1) + ': ' + lines[i];
        return lines.join('\n');
    }
    function webGLShader(gl, type, code) {
        var shader = gl.createShader(type);
        gl.shaderSource(shader, code);
        gl.compileShader(shader);
        if (gl.getShaderParameter(shader, gl.COMPILE_STATUS) === false)
            console.error('THREE.WebGLShader: Shader couldn\'t compile.');
        if (gl.getShaderInfoLog(shader) !== '')
            console.warn('THREE.WebGLShader: gl.getShaderInfoLog()', (type === gl.VERTEX_SHADER ? 'vertex' : 'fragment'), gl.getShaderInfoLog(shader), addLineNumbers(code));
        return shader;
    }
    exports.webGLShader = webGLShader;
});
//# sourceMappingURL=WebGLShader.js.map