import { Object3D } from '../core/Object3D';

/**
 * @author mrdoob / http://mrdoob.com/
 */

class Scene extends Object3D
{
	background;
	fog;
	overrideMaterial;
	autoUpdate;

	constructor()
	{
		super();

		this.type = 'Scene';
		this.background = null;
		this.fog = null;
		this.overrideMaterial = null;

		this.autoUpdate = true; // checked by the renderer
	}

	copy( source, recursive )
	{
		super.copy( source, recursive );

		if ( source.background !== null ) this.background = source.background.clone();
		if ( source.fog !== null ) this.fog = source.fog.clone();
		if ( source.overrideMaterial !== null ) this.overrideMaterial = source.overrideMaterial.clone();

		this.autoUpdate = source.autoUpdate;
		this.matrixAutoUpdate = source.matrixAutoUpdate;

		return this;
	}

	toJSON( meta )
	{
		var data = super.toJSON( meta );

		if ( this.background !== null ) data.object.background = this.background.toJSON( meta );
		if ( this.fog !== null ) data.object.fog = this.fog.toJSON();

		return data;
	}

}

export { Scene };
