import { ModelConstructor } from "./common";
export declare class EmbeddedObject<T extends {}> {
    id: number;
    organization: string;
    data: T;
    constructor(args: Partial<EmbeddedObject<T>>, embeddedConstructor: ModelConstructor<T>);
}
