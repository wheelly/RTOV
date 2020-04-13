import {ExampleUser, ExampleUserData} from "./data";

import {assert, expect} from 'chai';
import {GetSchema} from "../lib";

describe('ExampleUser', function() {

  describe('Property Instancing Validation', function() {
    it('validate prop creation - incorrect currency', function() {
      assert.throw(() => {
        const user = new ExampleUser<ExampleUserData>({
          id: 2,
          data: {currency: "ANY", name: "Boris", surname: "Kolesnikov"}
        }, ExampleUserData);
      }, '[{"keyword":"enum","dataPath":"","schemaPath":"#/enum","params":{"allowedValues":["ILS","EUR","USD"]},"message":"should be equal to one of the allowed values"}]');
    });

    it('validate embedded prop access', function() {
      assert.throw(() => {
        const user = new ExampleUser<ExampleUserData>({
          id: 0,
          data: {currency: "ILS", name: "Boris", surname: "Kolesnikov"}
        }, ExampleUserData);
      }, '[{"keyword":"minimum","dataPath":"","schemaPath":"#/minimum","params":{"comparison":">=","limit":1,"exclusive":false},"message":"should be >= 1"}]');
    });
  });

  describe('Property Access Validation', function() {
    it('validate prop access', function() {
      assert.throw(() => {
        let user = new ExampleUser<ExampleUserData>({
          id: 2,
          data: {currency: "ILS", name: "Boris", surname: "Kolesnikov"}
        }, ExampleUserData);

        console.log( JSON.stringify((user as unknown as GetSchema).getSchema()) );

        (user as any).id = "ANY"
      });
    });

    it('validate embedded prop access', function() {
      assert.throw(() => {
        let user = new ExampleUser<ExampleUserData>({
          id: 2,
          data: {currency: "ILS", name: "Boris", surname: "Kolesnikov"}
        }, ExampleUserData);
        user.data.currency = "ANY"
      });

      assert.throw(() => {
        let user = new ExampleUser<ExampleUserData>({
          id: 2,
          data: {currency: "ILS", name: "Boris", surname: "Kolesnikov"}
        }, ExampleUserData);
        console.log(user);
        //@ts-ignore
        user.data = { currency: "ANY" }
      }, '[{"keyword":"enum","dataPath":".currency","schemaPath":"#/properties/currency/enum","params":{"allowedValues":["ILS","EUR","USD"]},"message":"should be equal to one of the allowed values"},{"keyword":"required","dataPath":"","schemaPath":"#/required","params":{"missingProperty":"name"},"message":"should have required property \'name\'"},{"keyword":"required","dataPath":"","schemaPath":"#/required","params":{"missingProperty":"surname"},"message":"should have required property \'surname\'"}]');

    });
  });

});