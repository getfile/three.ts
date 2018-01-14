import { Path } from './Path';
declare class Shape extends Path {
    uuid: any;
    holes: any;
    constructor(points?: any);
    getPointsHoles(divisions: any): any[];
    extractPoints(divisions: any): {
        shape: any[];
        holes: any[];
    };
    copy(source: any): this;
    toJSON(): {
        metadata: {
            version: number;
            type: string;
            generator: string;
        };
    };
    fromJSON(json: any): this;
}
export { Shape };
