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

interface SquareConfig
{
	color?: string;
	width?: number;
}

function createSquare( config: SquareConfig ):
	{
		color: string; area: number
	}
{
	let newSquare = { color: "white", area: 100 };

	if ( config.color )
		newSquare.color = config.color;

	if ( config.width )
		newSquare.area = config.width * config.width;

	return newSquare;
}

let mySquare = createSquare( { color: "red", width: 100 } );

console.info( mySquare );

main();