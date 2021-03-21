import {validate, property} from "../../RTOV";
import {ObjectData} from "./ObjectData";

@validate
export class EmbeddedArraySameObjects {

  @property({
    type: "number", minimum: 1
  })
  id: number = 1;

  @property({
    type: "string",
    minLength: 3,
    optional: true
  })
  organization?: string = "001";

  @property({
    type: "array",
    items: {
        type: "object",
    }
  }, ObjectData)
  elems : Array<ObjectData> = []

}