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

```typescript
import {validate, property, getSchema} from "../RTOV";

//embedded instance validation
@validate
class ExampleUserData {
  @property({
    type: "string",
    enum: ["ILS", "EUR", "USD"]
  })
  currency: "ILS" | "EUR" | "USD" | "ANY" = "ILS"

  @property({type: "string"})
  name: string = ""

  @property({type: "string"})
  surname: string = ""

  description?: any;
}

interface ModelConstructor<T> {
  new(...args: any[]): T;
}

//main instance validation
@validate
class ExampleUser {
  @property({
    type: "number", minimum: 1
  })
  id: number = 0;

  organization: string = "";

  @property({
    type: "object",
  })
  data : ExampleUserData;

  constructor(args : Partial<ExampleUser>) {
    // mandatory here to validate embedded data
    this.data = new (ExampleUserData as ModelConstructor<ExampleUserData>)(args.data);
  }
}

//instancing - that where throw will happen
const user = new ExampleUser({
  id: 2,
  data: {currency: "ANY", name: "Boris", surname: "Kolesnikov"}
});

//fix the above line to see the whole schema
console.log(getSchema(user))

//instancing - that where throw will happen
const correctUser = new ExampleUser({
  id: 2,
  data: {currency: "USD", name: "Boris", surname: "Kolesnikov"}
});

//incorrect value - comment it out to enjoy next one
correctUser.data.currency = "ANY";

//@ts-ignore
correctUser.data = { }
```

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
* Array - re-validation of array when one of its items being assigned in case of allOf and oneOf

## Bugs

We all wish there were none in our software, but alas. If you encounter a bug please log it in the issue tracker.

## Contributing

Feel free to contribute or come up with great ideas, please use the issue tracker for that.

If you add/change new functionality and want it merged to master, please open a pull request. Also add tests for it (spec directory).

Some things may not fit the library and could be rejected, so if you are unsure please ask first before wasting your valuable time!

## History and changelog

None yet