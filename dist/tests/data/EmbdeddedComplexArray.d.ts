import { EmbeddedObject } from "./EmbeddedObject";
export declare class EmbeddedComplexArray {
    id: number;
    organization?: string;
    data: (string | number | EmbeddedObject)[];
    constructor(args: EmbeddedComplexArray);
}
