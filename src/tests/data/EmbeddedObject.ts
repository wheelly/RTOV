import {validate, property} from "../../RTOV";
import { ModelConstructor } from "./common";

@validate
export class EmbeddedObject<T extends {}> {

  @property({
    type: "number", minimum: 1
  })
  id: number = 0;

  organization: string = "";

  @property({
    type: "object",
  })
  data : T;

  constructor(args : Partial<EmbeddedObject<T>>, embeddedConstructor: ModelConstructor<T>) {
    // mandatory here to validate embedded data
    this.data = new embeddedConstructor(args.data);
  }

}
