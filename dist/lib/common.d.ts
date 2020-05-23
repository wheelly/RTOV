import { RTOVConstructor, ExternCtorPosition } from "../constructor";
export declare type SchemaItemType = "number" | "integer" | "string" | "boolean" | "array" | "object" | "null";
export interface MetaData {
    className: string;
    schema: Object;
    objectConstructor?: RTOVConstructor | ExternCtorPosition;
}
export declare type SchemaUnionType = {
    [union in "oneOf" | "anyOf" | "allOf"]: any[];
};
export interface SchemaOfArray {
    type: 'array';
    items: {
        type: SchemaItemType;
    }[] | SchemaUnionType;
}
export declare const getPublicProperties: (obj: any) => string[];
export declare const getPropName: (name: string) => string;
export declare const setReadOnlyProperty: (obj: any, prop: string, data: any) => void;
