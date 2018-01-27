import { Object3D } from '../core/Object3D';
import { WebGLRenderTargetCube } from '../renderers/WebGLRenderTargetCube';
import { LinearFilter, RGBFormat } from '../constants';
import { Vector3 } from '../math/Vector3';
import { PerspectiveCamera } from './PerspectiveCamera';
import { WebGLRenderer } from '../renderers/WebGLRenderer';
import { Scene } from '../scenes/Scene';

/**
 * Camera for rendering cube maps
 *	- renders scene into axis-aligned cube
 *
 * @author alteredq / http://alteredqualia.com/
 */

class CubeCamera extends Object3D
{
    renderTarget: WebGLRenderTargetCube;

    cameraPX: PerspectiveCamera;
    cameraNX: PerspectiveCamera;
    cameraPY: PerspectiveCamera;
    cameraNY: PerspectiveCamera;
    cameraPZ: PerspectiveCamera;
    cameraNZ: PerspectiveCamera;

    constructor(near: number, far: number, cubeResolution: number)
    {
        super();

        this.type = 'CubeCamera';

        let fov = 90, aspect = 1;

        this.cameraPX = new PerspectiveCamera(fov, aspect, near, far);
        this.cameraPX.up.set(0, - 1, 0);
        this.cameraPX.lookAt(new Vector3(1, 0, 0));
        this.add(this.cameraPX);

        this.cameraNX = new PerspectiveCamera(fov, aspect, near, far);
        this.cameraNX.up.set(0, - 1, 0);
        this.cameraNX.lookAt(new Vector3(- 1, 0, 0));
        this.add(this.cameraNX);

        this.cameraPY = new PerspectiveCamera(fov, aspect, near, far);
        this.cameraPY.up.set(0, 0, 1);
        this.cameraPY.lookAt(new Vector3(0, 1, 0));
        this.add(this.cameraPY);

        this.cameraNY = new PerspectiveCamera(fov, aspect, near, far);
        this.cameraNY.up.set(0, 0, - 1);
        this.cameraNY.lookAt(new Vector3(0, - 1, 0));
        this.add(this.cameraNY);

        this.cameraPZ = new PerspectiveCamera(fov, aspect, near, far);
        this.cameraPZ.up.set(0, - 1, 0);
        this.cameraPZ.lookAt(new Vector3(0, 0, 1));
        this.add(this.cameraPZ);

        this.cameraNZ = new PerspectiveCamera(fov, aspect, near, far);
        this.cameraNZ.up.set(0, - 1, 0);
        this.cameraNZ.lookAt(new Vector3(0, 0, - 1));
        this.add(this.cameraNZ);

        let options = { format: RGBFormat, magFilter: LinearFilter, minFilter: LinearFilter };

        this.renderTarget = new WebGLRenderTargetCube(cubeResolution, cubeResolution, options);
        this.renderTarget.texture.name = "CubeCamera";
    }

    update(renderer: WebGLRenderer, scene: Scene)
    {
        if (this.parent === null) this.updateMatrixWorld();

        let renderTarget = this.renderTarget;
        let generateMipmaps = renderTarget.texture.generateMipmaps;

        renderTarget.texture.generateMipmaps = false;

        renderTarget.activeCubeFace = 0;
        renderer.render(scene, this.cameraPX, renderTarget);

        renderTarget.activeCubeFace = 1;
        renderer.render(scene, this.cameraNX, renderTarget);

        renderTarget.activeCubeFace = 2;
        renderer.render(scene, this.cameraPY, renderTarget);

        renderTarget.activeCubeFace = 3;
        renderer.render(scene, this.cameraNY, renderTarget);

        renderTarget.activeCubeFace = 4;
        renderer.render(scene, this.cameraPZ, renderTarget);

        renderTarget.texture.generateMipmaps = generateMipmaps;

        renderTarget.activeCubeFace = 5;
        renderer.render(scene, this.cameraNZ, renderTarget);

        renderer.setRenderTarget(null);
    }

    clear(renderer: WebGLRenderer, color: boolean, depth: boolean, stencil: boolean)
    {
        let renderTarget = this.renderTarget;

        for (let i = 0; i < 6; i++)
        {
            renderTarget.activeCubeFace = i;
            renderer.setRenderTarget(renderTarget);
            renderer.clear(color, depth, stencil);
        }

        renderer.setRenderTarget(null);
    }


}


export { CubeCamera };
