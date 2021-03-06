define(["require", "exports", "../../textures/CubeTexture", "../../textures/Texture"], function (require, exports, CubeTexture_1, Texture_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let emptyTexture = new Texture_1.Texture();
    let emptyCubeTexture = new CubeTexture_1.CubeTexture();
    let arrayCacheF32 = [];
    let arrayCacheI32 = [];
    let mat4array = new Float32Array(16);
    let mat3array = new Float32Array(9);
    function flatten(array, nBlocks, blockSize) {
        let firstElem = array[0];
        if (firstElem <= 0 || firstElem > 0)
            return array;
        let n = nBlocks * blockSize, r = arrayCacheF32[n];
        if (r === undefined) {
            r = new Float32Array(n);
            arrayCacheF32[n] = r;
        }
        if (nBlocks !== 0) {
            firstElem.toArray(r, 0);
            for (let i = 1, offset = 0; i !== nBlocks; ++i) {
                offset += blockSize;
                array[i].toArray(r, offset);
            }
        }
        return r;
    }
    function allocTexUnits(renderer, n) {
        let r = arrayCacheI32[n];
        if (r === undefined) {
            r = new Int32Array(n);
            arrayCacheI32[n] = r;
        }
        for (let i = 0; i !== n; ++i)
            r[i] = renderer.allocTextureUnit();
        return r;
    }
    function setValue1f(gl, v) {
        gl.uniform1f(this.addr, v);
    }
    function setValue1i(gl, v) {
        gl.uniform1i(this.addr, v);
    }
    function setValue2fv(gl, v) {
        if (v.x === undefined)
            gl.uniform2fv(this.addr, v);
        else
            gl.uniform2f(this.addr, v.x, v.y);
    }
    function setValue3fv(gl, v) {
        if (v.x !== undefined)
            gl.uniform3f(this.addr, v.x, v.y, v.z);
        else if (v.r !== undefined)
            gl.uniform3f(this.addr, v.r, v.g, v.b);
        else
            gl.uniform3fv(this.addr, v);
    }
    function setValue4fv(gl, v) {
        if (v.x === undefined)
            gl.uniform4fv(this.addr, v);
        else
            gl.uniform4f(this.addr, v.x, v.y, v.z, v.w);
    }
    function setValue2fm(gl, v) {
        gl.uniformMatrix2fv(this.addr, false, v.elements || v);
    }
    function setValue3fm(gl, v) {
        if (v.elements === undefined)
            gl.uniformMatrix3fv(this.addr, false, v);
        else {
            mat3array.set(v.elements);
            gl.uniformMatrix3fv(this.addr, false, mat3array);
        }
    }
    function setValue4fm(gl, v) {
        if (v.elements === undefined)
            gl.uniformMatrix4fv(this.addr, false, v);
        else {
            mat4array.set(v.elements);
            gl.uniformMatrix4fv(this.addr, false, mat4array);
        }
    }
    function setValueT1(gl, v, renderer) {
        let unit = renderer.allocTextureUnit();
        gl.uniform1i(this.addr, unit);
        renderer.setTexture2D(v || emptyTexture, unit);
    }
    function setValueT6(gl, v, renderer) {
        let unit = renderer.allocTextureUnit();
        gl.uniform1i(this.addr, unit);
        renderer.setTextureCube(v || emptyCubeTexture, unit);
    }
    function setValue2iv(gl, v) {
        gl.uniform2iv(this.addr, v);
    }
    function setValue3iv(gl, v) {
        gl.uniform3iv(this.addr, v);
    }
    function setValue4iv(gl, v) {
        gl.uniform4iv(this.addr, v);
    }
    function getSingularSetter(type) {
        switch (type) {
            case 0x1406: return setValue1f;
            case 0x8b50: return setValue2fv;
            case 0x8b51: return setValue3fv;
            case 0x8b52: return setValue4fv;
            case 0x8b5a: return setValue2fm;
            case 0x8b5b: return setValue3fm;
            case 0x8b5c: return setValue4fm;
            case 0x8b5e:
            case 0x8d66: return setValueT1;
            case 0x8b60: return setValueT6;
            case 0x1404:
            case 0x8b56: return setValue1i;
            case 0x8b53:
            case 0x8b57: return setValue2iv;
            case 0x8b54:
            case 0x8b58: return setValue3iv;
            case 0x8b55:
            case 0x8b59: return setValue4iv;
        }
    }
    function setValue1fv(gl, v) {
        gl.uniform1fv(this.addr, v);
    }
    function setValue1iv(gl, v) {
        gl.uniform1iv(this.addr, v);
    }
    function setValueV2a(gl, v) {
        gl.uniform2fv(this.addr, flatten(v, this.size, 2));
    }
    function setValueV3a(gl, v) {
        gl.uniform3fv(this.addr, flatten(v, this.size, 3));
    }
    function setValueV4a(gl, v) {
        gl.uniform4fv(this.addr, flatten(v, this.size, 4));
    }
    function setValueM2a(gl, v) {
        gl.uniformMatrix2fv(this.addr, false, flatten(v, this.size, 4));
    }
    function setValueM3a(gl, v) {
        gl.uniformMatrix3fv(this.addr, false, flatten(v, this.size, 9));
    }
    function setValueM4a(gl, v) {
        gl.uniformMatrix4fv(this.addr, false, flatten(v, this.size, 16));
    }
    function setValueT1a(gl, v, renderer) {
        let n = v.length, units = allocTexUnits(renderer, n);
        gl.uniform1iv(this.addr, units);
        for (let i = 0; i !== n; ++i)
            renderer.setTexture2D(v[i] || emptyTexture, units[i]);
    }
    function setValueT6a(gl, v, renderer) {
        let n = v.length, units = allocTexUnits(renderer, n);
        gl.uniform1iv(this.addr, units);
        for (let i = 0; i !== n; ++i)
            renderer.setTextureCube(v[i] || emptyCubeTexture, units[i]);
    }
    function getPureArraySetter(type) {
        switch (type) {
            case 0x1406: return setValue1fv;
            case 0x8b50: return setValueV2a;
            case 0x8b51: return setValueV3a;
            case 0x8b52: return setValueV4a;
            case 0x8b5a: return setValueM2a;
            case 0x8b5b: return setValueM3a;
            case 0x8b5c: return setValueM4a;
            case 0x8b5e: return setValueT1a;
            case 0x8b60: return setValueT6a;
            case 0x1404:
            case 0x8b56: return setValue1iv;
            case 0x8b53:
            case 0x8b57: return setValue2iv;
            case 0x8b54:
            case 0x8b58: return setValue3iv;
            case 0x8b55:
            case 0x8b59: return setValue4iv;
        }
    }
    function SingleUniform(id, activeInfo, addr) {
        this.id = id;
        this.addr = addr;
        this.setValue = getSingularSetter(activeInfo.type);
    }
    function PureArrayUniform(id, activeInfo, addr) {
        this.id = id;
        this.addr = addr;
        this.size = activeInfo.size;
        this.setValue = getPureArraySetter(activeInfo.type);
    }
    class UniformContainer {
        constructor() {
            this.seq = [];
            this.map = {};
        }
    }
    exports.UniformContainer = UniformContainer;
    class StructuredUniform extends UniformContainer {
        constructor(id) {
            super();
            this.id = id;
        }
        setValue(gl, value) {
            let seq = this.seq;
            for (let i = 0, n = seq.length; i !== n; ++i) {
                let u = seq[i];
                u.setValue(gl, value[u.id]);
            }
        }
    }
    let RePathPart = /([\w\d_]+)(\])?(\[|\.)?/g;
    function addUniform(container, uniformObject) {
        container.seq.push(uniformObject);
        container.map[uniformObject.id] = uniformObject;
    }
    function parseUniform(activeInfo, addr, container) {
        let path = activeInfo.name, pathLength = path.length;
        RePathPart.lastIndex = 0;
        for (;;) {
            let match = RePathPart.exec(path), matchEnd = RePathPart.lastIndex, id, ids = match[1], idIsIndex = match[2] === ']', subscript = match[3];
            if (idIsIndex)
                id = Number.parseFloat(ids);
            if (subscript === undefined || subscript === '[' && matchEnd + 2 === pathLength) {
                addUniform(container, subscript === undefined ?
                    new SingleUniform(id, activeInfo, addr) :
                    new PureArrayUniform(id, activeInfo, addr));
                break;
            }
            else {
                let map = container.map, next = map[id];
                if (next === undefined) {
                    next = new StructuredUniform(id);
                    addUniform(container, next);
                }
                container = next;
            }
        }
    }
    class WebGLUniforms extends UniformContainer {
        constructor(gl, program, renderer) {
            super();
            this.renderer = renderer;
            let n = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
            for (let i = 0; i < n; ++i) {
                let info = gl.getActiveUniform(program, i), path = info.name, addr = gl.getUniformLocation(program, path);
                parseUniform(info, addr, this);
            }
        }
        setValue(gl, name, value) {
            let u = this.map[name];
            if (u !== undefined)
                u.setValue(gl, value, this.renderer);
        }
        setOptional(gl, object, name) {
            let v = object[name];
            if (v !== undefined)
                this.setValue(gl, name, v);
        }
        static upload(gl, seq, values, renderer) {
            for (let i = 0, n = seq.length; i !== n; ++i) {
                let u = seq[i], v = values[u.id];
                if (v.needsUpdate !== false) {
                    u.setValue(gl, v.value, renderer);
                }
            }
        }
        static seqWithValue(seq, values) {
            let r = [];
            for (let i = 0, n = seq.length; i !== n; ++i) {
                let u = seq[i];
                if (u.id in values)
                    r.push(u);
            }
            return r;
        }
    }
    exports.WebGLUniforms = WebGLUniforms;
});
//# sourceMappingURL=WebGLUniforms.js.map