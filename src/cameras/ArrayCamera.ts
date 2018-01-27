/**
 * @author mrdoob / http://mrdoob.com/
 */

import { PerspectiveCamera } from './PerspectiveCamera';
import { Camera } from './Camera';

class ArrayCamera extends PerspectiveCamera
{
    cameras: Camera[];

    constructor(array: Camera[])
    {
        super();
        this.cameras = array || [];
    }

}

export { ArrayCamera };
