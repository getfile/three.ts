import { Color, HSL } from "../src/math/Color"
import { _Math } from "../src/math/Math"
import { Clock } from "../src/core/Clock"


export function main()
{
	console.info( "hello" );
	for ( let i = 0; i < 11; i++ )
		console.info( i + " uuid: " + _Math.generateUUID() );
	console.warn( "end" );

	let c: Clock = new Clock();
	c.start();
	console.info( c.getElapsedTime() );
}

main();