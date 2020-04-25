import { EmbeddedObject } from "./EmbeddedObject";
import { ObjectData } from "./ObjectData";
export declare class EmbeddedComplexArray {
    id: number;
    organization?: string;
    data: (string | number | EmbeddedObject<ObjectData>)[];
    constructor(args: EmbeddedComplexArray);
}
