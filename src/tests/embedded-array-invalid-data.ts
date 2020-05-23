import {EmbeddedSimpleArray, EmbeddedComplexArray, EmbeddedObject} from "./data";
import {getSchema} from "../get-schema"
import {assert} from 'chai';

describe('EmbeddedArray Invalid Data', function () {

  describe('Simple Array: Property Instancing Validation', function () {
    it('validate prop creation - incorrect array length', function () {
      assert.throw(() => {
        new EmbeddedSimpleArray({
          id: 2,
          data: []
        });
      }, '[{"keyword":"minItems","dataPath":"","schemaPath":"#/minItems","params":{"limit":1},"message":"should NOT have fewer than 1 items"}]');
    });
  });

  describe('Simple Array: Property Access Validation', function () {
    it('validate assignment in simple array', function () {
      assert.throw(() => {
        const obj = new EmbeddedSimpleArray({
          id: 2,
          data: ["zack"]
        });
        console.log(JSON.stringify(getSchema(obj)));
        console.log(JSON.stringify(obj));
        //@ts-ignore
        obj.data[0] = 1;
      }, '[{"keyword":"type","dataPath":"","schemaPath":"#/anyOf/0/type",' +
        '"params":{"type":"string"},"message":"should be string"},' +
        '{"keyword":"anyOf","dataPath":"","schemaPath":"#/anyOf",' +
        '"params":{},"message":"should match some schema in anyOf"}]');
    });
  });

  describe('Complex Array: Property Access Validation', function () {
    it('validate assignment in array', function () {
      assert.throw(() => {
        const obj = new EmbeddedComplexArray({
          id: 2,
          data: [
            "zack",
            666,
            new EmbeddedObject({
              id: 2,
              data: {currency: "ILS", name: "Boris", surname: "Kolesnikov"}
            })
          ]
        });
        console.log(JSON.stringify(getSchema(obj)));
        console.log(JSON.stringify(obj));
        (obj.data[2] as EmbeddedObject).data.currency = "ANY"
      }, '[{"keyword":"enum","dataPath":"","schemaPath":"#/enum",' +
        '"params":{"allowedValues":["ILS","EUR","USD"]},"message":"should be equal to one of the allowed values"}]');
    });
  });


});