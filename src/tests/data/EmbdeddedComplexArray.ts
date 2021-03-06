import {validate, property} from "../../RTOV";
import { EmbeddedObject} from "./EmbeddedObject";

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
  data : (string | number | EmbeddedObject)[] = []

  constructor(args : EmbeddedComplexArray) {
  }
}