import {ObjectDataExt} from "./data";
import {getSchema} from "../get-schema";
import {assert} from 'chai';

describe('Inheritance', function () {

  it('Inheritance validation', function () {
    const ext = new ObjectDataExt();
    console.log(JSON.stringify(getSchema(ext)));

    assert.throw(() => {
      ext.extended = "1"
    }, '[extended]=[{"keyword":"minLength","dataPath":"","schemaPath":"#/minLength","params":{"limit":5},"message":"should NOT be shorter than 5 characters"}]');

    assert.throw(() => {
      //@ts-ignore
      ext.currency = "ZIV"
    }, '[currency]=[{"keyword":"enum","dataPath":"","schemaPath":"#/enum","params":{"allowedValues":["ILS","EUR","USD"]},"message":"should be equal to one of the allowed values"}]');

    assert.throw(() => {
      ext.name = ""
    }, '[name]=[{"keyword":"minLength","dataPath":"","schemaPath":"#/minLength","params":{"limit":1},"message":"should NOT be shorter than 1 characters"}]');


  });


});