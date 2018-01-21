define(["require", "exports", "../src/constants", "../src/math/Vector2", "./stats", "../src/cameras/PerspectiveCamera", "../src/scenes/Scene", "../src/lights/AmbientLight", "../src/lights/PointLight", "../src/loaders/TextureLoader", "../src/materials/MeshPhongMaterial", "../src/objects/Mesh", "../src/geometries/BoxGeometry", "../src/renderers/WebGLRenderer"], function (require, exports, Constants, Vector2_1, stats_1, PerspectiveCamera_1, Scene_1, AmbientLight_1, PointLight_1, TextureLoader_1, MeshPhongMaterial_1, Mesh_1, BoxGeometry_1, WebGLRenderer_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function init() {
        let container = document.getElementById('container');
        camera = new PerspectiveCamera_1.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
        camera.position.y = 400;
        scene = new Scene_1.Scene();
        let light, object;
        let ambientLight = new AmbientLight_1.AmbientLight(0xcccccc, 0.4);
        scene.add(ambientLight);
        let pointLight = new PointLight_1.PointLight(0xffffff, 0.8);
        camera.add(pointLight);
        scene.add(camera);
        let map = new TextureLoader_1.TextureLoader().load('textures/UV_Grid_Sm.jpg');
        map.wrapS = map.wrapT = Constants.RepeatWrapping;
        map.anisotropy = 16;
        let material = new MeshPhongMaterial_1.MeshPhongMaterial({ map: map, side: Constants.DoubleSide });
        object = new Mesh_1.Mesh(new BoxGeometry_1.BoxGeometry(100, 100, 100, 4, 4, 4), material);
        object.position.set(-100, 0, 0);
        scene.add(object);
        let points = [];
        for (let i = 0; i < 50; i++)
            points.push(new Vector2_1.Vector2(Math.sin(i * 0.2) * Math.sin(i * 0.1) * 15 + 50, (i - 5) * 2));
        renderer = new WebGLRenderer_1.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);
        stats = new stats_1.Stats();
        container.appendChild(stats.dom);
        window.addEventListener('resize', onWindowResize, false);
    }
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    function animate() {
        requestAnimationFrame(animate);
        render();
        stats.update();
    }
    function render() {
        let timer = Date.now() * 0.0001;
        camera.position.x = Math.cos(timer) * 800;
        camera.position.z = Math.sin(timer) * 800;
        camera.lookAt(scene.position);
        scene.traverse(function (object) {
            if (object.isMesh === true) {
                object.rotation.x = timer * 5;
                object.rotation.y = timer * 2.5;
            }
        });
        renderer.render(scene, camera);
    }
    let camera;
    let scene;
    let renderer;
    let stats;
    init();
    animate();
});
//# sourceMappingURL=webgl_geometries.js.map