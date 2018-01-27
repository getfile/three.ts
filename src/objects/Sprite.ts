import { Vector3 } from '../math/Vector3';
import { Object3D } from '../core/Object3D';
import { SpriteMaterial } from '../materials/SpriteMaterial';
import { Raycaster } from '../core/Raycaster';

/**
 * @author mikael emtinger / http://gomo.se/
 * @author alteredq / http://alteredqualia.com/
 */

class Sprite extends Object3D
{
    constructor( material: SpriteMaterial )
    {
        super();
        this.type = 'Sprite';
        this.material = ( material !== undefined ) ? material : new SpriteMaterial();
    }

    //interscts:[{collision info}, ...]
    raycast( raycaster: Raycaster, intersects )
    {
        var intersectPoint = new Vector3();
        var worldPosition = new Vector3();
        var worldScale = new Vector3();

        worldPosition.setFromMatrixPosition( this.matrixWorld );
        raycaster.ray.closestPointToPoint( worldPosition, intersectPoint );

        worldScale.setFromMatrixScale( this.matrixWorld );
        var guessSizeSq = worldScale.x * worldScale.y / 4;

        if ( worldPosition.distanceToSquared( intersectPoint ) > guessSizeSq ) return;

        var distance = raycaster.ray.origin.distanceTo( intersectPoint );

        if ( distance < raycaster.near || distance > raycaster.far ) return;

        intersects.push( {
            distance: distance,
            point: intersectPoint.clone(),
            face: null,
            object: this
        } );
    }

    clone(): Sprite
    {
        return new Sprite( this.material ).copy( this );
    }

}

export { Sprite };
