import {EmbeddedArraySameObjects} from "./data";
import {getSchema} from "../get-schema";

describe('Array same objects', function () {

  it('Same object as embedded array items', function () {
    const user = new EmbeddedArraySameObjects();

    console.log(JSON.stringify(user))
    console.log(JSON.stringify(getSchema(user)));
  });


});