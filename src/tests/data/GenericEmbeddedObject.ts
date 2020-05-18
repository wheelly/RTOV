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

  //TODO: this won't work - need to add properties from args to the object
  //finally?: Object;

  finally: Object | undefined = undefined;

  constructor(args : Partial<GenericEmbeddedObject<T>>, objectConstructor: RTOVGenericConstructor<T>) {
  }

}