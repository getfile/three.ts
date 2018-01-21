define(["require", "exports", "./Math"], function (require, exports, Math_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let ColorKeywords = {
        'aliceblue': 0xF0F8FF, 'antiquewhite': 0xFAEBD7, 'aqua': 0x00FFFF, 'aquamarine': 0x7FFFD4, 'azure': 0xF0FFFF,
        'beige': 0xF5F5DC, 'bisque': 0xFFE4C4, 'black': 0x000000, 'blanchedalmond': 0xFFEBCD, 'blue': 0x0000FF, 'blueviolet': 0x8A2BE2,
        'brown': 0xA52A2A, 'burlywood': 0xDEB887, 'cadetblue': 0x5F9EA0, 'chartreuse': 0x7FFF00, 'chocolate': 0xD2691E, 'coral': 0xFF7F50,
        'cornflowerblue': 0x6495ED, 'cornsilk': 0xFFF8DC, 'crimson': 0xDC143C, 'cyan': 0x00FFFF, 'darkblue': 0x00008B, 'darkcyan': 0x008B8B,
        'darkgoldenrod': 0xB8860B, 'darkgray': 0xA9A9A9, 'darkgreen': 0x006400, 'darkgrey': 0xA9A9A9, 'darkkhaki': 0xBDB76B, 'darkmagenta': 0x8B008B,
        'darkolivegreen': 0x556B2F, 'darkorange': 0xFF8C00, 'darkorchid': 0x9932CC, 'darkred': 0x8B0000, 'darksalmon': 0xE9967A, 'darkseagreen': 0x8FBC8F,
        'darkslateblue': 0x483D8B, 'darkslategray': 0x2F4F4F, 'darkslategrey': 0x2F4F4F, 'darkturquoise': 0x00CED1, 'darkviolet': 0x9400D3,
        'deeppink': 0xFF1493, 'deepskyblue': 0x00BFFF, 'dimgray': 0x696969, 'dimgrey': 0x696969, 'dodgerblue': 0x1E90FF, 'firebrick': 0xB22222,
        'floralwhite': 0xFFFAF0, 'forestgreen': 0x228B22, 'fuchsia': 0xFF00FF, 'gainsboro': 0xDCDCDC, 'ghostwhite': 0xF8F8FF, 'gold': 0xFFD700,
        'goldenrod': 0xDAA520, 'gray': 0x808080, 'green': 0x008000, 'greenyellow': 0xADFF2F, 'grey': 0x808080, 'honeydew': 0xF0FFF0, 'hotpink': 0xFF69B4,
        'indianred': 0xCD5C5C, 'indigo': 0x4B0082, 'ivory': 0xFFFFF0, 'khaki': 0xF0E68C, 'lavender': 0xE6E6FA, 'lavenderblush': 0xFFF0F5, 'lawngreen': 0x7CFC00,
        'lemonchiffon': 0xFFFACD, 'lightblue': 0xADD8E6, 'lightcoral': 0xF08080, 'lightcyan': 0xE0FFFF, 'lightgoldenrodyellow': 0xFAFAD2, 'lightgray': 0xD3D3D3,
        'lightgreen': 0x90EE90, 'lightgrey': 0xD3D3D3, 'lightpink': 0xFFB6C1, 'lightsalmon': 0xFFA07A, 'lightseagreen': 0x20B2AA, 'lightskyblue': 0x87CEFA,
        'lightslategray': 0x778899, 'lightslategrey': 0x778899, 'lightsteelblue': 0xB0C4DE, 'lightyellow': 0xFFFFE0, 'lime': 0x00FF00, 'limegreen': 0x32CD32,
        'linen': 0xFAF0E6, 'magenta': 0xFF00FF, 'maroon': 0x800000, 'mediumaquamarine': 0x66CDAA, 'mediumblue': 0x0000CD, 'mediumorchid': 0xBA55D3,
        'mediumpurple': 0x9370DB, 'mediumseagreen': 0x3CB371, 'mediumslateblue': 0x7B68EE, 'mediumspringgreen': 0x00FA9A, 'mediumturquoise': 0x48D1CC,
        'mediumvioletred': 0xC71585, 'midnightblue': 0x191970, 'mintcream': 0xF5FFFA, 'mistyrose': 0xFFE4E1, 'moccasin': 0xFFE4B5, 'navajowhite': 0xFFDEAD,
        'navy': 0x000080, 'oldlace': 0xFDF5E6, 'olive': 0x808000, 'olivedrab': 0x6B8E23, 'orange': 0xFFA500, 'orangered': 0xFF4500, 'orchid': 0xDA70D6,
        'palegoldenrod': 0xEEE8AA, 'palegreen': 0x98FB98, 'paleturquoise': 0xAFEEEE, 'palevioletred': 0xDB7093, 'papayawhip': 0xFFEFD5, 'peachpuff': 0xFFDAB9,
        'peru': 0xCD853F, 'pink': 0xFFC0CB, 'plum': 0xDDA0DD, 'powderblue': 0xB0E0E6, 'purple': 0x800080, 'rebeccapurple': 0x663399, 'red': 0xFF0000, 'rosybrown': 0xBC8F8F,
        'royalblue': 0x4169E1, 'saddlebrown': 0x8B4513, 'salmon': 0xFA8072, 'sandybrown': 0xF4A460, 'seagreen': 0x2E8B57, 'seashell': 0xFFF5EE,
        'sienna': 0xA0522D, 'silver': 0xC0C0C0, 'skyblue': 0x87CEEB, 'slateblue': 0x6A5ACD, 'slategray': 0x708090, 'slategrey': 0x708090, 'snow': 0xFFFAFA,
        'springgreen': 0x00FF7F, 'steelblue': 0x4682B4, 'tan': 0xD2B48C, 'teal': 0x008080, 'thistle': 0xD8BFD8, 'tomato': 0xFF6347, 'turquoise': 0x40E0D0,
        'violet': 0xEE82EE, 'wheat': 0xF5DEB3, 'white': 0xFFFFFF, 'whitesmoke': 0xF5F5F5, 'yellow': 0xFFFF00, 'yellowgreen': 0x9ACD32
    };
    ;
    class Color {
        constructor(r, g, b) {
            this.r = 1;
            this.g = 1;
            this.b = 1;
            if (g === undefined || b === undefined) {
                return this.set(r);
            }
            return this.setRGB(r, g, b);
        }
        set(value) {
            if (value && value instanceof Color)
                this.copy(value);
            else if (typeof value === 'number')
                this.setHex(value);
            else if (typeof value === 'string')
                this.setStyle(value);
            return this;
        }
        setScalar(scalar) {
            this.r = scalar;
            this.g = scalar;
            this.b = scalar;
            return this;
        }
        setHex(hex) {
            hex = Math.floor(hex);
            this.r = (hex >> 16 & 255) / 255;
            this.g = (hex >> 8 & 255) / 255;
            this.b = (hex & 255) / 255;
            return this;
        }
        setRGB(r, g, b) {
            this.r = r;
            this.g = g;
            this.b = b;
            return this;
        }
        hue2rgb(p, q, t) {
            if (t < 0)
                t += 1;
            if (t > 1)
                t -= 1;
            if (t < 1 / 6)
                return p + (q - p) * 6 * t;
            if (t < 1 / 2)
                return q;
            if (t < 2 / 3)
                return p + (q - p) * 6 * (2 / 3 - t);
            return p;
        }
        setHSL(h, s, l) {
            h = Math_1._Math.euclideanModulo(h, 1);
            s = Math_1._Math.clamp(s, 0, 1);
            l = Math_1._Math.clamp(l, 0, 1);
            if (s === 0)
                this.r = this.g = this.b = l;
            else {
                let p = l <= 0.5 ? l * (1 + s) : l + s - (l * s);
                let q = (2 * l) - p;
                this.r = this.hue2rgb(q, p, h + 1 / 3);
                this.g = this.hue2rgb(q, p, h);
                this.b = this.hue2rgb(q, p, h - 1 / 3);
            }
            return this;
        }
        handleAlpha(str) {
            if (str === undefined)
                return;
            if (parseFloat(str) < 1)
                console.warn('THREE.Color: Alpha component of ' + this.style + ' will be ignored.');
        }
        setStyle(style) {
            this.style = style;
            let m;
            if (m = /^((?:rgb|hsl)a?)\(\s*([^\)]*)\)/.exec(style)) {
                let color;
                let name = m[1];
                let components = m[2];
                switch (name) {
                    case 'rgb':
                    case 'rgba':
                        if (color = /^(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(components)) {
                            this.r = Math.min(255, parseInt(color[1], 10)) / 255;
                            this.g = Math.min(255, parseInt(color[2], 10)) / 255;
                            this.b = Math.min(255, parseInt(color[3], 10)) / 255;
                            this.handleAlpha(color[5]);
                            return this;
                        }
                        if (color = /^(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(components)) {
                            this.r = Math.min(100, parseInt(color[1], 10)) / 100;
                            this.g = Math.min(100, parseInt(color[2], 10)) / 100;
                            this.b = Math.min(100, parseInt(color[3], 10)) / 100;
                            this.handleAlpha(color[5]);
                            return this;
                        }
                        break;
                    case 'hsl':
                    case 'hsla':
                        if (color = /^([0-9]*\.?[0-9]+)\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(components)) {
                            let h = parseFloat(color[1]) / 360;
                            let s = parseInt(color[2], 10) / 100;
                            let l = parseInt(color[3], 10) / 100;
                            this.handleAlpha(color[5]);
                            return this.setHSL(h, s, l);
                        }
                        break;
                }
            }
            else if (m = /^\#([A-Fa-f0-9]+)$/.exec(style)) {
                let hex = m[1];
                let size = hex.length;
                if (size === 3) {
                    this.r = parseInt(hex.charAt(0) + hex.charAt(0), 16) / 255;
                    this.g = parseInt(hex.charAt(1) + hex.charAt(1), 16) / 255;
                    this.b = parseInt(hex.charAt(2) + hex.charAt(2), 16) / 255;
                    return this;
                }
                else if (size === 6) {
                    this.r = parseInt(hex.charAt(0) + hex.charAt(1), 16) / 255;
                    this.g = parseInt(hex.charAt(2) + hex.charAt(3), 16) / 255;
                    this.b = parseInt(hex.charAt(4) + hex.charAt(5), 16) / 255;
                    return this;
                }
            }
            if (style && style.length > 0) {
                let hex = ColorKeywords[style];
                if (hex !== undefined) {
                    this.setHex(hex);
                }
                else {
                    console.warn('THREE.Color: Unknown color ' + style);
                }
            }
            return this;
        }
        clone() {
            return new Color(this.r, this.g, this.b);
        }
        copy(color) {
            this.r = color.r;
            this.g = color.g;
            this.b = color.b;
            return this;
        }
        copyGammaToLinear(color, gammaFactor) {
            if (gammaFactor === undefined)
                gammaFactor = 2.0;
            this.r = Math.pow(color.r, gammaFactor);
            this.g = Math.pow(color.g, gammaFactor);
            this.b = Math.pow(color.b, gammaFactor);
            return this;
        }
        copyLinearToGamma(color, gammaFactor) {
            if (gammaFactor === undefined)
                gammaFactor = 2.0;
            let safeInverse = (gammaFactor > 0) ? (1.0 / gammaFactor) : 1.0;
            this.r = Math.pow(color.r, safeInverse);
            this.g = Math.pow(color.g, safeInverse);
            this.b = Math.pow(color.b, safeInverse);
            return this;
        }
        convertGammaToLinear() {
            let r = this.r, g = this.g, b = this.b;
            this.r = r * r;
            this.g = g * g;
            this.b = b * b;
            return this;
        }
        convertLinearToGamma() {
            this.r = Math.sqrt(this.r);
            this.g = Math.sqrt(this.g);
            this.b = Math.sqrt(this.b);
            return this;
        }
        getHex() {
            return (this.r * 255) << 16 ^ (this.g * 255) << 8 ^ (this.b * 255) << 0;
        }
        getHexString() {
            return ('000000' + this.getHex().toString(16)).slice(-6);
        }
        getHSL(optionalTarget) {
            let hsl = optionalTarget || { h: 0, s: 0, l: 0 };
            let r = this.r, g = this.g, b = this.b;
            let max = Math.max(r, g, b);
            let min = Math.min(r, g, b);
            let hue, saturation;
            let lightness = (min + max) / 2.0;
            if (min === max) {
                hue = 0;
                saturation = 0;
            }
            else {
                let delta = max - min;
                saturation = lightness <= 0.5 ? delta / (max + min) : delta / (2 - max - min);
                switch (max) {
                    case r:
                        hue = (g - b) / delta + (g < b ? 6 : 0);
                        break;
                    case g:
                        hue = (b - r) / delta + 2;
                        break;
                    case b:
                        hue = (r - g) / delta + 4;
                        break;
                }
                hue /= 6;
            }
            hsl.h = hue;
            hsl.s = saturation;
            hsl.l = lightness;
            return hsl;
        }
        getStyle() {
            return 'rgb(' + ((this.r * 255) | 0) + ',' +
                ((this.g * 255) | 0) + ',' +
                ((this.b * 255) | 0) + ')';
        }
        offsetHSL(h, s, l) {
            let hsl = this.getHSL();
            hsl.h += h;
            hsl.s += s;
            hsl.l += l;
            this.setHSL(hsl.h, hsl.s, hsl.l);
            return this;
        }
        add(color) {
            this.r += color.r;
            this.g += color.g;
            this.b += color.b;
            return this;
        }
        addColors(color1, color2) {
            this.r = color1.r + color2.r;
            this.g = color1.g + color2.g;
            this.b = color1.b + color2.b;
            return this;
        }
        addScalar(s) {
            this.r += s;
            this.g += s;
            this.b += s;
            return this;
        }
        sub(color) {
            this.r = Math.max(0, this.r - color.r);
            this.g = Math.max(0, this.g - color.g);
            this.b = Math.max(0, this.b - color.b);
            return this;
        }
        multiply(color) {
            this.r *= color.r;
            this.g *= color.g;
            this.b *= color.b;
            return this;
        }
        multiplyScalar(s) {
            this.r *= s;
            this.g *= s;
            this.b *= s;
            return this;
        }
        lerp(color, alpha) {
            this.r += (color.r - this.r) * alpha;
            this.g += (color.g - this.g) * alpha;
            this.b += (color.b - this.b) * alpha;
            return this;
        }
        equals(c) {
            return (c.r === this.r) && (c.g === this.g) && (c.b === this.b);
        }
        fromArray(array, offset = 0) {
            this.r = array[offset];
            this.g = array[offset + 1];
            this.b = array[offset + 2];
            return this;
        }
        toArray(array, offset = 0) {
            if (array === undefined)
                array = [];
            array[offset] = this.r;
            array[offset + 1] = this.g;
            array[offset + 2] = this.b;
            return array;
        }
        toJSON() {
            return this.getHex();
        }
    }
    exports.Color = Color;
});
//# sourceMappingURL=Color.js.map