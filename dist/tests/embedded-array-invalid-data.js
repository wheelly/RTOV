"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = require("./data");
const chai_1 = require("chai");
describe('EmbeddedSimpleArray Invalid Data', function () {
    describe('Property Instancing Validation', function () {
        it('validate prop creation - incorrect array length', function () {
            chai_1.assert.throw(() => {
                new data_1.EmbeddedSimpleArray({
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
//# sourceMappingURL=embedded-array-invalid-data.js.map