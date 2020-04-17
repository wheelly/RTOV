import {EmbeddedSimpleArray} from "./data";
import {assert} from 'chai';

describe('EmbeddedSimpleArray Invalid Data', function() {

  describe('Property Instancing Validation', function() {
    it('validate prop creation - incorrect array length', function () {
      assert.throw(() => {
        new EmbeddedSimpleArray({
          id: 2,
          data: []
        });
      }, '[{"keyword":"minItems","dataPath":"","schemaPath":"#/minItems","params":{"limit":1},"message":"should NOT have fewer than 1 items"}]');
    });
  });

  // describe('Property Access Validation', function() {
  //   it('validate assignment in array', function () {
  //     assert.throw(() => {
  //       const obj = new EmbeddedSimpleArray({
  //         id: 2,
  //         data: ["zack"]
  //       });
  //       console.log(JSON.stringify(getSchema(obj)));
  //       console.log(JSON.stringify(obj));
  //       //@ts-ignore
  //       obj.data[0] = 1;
  //     }, '[{"keyword":"minItems","dataPath":"","schemaPath":"#/minItems","params":{"limit":1},"message":"should NOT have fewer than 1 items"}]');
  //   });
  // });


});