import { ModelConstructor } from "./common";
export declare class EmbeddedObject<T extends {}> {
    id: number;
    organization: string;
    data: Partial<T>;
    booleanFieldDefault: boolean;
    constructor(args: Partial<EmbeddedObject<T>>, embeddedConstructor: ModelConstructor<T>);
}
