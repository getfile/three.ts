/**
 * @author mrdoob / http://mrdoob.com/
 */

class Uniform
{
    value: any;

    constructor( value: any )
    {
        this.value = value;
    }

    clone(): Uniform
    {
        return new Uniform( this.value.clone === undefined ? this.value : this.value.clone() );
    }

}

export { Uniform };
