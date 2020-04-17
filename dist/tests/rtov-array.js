"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rtov_array_1 = require("../rtov-array");
const chai_1 = require("chai");
describe('RtOVArray functionality', function () {
    it('RtOVArray creation and assignment check', function () {
        const schema = {
            type: "array",
            items: [
                { type: "string" },
                { type: "number" },
            ]
        };
        const array = [42, "wheelly", -1];
        const rtOVArray = new rtov_array_1.RtOVArray([42, "wheelly", -1], { className: 'test', schema });
        chai_1.expect(rtOVArray.toJSON()).to.deep.equal(array);
        console.log(JSON.stringify(rtOVArray));
        rtOVArray[1] = rtOVArray[0] + 1;
        chai_1.expect(rtOVArray[1]).to.equal(43);
        console.log(JSON.stringify(rtOVArray));
        chai_1.assert.throw(() => {
            //@ts-ignore
            rtOVArray[0] = {};
        }, '[{"keyword":"type","dataPath":"","schemaPath":"#/oneOf/0/type",' +
            '"params":{"type":"string"},"message":"should be string"},' +
            '{"keyword":"type","dataPath":"","schemaPath":"#/oneOf/1/type","params":{"type":"number"},"message":"should be number"},' +
            '{"keyword":"oneOf","dataPath":"","schemaPath":"#/oneOf","params":{"passingSchemas":null},' +
            '"message":"should match exactly one schema in oneOf"}]');
    });
});
//# sourceMappingURL=rtov-array.js.map