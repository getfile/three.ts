import { LightShadow } from './LightShadow';
import { _Math } from '../math/Math';
import { PerspectiveCamera } from '../cameras/PerspectiveCamera';

/**
 * @author mrdoob / http://mrdoob.com/
 */

class SpotLightShadow extends LightShadow
{
	constructor()
	{
		super( new PerspectiveCamera( 50, 1, 0.5, 500 ) );
	}

	update( light )
	{
		var camera = this.camera;
		var fov = _Math.RAD2DEG * 2 * light.angle;
		var aspect = this.mapSize.width / this.mapSize.height;
		var far = light.distance || camera.far;

		if ( fov !== camera.fov || aspect !== camera.aspect || far !== camera.far )
		{
			camera.fov = fov;
			camera.aspect = aspect;
			camera.far = far;
			camera.updateProjectionMatrix();
		}
	}

}

export { SpotLightShadow };
