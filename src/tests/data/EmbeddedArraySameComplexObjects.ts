import {validate, property} from "../../RTOV";
import {ObjectData} from "./ObjectData";

@validate
export class EmbeddedArraySameObjects {

  @property({
    type: "number", minimum: 1
  })
  id: number = 0;

  organization?: string;

  @property({
    type: "array",
    items: {
        type: "object",
    }
  }, ObjectData)
  elems : Array<ObjectData> = []

  constructor(args? : EmbeddedArraySameObjects) {
  }
}