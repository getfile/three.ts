define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Stats {
        constructor() {
            this.onClick = (event) => {
                event.preventDefault();
                this.showPanel(++this.mode % this.dom.children.length);
            };
            this.mode = 0;
            var container = document.createElement('div');
            container.style.cssText = 'position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000';
            container.addEventListener('click', this.onClick, false);
            var beginTime = (performance || Date).now(), prevTime = beginTime, frames = 0;
            var fpsPanel = this.addPanel(new Panel('FPS', '#0ff', '#002'));
            var msPanel = this.addPanel(new Panel('MS', '#0f0', '#020'));
            if (self.performance && self.performance.memory)
                var memPanel = this.addPanel(new Panel('MB', '#f08', '#201'));
            this.showPanel(0);
            Stats.REVISION = 16;
            this.dom = container;
            this.domElement = container;
        }
        addPanel(panel) {
            this.dom.appendChild(panel.dom);
            return panel;
        }
        showPanel(id) {
            for (var i = 0; i < this.dom.children.length; i++)
                this.dom.children[i].style.display = i === id ? 'block' : 'none';
            this.mode = id;
        }
        begin() {
            this.beginTime = (performance || Date).now();
        }
        end() {
            this.frames++;
            var time = (performance || Date).now();
            this.msPanel.update(time - this.beginTime, 200);
            if (time >= this.prevTime + 1000) {
                this.fpsPanel.update((this.frames * 1000) / (time - this.prevTime), 100);
                this.prevTime = time;
                this.frames = 0;
                if (this.memPanel) {
                    var memory = performance.memory;
                    this.memPanel.update(memory.usedJSHeapSize / 1048576, memory.jsHeapSizeLimit / 1048576);
                }
            }
            return time;
        }
        update() {
            this.beginTime = this.end();
        }
    }
    exports.default = Stats;
    ;
    class Panel {
        constructor(name, fg, bg) {
            this.name = name;
            this.bg = bg;
            this.fg = fg;
            var min = Infinity, max = 0, round = Math.round;
            var PR = round(window.devicePixelRatio || 1);
            var WIDTH = 80 * PR, HEIGHT = 48 * PR, TEXT_X = 3 * PR, TEXT_Y = 2 * PR, GRAPH_X = 3 * PR, GRAPH_Y = 15 * PR, GRAPH_WIDTH = 74 * PR, GRAPH_HEIGHT = 30 * PR;
            var canvas = document.createElement('canvas');
            canvas.width = WIDTH;
            canvas.height = HEIGHT;
            canvas.style.cssText = 'width:80px;height:48px';
            var context = canvas.getContext('2d');
            context.font = 'bold ' + (9 * PR) + 'px Helvetica,Arial,sans-serif';
            context.textBaseline = 'top';
            context.fillStyle = bg;
            context.fillRect(0, 0, WIDTH, HEIGHT);
            context.fillStyle = fg;
            context.fillText(name, TEXT_X, TEXT_Y);
            context.fillRect(GRAPH_X, GRAPH_Y, GRAPH_WIDTH, GRAPH_HEIGHT);
            context.fillStyle = bg;
            context.globalAlpha = 0.9;
            context.fillRect(GRAPH_X, GRAPH_Y, GRAPH_WIDTH, GRAPH_HEIGHT);
            this.dom = canvas;
            this.context = context;
        }
        update(value, maxValue) {
            this.min = Math.min(this.min, value);
            this.max = Math.max(this.max, value);
            this.context.fillStyle = this.bg;
            this.context.globalAlpha = 1;
            this.context.fillRect(0, 0, Panel.WIDTH, Panel.GRAPH_Y);
            this.context.fillStyle = this.fg;
            this.context.fillText(Math.round(value) + ' ' + name + ' (' + Math.round(this.min) + '-' + Math.round(this.max) + ')', Panel.TEXT_X, Panel.TEXT_Y);
            this.context.drawImage(this.dom, Panel.GRAPH_X + Panel.PR, Panel.GRAPH_Y, Panel.GRAPH_WIDTH - Panel.PR, Panel.GRAPH_HEIGHT, Panel.GRAPH_X, Panel.GRAPH_Y, Panel.GRAPH_WIDTH - Panel.PR, Panel.GRAPH_HEIGHT);
            this.context.fillRect(Panel.GRAPH_X + Panel.GRAPH_WIDTH - Panel.PR, Panel.GRAPH_Y, Panel.PR, Panel.GRAPH_HEIGHT);
            this.context.fillStyle = this.bg;
            this.context.globalAlpha = 0.9;
            this.context.fillRect(Panel.GRAPH_X + Panel.GRAPH_WIDTH - Panel.PR, Panel.GRAPH_Y, Panel.PR, Math.round((1 - (value / maxValue)) * Panel.GRAPH_HEIGHT));
        }
    }
});
//# sourceMappingURL=stats.js.map