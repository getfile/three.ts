/**
 * @author mrdoob / http://mrdoob.com/
 */


class AudioContext 
{
	static context;

	static getContext()
	{
		if ( this.context === undefined )
			AudioContext.context = new ( window.AudioContext || window.webkitAudioContext )();

		return AudioContext.context;
	}

	static setContext( value )
	{
		AudioContext.context = value;
	}

}

export { AudioContext };
