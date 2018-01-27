/**
 * @author mrdoob / http://mrdoob.com/
 * @author mikael emtinger / http://gomo.se/
 * @author WestLangley / http://github.com/WestLangley
*/

import { Matrix4 } from '../math/Matrix4';
import { Quaternion } from '../math/Quaternion';
import { Object3D } from '../core/Object3D';
import { Vector3 } from '../math/Vector3';
import { Vector4 } from '../math/Vector4';

class Camera extends Object3D
{

    matrixWorldInverse: Matrix4;
    projectionMatrix: Matrix4;

    bounds: Vector4;

    constructor()
    {
        super();

        this.type = 'Camera';
        this.matrixWorldInverse = new Matrix4();
        this.projectionMatrix = new Matrix4();
    }

    copy(source, recursive: boolean = true)
    {
        super.copy(source, recursive);

        this.matrixWorldInverse.copy(source.matrixWorldInverse);
        this.projectionMatrix.copy(source.projectionMatrix);

        return this;
    }

    getWorldDirection(optionalTarget)
    {
        var quaternion = new Quaternion();
        var result = optionalTarget || new Vector3();

        this.getWorldQuaternion(quaternion);
        return result.set(0, 0, - 1).applyQuaternion(quaternion);
    }

    updateMatrixWorld(force?)
    {
        Object3D.prototype.updateMatrixWorld.call(this, force);
        this.matrixWorldInverse.getInverse(this.matrixWorld);
    }

    clone()
    {
        return new Camera().copy(this);
    }
}

export { Camera };
