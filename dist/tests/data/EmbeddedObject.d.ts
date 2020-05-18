import { ObjectData } from "./ObjectData";
declare type RuntimeDefinitionsMap<T> = {
    [resolverName: string]: T;
};
export declare class EmbeddedObject {
    id: number;
    organization: string;
    data: Partial<ObjectData>;
    booleanFieldDefault: boolean;
    definitions: RuntimeDefinitionsMap<number>;
    constructor(args: Partial<EmbeddedObject>);
}
export {};
