import 'reflect-metadata';
import { RTOVConstructor, ExternCtorPosition } from "./constructor";
export declare function validate<T extends {
    new (...constructorArgs: any[]): any;
}>(constructorFunction: T): any;
export declare function property(schema: Object, objectConstructor?: RTOVConstructor | ExternCtorPosition): (target: Object, propertyKey: string) => void;
