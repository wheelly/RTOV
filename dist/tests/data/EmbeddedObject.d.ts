import { ModelConstructor } from "./common";
declare type RuntimeDefinitionsMap<T> = {
    [resolverName: string]: T;
};
export declare class EmbeddedObject<T extends {}> {
    id: number;
    organization: string;
    data: Partial<T>;
    booleanFieldDefault: boolean;
    definitions: RuntimeDefinitionsMap<number>;
    constructor(args: Partial<EmbeddedObject<T>>, embeddedConstructor: ModelConstructor<T>);
}
export {};
