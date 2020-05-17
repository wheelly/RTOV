import {validate, property} from "../../RTOV";
import { ObjectData } from "./ObjectData";

type RuntimeDefinitionsMap<T> =  { [resolverName: string] : T}

@validate
export class EmbeddedObject {

  @property({
    type: "number", minimum: 1
  })
  id: number = 0;

  organization: string = "";

  @property({
    type: "object",
  }, ObjectData)
  data : Partial<ObjectData> = {};

  @property({type: "boolean"})
  booleanFieldDefault: boolean = false

  @property({type: "object"})
  definitions : RuntimeDefinitionsMap<number> = {};

  constructor(args : Partial<EmbeddedObject>) {
  }

}
