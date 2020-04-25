import * as AJV from "ajv";
import { MetaData } from "./";
export declare const setValidator: (ajv: AJV.Ajv, metaData: MetaData, obj: any, newValue: any, prop: string) => any;
export declare const addObjectSetters: (ajv: AJV.Ajv, obj: any, args: any) => any;
