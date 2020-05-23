import {validate, property, RTOVGenericConstructor } from "../../RTOV";

type RuntimeDefinitionsMap<T> =  { [resolverName: string] : T}

@validate
export class GenericEmbeddedObject<T> {

  @property({
    type: "number", minimum: 1
  })
  id: number = 0;

  organization: string = "";

  @property({
    type: "object",
  }, { extern: 1 })
  data : Partial<T> = {};

  @property({type: "boolean"})
  booleanFieldDefault: boolean = false

  @property({type: "object"})
  definitions : RuntimeDefinitionsMap<number> = {};

  finally?: Object;

  constructor(args : Partial<GenericEmbeddedObject<T>>, objectConstructor: RTOVGenericConstructor<T>) {
  }

}