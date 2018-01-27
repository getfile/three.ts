/**
 * @author mrdoob / http://mrdoob.com/
 */

import { Matrix4 } from '../../math/Matrix4';
import { Vector4 } from '../../math/Vector4';
import { ArrayCamera } from '../../cameras/ArrayCamera';
import { PerspectiveCamera } from '../../cameras/PerspectiveCamera';
import { WebGLRenderer } from '../WebGLRenderer';
import { Camera } from '../../cameras/Camera';

class WebVRManager
{
    device; //VRDisplay

    cameraL: PerspectiveCamera;
    cameraR: PerspectiveCamera;
    cameraVR: ArrayCamera;

    frameData; //:VRFrameData;
    enabled: boolean;

    currentSize: { width: number, height: number };
    currentPixelRatio: number;

    renderer: WebGLRenderer;
    poseTarget;

    matrixWorldInverse: Matrix4;

    constructor(renderer)
    {
        this.renderer = renderer;

        this.device = null;
        this.frameData = null;
        this.poseTarget = null;

        if ('VRFrameData' in window)
            this.frameData = new window["VRFrameData"]();

        this.matrixWorldInverse = new Matrix4();

        this.cameraL = new PerspectiveCamera();
        this.cameraL.bounds = new Vector4(0.0, 0.0, 0.5, 1.0);
        this.cameraL.layers.enable(1);

        this.cameraR = new PerspectiveCamera();
        this.cameraR.bounds = new Vector4(0.5, 0.0, 0.5, 1.0);
        this.cameraR.layers.enable(2);

        this.cameraVR = new ArrayCamera([this.cameraL, this.cameraR]);
        this.cameraVR.layers.enable(1);
        this.cameraVR.layers.enable(2);

        this.enabled = false;
        if (typeof window !== 'undefined')
            window.addEventListener('vrdisplaypresentchange', this.onVRDisplayPresentChange, false);
    }

    onVRDisplayPresentChange()
    {
        if (this.device !== null && this.device.isPresenting)
        {
            var eyeParameters = this.device.getEyeParameters('left');
            var renderWidth = eyeParameters.renderWidth;
            var renderHeight = eyeParameters.renderHeight;

            this.currentPixelRatio = this.renderer.getPixelRatio();
            this.currentSize = this.renderer.getSize();

            this.renderer.setDrawingBufferSize(renderWidth * 2, renderHeight, 1);
        } else if (this.enabled)
            this.renderer.setDrawingBufferSize(this.currentSize.width, this.currentSize.height, this.currentPixelRatio);
    }

    getDevice() //VRDisplay(new)
    {
        return this.device;
    }

    setDevice(value)
    {
        if (value !== undefined) this.device = value;
    }

    setPoseTarget(object)
    {
        if (object !== undefined) this.poseTarget = object;
    }

    getCamera(camera: PerspectiveCamera): Camera
    {
        if (this.device === null) return camera;

        this.device.depthNear = camera.near;
        this.device.depthFar = camera.far;

        this.device.getFrameData(this.frameData);

        //
        var pose = this.frameData.pose;
        var poseObject = this.poseTarget !== null ? this.poseTarget : camera;

        if (pose.position !== null)
            poseObject.position.fromArray(pose.position);
        else
            poseObject.position.set(0, 0, 0);

        if (pose.orientation !== null)
            poseObject.quaternion.fromArray(pose.orientation);

        poseObject.updateMatrixWorld();

        if (this.device.isPresenting === false) return camera;

        this.cameraL.near = camera.near;
        this.cameraR.near = camera.near;

        this.cameraL.far = camera.far;
        this.cameraR.far = camera.far;

        this.cameraVR.matrixWorld.copy(camera.matrixWorld);
        this.cameraVR.matrixWorldInverse.copy(camera.matrixWorldInverse);

        this.cameraL.matrixWorldInverse.fromArray(this.frameData.leftViewMatrix);
        this.cameraR.matrixWorldInverse.fromArray(this.frameData.rightViewMatrix);

        var parent = poseObject.parent;

        if (parent !== null)
        {
            this.matrixWorldInverse.getInverse(parent.matrixWorld);

            this.cameraL.matrixWorldInverse.multiply(this.matrixWorldInverse);
            this.cameraR.matrixWorldInverse.multiply(this.matrixWorldInverse);
        }

        // envMap and Mirror needs camera.matrixWorld
        this.cameraL.matrixWorld.getInverse(this.cameraL.matrixWorldInverse);
        this.cameraR.matrixWorld.getInverse(this.cameraR.matrixWorldInverse);

        this.cameraL.projectionMatrix.fromArray(this.frameData.leftProjectionMatrix);
        this.cameraR.projectionMatrix.fromArray(this.frameData.rightProjectionMatrix);

        // HACK @mrdoob
        // https://github.com/w3c/webvr/issues/203
        this.cameraVR.projectionMatrix.copy(this.cameraL.projectionMatrix);

        //
        var layers = this.device.getLayers();

        if (layers.length)
        {
            var layer = layers[0];

            if (layer.leftBounds !== null && layer.leftBounds.length === 4)
                this.cameraL.bounds.fromArray(layer.leftBounds);

            if (layer.rightBounds !== null && layer.rightBounds.length === 4)
                this.cameraR.bounds.fromArray(layer.rightBounds);
        }

        return this.cameraVR;
    }

    submitFrame()
    {
        if (this.device && this.device.isPresenting) this.device.submitFrame();
    }

    dispose()
    {
        if (typeof window !== 'undefined')
            window.removeEventListener('vrdisplaypresentchange', this.onVRDisplayPresentChange);
    }

}

export { WebVRManager };
