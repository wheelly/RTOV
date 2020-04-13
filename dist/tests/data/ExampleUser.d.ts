import { ModelConstructor } from "./common";
export declare class ExampleUser<T extends {}> {
    id: number;
    organization: string;
    data: T;
    constructor(args: Partial<ExampleUser<T>>, embeddedConstructor: ModelConstructor<T>);
}
