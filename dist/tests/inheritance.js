"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = require("./data");
const get_schema_1 = require("../get-schema");
const chai_1 = require("chai");
describe('Inheritance', function () {
    it('Inheritance validation', function () {
        const ext = new data_1.ObjectDataExt();
        console.log(JSON.stringify(get_schema_1.getSchema(ext)));
        chai_1.assert.throw(() => {
            ext.extended = "1";
        }, '[extended]=[{"keyword":"minLength","dataPath":"","schemaPath":"#/minLength","params":{"limit":5},"message":"should NOT be shorter than 5 characters"}]');
        chai_1.assert.throw(() => {
            //@ts-ignore
            ext.currency = "ZIV";
        }, '[currency]=[{"keyword":"enum","dataPath":"","schemaPath":"#/enum","params":{"allowedValues":["ILS","EUR","USD"]},"message":"should be equal to one of the allowed values"}]');
        chai_1.assert.throw(() => {
            ext.name = "";
        }, '[name]=[{"keyword":"minLength","dataPath":"","schemaPath":"#/minLength","params":{"limit":1},"message":"should NOT be shorter than 1 characters"}]');
    });
});
//# sourceMappingURL=inheritance.js.map