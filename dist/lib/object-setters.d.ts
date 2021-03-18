import * as AJV from "ajv";
import { MetaData } from "./";
import { RTOVConstructor } from "../RTOV";
export declare const setValidator: (ajv: AJV.Ajv, externalCtors: RTOVConstructor[], metaData: MetaData, obj: any, data: any, prop: string) => any;
export declare const addObjectSetters: (ajv: AJV.Ajv, externalCtors: RTOVConstructor[], obj: any, args: any) => {
    required: string[];
    properties: any;
};
