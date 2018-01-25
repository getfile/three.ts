import * as Constants from "../src/constants";
import { Vector2 } from "../src/math/Vector2";
import { Stats } from "./stats";
import { PerspectiveCamera } from "../src/cameras/PerspectiveCamera";
import { Scene } from "../src/scenes/Scene";
import { AmbientLight } from "../src/lights/AmbientLight";
import { PointLight } from "../src/lights/PointLight";
import { TextureLoader } from "../src/loaders/TextureLoader";
import { MeshPhongMaterial } from "../src/materials/MeshPhongMaterial";
import { Mesh } from "../src/objects/Mesh";
import { BoxGeometry } from "../src/geometries/BoxGeometry";
import { WebGLRenderer } from "../src/renderers/WebGLRenderer"
import { Object3D } from "../src/core/Object3D";

function init()
{
    let container: HTMLElement = document.getElementById('container');

    camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
    camera.position.y = 400;

    scene = new Scene();

    let light, object;

    let ambientLight = new AmbientLight(0xcccccc, 0.4);
    scene.add(ambientLight);

    let pointLight = new PointLight(0xffffff, 0.8);
    camera.add(pointLight);

    scene.add(camera);

    let map = new TextureLoader().load('textures/UV_Grid_Sm.jpg');
    map.wrapS = map.wrapT = Constants.RepeatWrapping;
    map.anisotropy = 16;

    let material = new MeshPhongMaterial({ map: map, side: Constants.DoubleSide });

    //	object = new Mesh( new SphereGeometry( 75, 20, 10 ), material );
    //	object.position.set( - 300, 0, 200 );
    //	scene.add( object );
    //
    //	object = new Mesh( new IcosahedronGeometry( 75, 1 ), material );
    //	object.position.set( - 100, 0, 200 );
    //	scene.add( object );
    //
    //	object = new Mesh( new OctahedronGeometry( 75, 2 ), material );
    //	object.position.set( 100, 0, 200 );
    //	scene.add( object );
    //
    //	object = new Mesh( new TetrahedronGeometry( 75, 0 ), material );
    //	object.position.set( 300, 0, 200 );
    //	scene.add( object );
    //
    //	//
    //
    //	object = new Mesh( new PlaneGeometry( 100, 100, 4, 4 ), material );
    //	object.position.set( - 300, 0, 0 );
    //	scene.add( object );

    object = new Mesh(new BoxGeometry(100, 100, 100, 4, 4, 4), material);
    object.position.set(- 100, 0, 0);
    scene.add(object);

    //	object = new Mesh( new CircleGeometry( 50, 20, 0, Math.PI * 2 ), material );
    //	object.position.set( 100, 0, 0 );
    //	scene.add( object );
    //
    //	object = new Mesh( new RingGeometry( 10, 50, 20, 5, 0, Math.PI * 2 ), material );
    //	object.position.set( 300, 0, 0 );
    //	scene.add( object );
    //
    //	//
    //	object = new Mesh( new CylinderGeometry( 25, 75, 100, 40, 5 ), material );
    //	object.position.set( - 300, 0, - 200 );
    //	scene.add( object );

    let points = [];

    for (let i = 0; i < 50; i++)
        points.push(new Vector2(Math.sin(i * 0.2) * Math.sin(i * 0.1) * 15 + 50, (i - 5) * 2));

    //	object = new Mesh( new LatheGeometry( points, 20 ), material );
    //	object.position.set( - 100, 0, - 200 );
    //	scene.add( object );
    //
    //	object = new Mesh( new TorusGeometry( 50, 20, 20, 20 ), material );
    //	object.position.set( 100, 0, - 200 );
    //	scene.add( object );
    //
    //	object = new Mesh( new TorusKnotGeometry( 50, 10, 50, 20 ), material );
    //	object.position.set( 300, 0, - 200 );
    //	scene.add( object );

    //

    renderer = new WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    container.appendChild(renderer.domElement);

    stats = new Stats();
    container.appendChild(stats.dom);

    //
    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize()
{
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

//
function animate()
{
    requestAnimationFrame(animate);

    render();
    stats.update();
}

function render()
{
    let timer = Date.now() * 0.0001;

    camera.position.x = Math.cos(timer) * 800;
    camera.position.z = Math.sin(timer) * 800;

    camera.lookAt(scene.position);

    scene.traverse(function (object: Object3D)
    {
        if (object instanceof Mesh)
        {
            object.rotation.x = timer * 5;
            object.rotation.y = timer * 2.5;
        }
    });

    renderer.render(scene, camera);
}


let camera: PerspectiveCamera;
let scene: Scene;
let renderer: WebGLRenderer;
let stats: Stats;

// init();
// animate();
