"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = require("./data");
const get_schema_1 = require("../get-schema");
const chai_1 = require("chai");
describe('EmbeddedArray Invalid Data', function () {
    it('correct array assignment', function () {
        const simpleArray = new data_1.EmbeddedSimpleArray({
            id: 2,
            data: ["cool"]
        });
        console.log(JSON.stringify(simpleArray));
    });
    it('validate prop creation - incorrect array length', function () {
        chai_1.assert.throw(() => {
            new data_1.EmbeddedSimpleArray({
                id: 2,
                data: []
            });
        }, '[{"keyword":"minItems","dataPath":"","schemaPath":"#/minItems","params":{"limit":1},"message":"should NOT have fewer than 1 items"}]');
    });
    it('validate assignment in simple array', function () {
        chai_1.assert.throw(() => {
            const obj = new data_1.EmbeddedSimpleArray({
                id: 2,
                data: ["zack"]
            });
            console.log(JSON.stringify(get_schema_1.getSchema(obj)));
            console.log(JSON.stringify(obj));
            //@ts-ignore
            obj.data[0] = 1;
        }, '[{"keyword":"type","dataPath":"","schemaPath":"#/anyOf/0/type",' +
            '"params":{"type":"string"},"message":"should be string"},' +
            '{"keyword":"anyOf","dataPath":"","schemaPath":"#/anyOf",' +
            '"params":{},"message":"should match some schema in anyOf"}]');
    });
    it('validate assignment in array', function () {
        chai_1.assert.throw(() => {
            const obj = new data_1.EmbeddedComplexArray({
                id: 2,
                data: [
                    "zack",
                    666,
                    new data_1.EmbeddedObject({
                        id: 2,
                        data: { currency: "ILS", name: "Boris", surname: "Kolesnikov" }
                    })
                ]
            });
            console.log(JSON.stringify(get_schema_1.getSchema(obj)));
            console.log(JSON.stringify(obj));
            obj.data[2].data.currency = "ANY";
        }, '[{"keyword":"enum","dataPath":"","schemaPath":"#/enum",' +
            '"params":{"allowedValues":["ILS","EUR","USD"]},"message":"should be equal to one of the allowed values"}]');
    });
});
//# sourceMappingURL=embedded-array-invalid-data.js.map