import {RtOVArray } from "../rtov-array";
import {assert, expect} from 'chai';
import {EmbeddedObject} from "./data";

describe('RtOVArray basic functionality', () => {

  describe('Instancing and assignment', () => {

    const schema = {
      type: "array",
      items: [
        {type: "string"},
        {type: "number"},
      ]
    };

    const array = [42, "wheelly", -1];
    const rtOVArray = new RtOVArray<string | number>(array, {className: 'test', schema});

    it('Instancing', () => {
      expect(rtOVArray.toJSON()).to.deep.equal(array);
      console.log(JSON.stringify(rtOVArray));
    })

    it( 'correct assignment', () => {
      rtOVArray[1] = rtOVArray[0] as number + 1;
      expect(rtOVArray[1]).to.equal(43);
      console.log(JSON.stringify(rtOVArray));
    })

    it( 'incorrect assignment', () => {
      assert.throw(() => {
        //@ts-ignore
        rtOVArray[0] = {};
      }, '[{"keyword":"type","dataPath":"","schemaPath":"#/anyOf/0/type",' +
        '"params":{"type":"string"},"message":"should be string"},' +
        '{"keyword":"type","dataPath":"","schemaPath":"#/anyOf/1/type",' +
        '"params":{"type":"number"},"message":"should be number"},' +
        '{"keyword":"anyOf","dataPath":"",' +
        '"schemaPath":"#/anyOf","params":{},"message":"should match some schema in anyOf"}]');
    });
  });

  describe('RtOVArray with complex types', () => {
    const schema = {
      type: "array",
      items: [
        {type: "object"}, //do not need to check here the complex object since it's checked internally by its decorators
        {type: "number"},
      ]
    };
    const complexObj = new EmbeddedObject({
      id: 2,
      data: {currency: "ILS", name: "Boris", surname: "Kolesnikov"}
    });

    const array = [666, complexObj];
    const rtOVArray = new RtOVArray<typeof complexObj | number>(array, {className: 'test', schema});

    it('Instancing', () => {
      expect(rtOVArray.toJSON()).to.deep.equal(array);
      console.log(JSON.stringify(rtOVArray));
    })

    it('correct assignment in complex object', () => {
      (rtOVArray[1] as EmbeddedObject).data.currency = "USD";
    });

    it('incorrect assignment in complex object', () => {
      assert.throw(() =>{
        (rtOVArray[1] as EmbeddedObject).data =  {currency: "ANY", name: "Boris", surname: "Kolesnikov"}
      }, '[{"keyword":"enum","dataPath":".currency",' +
        '"schemaPath":"#/properties/currency/enum","' +
        'params":{"allowedValues":["ILS","EUR","USD"]},"message":"should be equal to one of the allowed values"}]')
    });

  });

});