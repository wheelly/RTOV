import { RTOVGenericConstructor } from "../../RTOV";
declare type RuntimeDefinitionsMap<T> = {
    [resolverName: string]: T;
};
export declare class GenericEmbeddedObject<T> {
    id: number;
    organization: string;
    data: Partial<T>;
    booleanFieldDefault: boolean;
    definitions: RuntimeDefinitionsMap<number>;
    finally?: Object;
    constructor(args: Partial<GenericEmbeddedObject<T>>, objectConstructor: RTOVGenericConstructor<T>);
}
export {};
