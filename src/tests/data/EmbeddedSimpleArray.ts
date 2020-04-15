import {validate, property} from "../../RTOV";

@validate
export class EmbeddedSimpleArray {

  @property({
    type: "number", minimum: 1
  })
  id: number = 0;

  organization?: string;

  @property({
    type: "array",
    items: [
      { type: "string" }
    ],
    uniqueItems: true,
    minItems: 1,
    maxItems: 3
  })
  data : string[]

  constructor(args : EmbeddedSimpleArray) {
    // mandatory here to validate embedded data
    this.data = args.data;
  }

}
