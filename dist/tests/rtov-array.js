"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rtov_array_1 = require("../rtov-array");
const chai_1 = require("chai");
const data_1 = require("./data");
describe('RtOVArray basic functionality', () => {
    describe('Instancing and assignment', () => {
        const schema = {
            type: "array",
            items: [
                { type: "string" },
                { type: "number" },
            ]
        };
        const array = [42, "wheelly", -1];
        const rtOVArray = new rtov_array_1.RtOVArray(array, { className: 'test', schema });
        it('Instancing', () => {
            chai_1.expect(rtOVArray.toJSON()).to.deep.equal(array);
            console.log(JSON.stringify(rtOVArray));
        });
        it('correct assignment', () => {
            rtOVArray[1] = rtOVArray[0] + 1;
            chai_1.expect(rtOVArray[1]).to.equal(43);
            console.log(JSON.stringify(rtOVArray));
        });
        it('incorrect assignment', () => {
            chai_1.assert.throw(() => {
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
                { type: "object" },
                { type: "number" },
            ]
        };
        const complexObj = new data_1.EmbeddedObject({
            id: 2,
            data: { currency: "ILS", name: "Boris", surname: "Kolesnikov" }
        });
        const array = [666, complexObj];
        const rtOVArray = new rtov_array_1.RtOVArray(array, { className: 'test', schema });
        it('Instancing', () => {
            chai_1.expect(rtOVArray.toJSON()).to.deep.equal(array);
            console.log(JSON.stringify(rtOVArray));
        });
        it('correct assignment in complex object', () => {
            rtOVArray[1].data.currency = "USD";
        });
        it('incorrect assignment in complex object', () => {
            chai_1.assert.throw(() => {
                rtOVArray[1].data = { currency: "ANY", name: "Boris", surname: "Kolesnikov" };
            }, '[{"keyword":"enum","dataPath":".currency",' +
                '"schemaPath":"#/properties/currency/enum","' +
                'params":{"allowedValues":["ILS","EUR","USD"]},"message":"should be equal to one of the allowed values"}]');
        });
    });
});
//# sourceMappingURL=rtov-array.js.map