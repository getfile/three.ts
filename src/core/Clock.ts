/**
 * @author alteredq / http://alteredqualia.com/
 */

class Clock
{
	private autoStart: boolean;
	private startTime: number;
	private oldTime: number;
	private elapsedTime: number;
	private running: boolean;

	constructor( autoStart: boolean = true )
	{
		this.autoStart = autoStart;

		this.startTime = 0;
		this.oldTime = 0;
		this.elapsedTime = 0;

		this.running = false;
	}

	/**start running */
	start()
	{
		this.startTime = ( typeof performance === 'undefined' ? Date : performance ).now(); // see #10732
		this.oldTime = this.startTime;
		this.elapsedTime = 0;
		this.running = true;
	}

	/**stop running*/
	stop()
	{
		this.getElapsedTime();
		this.running = false;
		this.autoStart = false;
	}

	getElapsedTime(): number
	{
		this.getDelta();
		return this.elapsedTime;
	}

	/**caculate delta time*/
	getDelta(): number
	{
		let diff = 0;

		if ( this.autoStart && !this.running )
		{
			this.start();
			return 0;
		}

		if ( this.running )
		{
			let newTime = ( typeof performance === 'undefined' ? Date : performance ).now();

			diff = ( newTime - this.oldTime ) / 1000;
			this.oldTime = newTime;

			this.elapsedTime += diff;
		}

		return diff;
	}

};


export { Clock };
