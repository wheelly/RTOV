import { MetaData } from "./lib";
import * as AJV from "ajv";
declare class IndexType<T> {
    [index: number]: T;
}
export declare class RtOVArray<T> extends IndexType<T> {
    private metaData;
    private ajv;
    constructor(items: T[], metaData: MetaData, ajv?: AJV.Ajv);
    toJSON(): unknown[];
    private itemsMetaData;
    private addProperty;
}
export {};
