# RTOV - Runtime Object Validation

TypeScript library for runtime validation uses [Ajv: Another JSON Schema Validator](https://www.npmjs.com/package/ajv)

* The library is written in TypeScript. Easily integrated both in Typescript and Javascript projects.
* The use of two decorators makes it easier to comprehend your code.
* [Ajv]((https://www.npmjs.com/package/ajv)) scheme is a common standard to describe the way properties must be validated.   

The following **documentation** sections are available:
* [Installation](#installation)
* [Usage](#usage)
* [Build](#build)
* [Tests](#tests)
* [TODO](#TODO)
* [Bugs](#bugs)
* [Contributing](#contributing)
* [History and changelog](#history-and-changelog)


## Installation

<!--
Use npm or yarn to install library for usage in your project.

```bash
yarn add ORTV
```

```bash
yarn add https://github.com/wheelly/RTOV
```

```bash
npm install ORTV
```
-->
Use yarn to install library for usage in your project.
* Note: npm package not ready yet
```bash
yarn add https://github.com/wheelly/RTOV
```

No additional typings are required, these are included.

## Usage

The library provides two decorators to inject validation into the class instance.

* @validate - a class decorator.
* @property - a parametrized property decorator.
* Your instance will have getSchema() method which returns the complete validation schema for the object

#### Object example

```typescript
import {validate, property, getSchema} from "RTOV";

@validate
class EmbeddedObject {

  @property({
    type: "number", minimum: 1
  })
  id: number = 0;

  organization: string = "";

  /**
  the second optional parameter is ObjectConstuctor 
  which constructs embedded object
  This construction for non-array objects only. 
  For array have to construct elements of this instance.
  For array the ObjectConstructor just generates the proper openapi schema for elements    
   **/
  @property({
    type: "object",
  }, ObjectData)
  data : Partial<ObjectData> = {};

  @property({type: "boolean"})
  booleanFieldDefault: boolean = false

  constructor(args : Partial<EmbeddedObject>) {
  }
}

type CurrencyType = "ILS" | "EUR" | "USD" | "ANY"

@validate
class ObjectData {
  @property({
    type: "string",
    enum: ["ILS", "EUR", "USD"]
  })
  currency: CurrencyType  = "ILS"

  @property({type: "string"})
  name: string = ""

  @property({type: "string"})
  surname: string = ""

  description?: any;

  constructor(args : ObjectData) {}
}


//instancing - that where throw will happen
const invalidObj = new EmbeddedObject({
  id: 2,
  data: {currency: "ANY", name: "Boris", surname: "Kolesnikov"}
});

//fix the above line to see the whole schema
console.log(JSON.stringify(getSchema(invalidObj)))

//instancing - that where throw will happen
const correctUser = new EmbeddedObject({
  id: 2,
  data: {currency: "USD", name: "Boris", surname: "Kolesnikov"}
});

//incorrect value - comment it out to enjoy next one
correctUser.data.currency = "ANY";

//@ts-ignore
correctUser.data = { }
```

#### Array example

```typescript

...

@validate
export class EmbeddedComplexArray {

  @property({
    type: "number", minimum: 1
  })
  id: number = 0;

  organization?: string;

  @property({
    type: "array",
    items: {
      "oneOf": [
      { type: "string" },
      { type: "object"},
      { type: "number"},
      ]
    },
    uniqueItems: true,
    minItems: 1,
    maxItems: 3
  })
  data : (string | number | EmbeddedObject)[] = []

  constructor(args : EmbeddedComplexArray) {
  }
}

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
```

### Optional example

```typescript
...

@validate
export class EmbeddedArraySameObjects {

  @property({
    type: "number", minimum: 1
  })
  id: number = 0;

  @property({
    type: "string",
    minLength: 3,
    optional: true //this will remove property from required fields
  })
  organization?: string = "001";

  @property({
    type: "array",
    items: {
      type: "object",
    }
  }, ObjectData)
  elems : Array<ObjectData> = []

  constructor(args? : EmbeddedArraySameObjects) {
  }
}

```

### Inheritance example
```typescript
@validate
export class ObjectData {
  @property({
    type: "string",
    enum: ["ILS", "EUR", "USD"]
  })
  currency: CurrencyType  = "ILS"

  @property({type: "string"})
  name: string = ""

  @property({type: "string"})
  surname: string = ""

  description?: any;

  constructor(args? : ObjectData) {}

}

@validate
export class ObjectDataExt extends ObjectData {
  @property({type: "string", minLength: 5})
  extended: string = "12345"

  @property({type: "string", minLength: 1})
  name: string = "Z"

  constructor(args? : ObjectDataExt) {
    super(args);
  }
}

const ext = new ObjectDataExt();
console.log(JSON.stringify(getSchema(ext)));
```

Please look up test to see an example of working with generics

## Build

To build locally:

```bash
npm run build
```

```bash
yarn build
```

## Tests

To run the tests:

```bash
npm run tests
```

```bash
yarn tests
```

## TODO

* Custom validators support
* Array - re-validation of array when one of its items assigned in case of allOf and oneOf

## Bugs

We all wish there were none in our software, but alas. If you encounter a bug please log it in the issue tracker.

## Contributing

Feel free to contribute or come up with great ideas, please use the issue tracker for that.

If you add/change new functionality and want it merged to master, please open a pull request. Also add tests for it (spec directory).

Some things may not fit the library and could be rejected, so if you are unsure please ask first before wasting your valuable time!

## History and changelog

None yet