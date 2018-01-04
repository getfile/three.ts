define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function addLineNumbers(string) {
        var lines = string.split('\n');
        for (var i = 0; i < lines.length; i++)
            lines[i] = (i + 1) + ': ' + lines[i];
        return lines.join('\n');
    }
    function WebGLShader(gl, type, string) {
        var shader = gl.createShader(type);
        gl.shaderSource(shader, string);
        gl.compileShader(shader);
        if (gl.getShaderParameter(shader, gl.COMPILE_STATUS) === false)
            console.error('THREE.WebGLShader: Shader couldn\'t compile.');
        if (gl.getShaderInfoLog(shader) !== '')
            console.warn('THREE.WebGLShader: gl.getShaderInfoLog()', type === gl.VERTEX_SHADER ? 'vertex' : 'fragment', gl.getShaderInfoLog(shader), addLineNumbers(string));
        return shader;
    }
    exports.WebGLShader = WebGLShader;
});
//# sourceMappingURL=WebGLShader.js.map