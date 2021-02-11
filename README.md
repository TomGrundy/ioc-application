#Thomas Grundy Inversion of Control implementation for job application

## Running the code
Simply import the library and name it however you please, e.g. ```import iocWrapped from IOC```.
Add your dependencies as needed, with ```iocWrapped.addDependency```,
then, add factories that  with ```iocWrapped.addFactory```
and then get your dependency inversion with ```iocWrapped.get```


Use ```npm test``` to run the tests.

## Structure
For simplicity's sake, all IoC code is in index.js, and all tests are in test.js.

## Contact
For any questions, please contact me at ```iocjobapplication@thomasgrundy.com```

## Steps made to make the library great to use
I've tried to name things as clearly as possible, and also keep things as simple as possible. I've also made sure the tests are both generic and more concrete, so as to ensure they can help someone coming onto the library can inspect them and hopefully internalize how to do dependency injection.

## Code further extensibility/collaboration
As the wrapper is genericised, further functions could be added and returned as needed, and further wrappers of other IoC patterns could be added as needed, without stepping on the dependency injection implementation.

## Approach to testing
I have used mocha/chai to test, as it means I don't need a huge number of co-dependencies to test or some reliance on, say babel or another some other compiler/transpiler. I have created some generic tests of the code itself, along with some more concrete examples that rely on dependency injection, so as to hopefully demonstrate the code completely.

## Feature Gaps and Edge Cases
The sample is in Javascript, as that has been my daily language at my current employer, so I felt more comfortable in that. However, that means there is a lack of type safety that comes with using Typescript.

The IoC Wrapper function I have developed is relatively generic, but is ultimately an implementation of Dependency Injection, wich is an implementation of inversion of control, but is only one implementation. Further expansion to the library could be made by exporting multiple functions for other implementations, such as some template pattern wrapper.
