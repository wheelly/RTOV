import {validate, property} from "../../RTOV";
import { EmbeddedObject} from "./EmbeddedObject";
import {ObjectData } from "./ObjectData";

@validate
export class EmbeddedComplexArray {

  @property({
    type: "number", minimum: 1
  })
  id: number = 0;

  organization?: string;

  @property({
    type: "array",
    items: {
      "oneOf": [
      { type: "string" },
      { type: "object"},
      { type: "number"},
      ]
    },
    uniqueItems: true,
    minItems: 1,
    maxItems: 3
  })
  data : (string | number | EmbeddedObject<ObjectData>)[]

  constructor(args : EmbeddedComplexArray) {
    // mandatory here to validate embedded data
    this.data = args.data;
  }

}