**WORK IN PROGRESS**

# General Coding

## Third Party Exceptions

**One note about these patterns is that they can be ignored only if needed to use a 3rd party library or something that is out of our control.**

## Comment none standard implementations

There are going to be case where we need to do something outside of our standard pattern, it is just going to happen. In these cases, we need to add a comment why the standard pattern will not work. This help the reviewers of PRs understand why something is different (and might lead them to suggest an alternative) and anyone reading the code later why it might look a little different from normal.

## Directory Structure

### Applications

Applications are individual application such as an api, web application, electron applications, mobile application, etc.

`applications/*` - Each direction in this one should be a single application

### Packages

Packages are smaller pieces of logic that can be reused withing other packages and applications.

- `packages/components/*` - Smaller scale component such as a button, form input, etc. (each component or collection of components needs to be in a sub-directory)
- `packages/constants/*` - global constants that don't fit under a utility file
- `packages/contexts/*` - Custom react contexts, each file should contain 1 custom context
- `packages/hooks/*` - Custom react hooks, each file should contain 1 custom hook
- `packages/storybook-helper/*` - I don't like this one, will probably remove at some point
- `packages/types/*` - General use types, each file should be grouped by pattern (`react.ts` for react based types, `theme.ts` for theme based types, etc.)
- `packages/utils/*` - Utility methods, each file should be grouped by logic functionality (`string.ts` for `stringUtils`, `user.ts` for `userUtils`, etc.), they should also include and types, constants, and api call directly related to the utility
- `packages/utils/data-models/*` Sme as utils bu specific for "data model" (i.e. user, project, role, permission, etc.)
- `packages/views/*` - Larger scale component of the nature of things like pages and modals

### Testing Files

Testing file should be included in a folder called `tests` that is in the same directory as the code it is testing.

```
packages/components/button/tests/button.cypress.spec.tsx
packages/components/button/button.tsx
```

## Naming

These are the general naming standards that should always be followed.

### Casing Rules

The casing rules are as follows:

- directories - kebab-case
- files - kebab-case
- string identifiers - kebab-case
- interfaces / types - PascalCase
- enum names - PascalCase
- react components - PascalCase
- classes - PascalCase (functional programming style should be used over classes / OOP whenever possible)
- constants - SCREAM_CASE
- enum values - SCREAM_CASE
- variables / properties - camelCase
- function / methods - camelCase
- imports - camelCase
- basically everything else - camelCase

When in doubt, use camelCase.

#### Exceptions

- react must be import as `import React from 'react';` as it is required by react to work properly.

### Prefixing / Suffixing Certain Data

There are a few cases where we want to prefix or suffix certain data to help with naming conflicts / keep naming consistent:

- function parameters - `*Params`
```ts
interface BuildProviderParams<T> {
  context: React.Context<T>;
  getState: () => T;
}
```
- components properties - `*Props`
```ts
interface ButtonProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  'data-context'?: buttonContext;
  'data-size'?: buttonSize;
  // ...
}
```
- form data - `*FormData`;
```ts
interface ComplexFormData {
  firstName: string;
  autoComplete: number;
  email: string;
  mobileNumber: string;
  title: string;
  developer: string;
  dateTime: string;
  todos: Todo[];
  todosCompleted: Todo[];
}
```
- contexts - `*Context`
```ts
export const applicationSettingsContext: CustomReactContext<
    ApplicationSettingsContext,
    CreateApplicationSettingsContextFunc
    > = {
    ...defaultContext,
    createContext,
};
````
- hooks - `use*`
```ts
const useToggle = () => { /* ... */ };
```
- utils - `[fioeName]Utils`
```ts
// package/utils/drag-drop.ts

export const dragDropUtils = {
    shouldChangePosition,
    getPosition,
    updatePosition
};
```

### Special files

Some specific file have unique naming pattern to better help with tooling:

- cypress testing files - `*.cy.ts(x)`
- mocha testing files - `*.spec.ts(x)`
- storybook - `*.stories.tsx`

## File Structure

### Imports

It is preferred to have external 3rd party imports grouped first and then have internal imported grouped second.

### Components / Views

Components should ideally just have a default export of the main component for that file, anything that is expected to be needed to be exported externally should be  included in a `common.ts(x)` file.

The default export is for making sure component play well with `React.Lazy()` when needed and for consistent, just want to make all components the same.

### Contexts

Contexts should fulfill the `CustomReactContext<>` generic, for example:

```ts
export const applicationSettingsContext: CustomReactContext<
    ApplicationSettingsContext,
    CreateApplicationSettingsContextFunc
    > = {
    ...defaultContext,
    createContext,
};
```

### Hooks

Hooks should have 1 named export (not including types) that ends with `Hook` and contains the `use*` method for the hooks, for example:

```ts
export const useToggleHook = {
    useToggle,
};
```

This is done in order to ensure mock-ability of the code with es modules.

### Utils

Utils file should have 1 named export (not including types) that is the name of the file + `Utils` that contains all the methods that should be external, for example:

```ts
// package/utils/drag-drop.ts

export const dragDropUtils = {
  shouldChangePosition,
  getPosition,
  updatePosition
};
```

This is done in order to ensure mock-ability of the code with es modules. This also has the side effect of more consistency import utilities naming within the codebase.

## No magic strings

Instead of using in-place string identifier, we should be using a constants instead.

```ts
// bad
if (user.role === 'admin') {
    // ...
}

// good
import { Role } from '$/utils/data-models/user';

if (user.role === Role.ADMIN) {
    // ...
}
```

## Always install npm modules at an exact version

Over the years there have been incidents of npm package being hack or even the maintainers themselves adding malicious code:

- https://security.stackexchange.com/questions/189489/recent-eslint-hack-or-how-can-we-protect-ourselves-from-installing-malicious-npm
- https://www.bleepingcomputer.com/news/security/big-sabotage-famous-npm-package-deletes-files-to-protest-ukraine-war/
- https://thehackernews.com/2021/11/two-npm-packages-with-22-million-weekly.html

There are also times when a non-breaking version bump does actually break code (no one is perfect) and having that auto update without knowing can make what caused that breaking issue very hard to determine.

For those reasons, locking down packages in `package.json` to an exact version (not using `~`, `^`, etc.) helps prevent these kinds of issues (along with the `package-lock.json` file).

## Store common use / externally available data in a `common.ts` for each directory

Whenever we have data that is being used in multiple files within a directory or data that needs to be exposed for components and such, we should store this data in a `common.ts(x)` file. This provides 2 benefits:

- This helps avoid circular dependency issue that can come up, especially in component directories. For example, a `ButtonGroup` component might include the `Button` component in order to affect its styles when located in a `ButtonGroup` however both of those components need access to common types. Having those common types in a `common.ts(x)` file avoid the circular dependency it might cause.
- For components, by limiting the component to only having a default export and nothing else, we don't run into this issue of hot reloading not working as expected.

## Only components should have default exports

While there are a number of smaller reasons, the biggest reason for this is to ease the process of mocking. Mock default exports is not nearly at straight forward as it is with named export objects.

Components have the default export as it is a requirement of `React.lazy()` so we want to make sure our component are compatible with that if needed.

## Export methods in an object instead of individually

While export name method might be less code than wrapping them in a named object export, by wrapping this in a named object export, they are easily mock-able in the context of es modules and help make import naming more consistent.

## Functional and Immutable Patterns over OOP

We should always be using functional / immutable pattern over OOP. For example, instead of creating a `class` with methods on it, we should create a utility file that has methods that take in the needed data and return that modified version of the data without actually modifying the passed in data. This can greatly reduce issue related to side effect that happen in code that can often are difficult to debug.

We use `immer` for our immutable workflow.

# Favor fat arrow functions when possible

There is no real downside to using fat arrow functions and they provide the benefit of automatic scoping `this` properly in certain cases.

```ts
// bad
function someMethod() {
  // ...
}

// good
const someMethod = () => {
  // ...
}
```

## Overriding eslint code inline

Overriding eslint rules should be the exception to the rule so when doing so, there must be a solid reason for doing it and a comment must be added to example why which will help with PR reviews and people later reading the code to understand the reasoning (if the reason is spelled out, someone might see it and know of a way around that issue that might have not been thought of before).

We also should only be disabling specific eslint rules for specific lines, we should never to disabling eslint for a file in whole.

## Use `data-id` for general purpose css selector needs

While is in common to use `data-testid` for creating general use selector for unit testing, we should instead use `data-id`. This can be use not only for testing, but for other purposes such as analytics and using some general like `data-id` can better indicator it might be used for more than just testing and that change it should be handled with care.

## `data-id` values should be generic and nested selector used to drill deep.

We should be using nested for `data-id` attributes (do `[data-id="frame"] [data-id="navigation]` instead of `[data-id="frame-navigation"]`). This allows these value to be generic and not to wordly.

## Don't create a storybook file for every single component

Every single component does not need its own storybook file, only logical collections of components should have stories. A general rule is if the component can be used by itself, it should probably have a story file. For example. `ApplicationFrameNavigation` and `ApplicationFameNavigationItem` should not have their own stories files if they can only be used inside of  `ApplciationFrame` and nowhere else. Another example might be `Button` and `ButtonGroup` components. While the `ButtonGroup` component is not designed to be used on its own, the `Button` component is in which can there would be 2 separate storybook files for these components.

## Prefer explicit ref passing vs forwardRef

While React added forward refs in 16.3, in general, they really don't provide any major benefit over explicit ref passing and explicit ref passing is generally more flexible (for example, forward refs don't support multiple refs where explicit passing does). Since explicit ref passing seems to be the more flex solution, it should almost always be used.

Reference:
https://gist.github.com/gaearon/1a018a023347fe1c2476073330cc5509

## useEffects() should always be documented with comments 

While when defining a callback with `useCallback()` you have to give the function a name which generally is good enough to document what the callback is doing, `useEffect()` is different since you can't provide a name to it. So for `useEffect()` we should always make sure to document in comment what the effect is for.

## Avoid named export on lazy loaded components

Components that are lazy loaded should avoid having named exported as it is does, it can cause hot reload to fully reload the page and clear any state.

Reference: https://github.com/vitejs/vite/issues/8344#issuecomment-1140924567

## Use NVM for node management

Allows for use of .nvmrc file to make managing versions in different repo easier

## Avoid `import * as ...` imports

Using `import * as ...` style of import should be avoided as it can create inconsistent naming with import (since you can name this however you want) and this can lead to issue with mocking for testing (since with es moduels, you can mock named exports directly).

# Testing

## Don't focus on 100% code coverage

While we should be testing all of our code we should focus on making sure critical path and complex logic code is testing and be too worried about getting 100% code coverage or anything like that.

## Mock only as needed, not by default

There are some philosophies around unit testing that they should be pure. They should only run the code that is intended for the test to check and everything else should be mocked. While this does have some benefits, it also has costs.

If something does not need to be mocked in order to test something, then it generally should not be mocked. Mocking has overhead in setting them up, maintaining them as code changes, extra complexity in understand the test itself, etc. so the less we mock, the less we have on these costs. For example, a lot of the methods in libraries like lodash don't need to be mock as they already have testing from the library itself and they can run fine as normally during a test (if they are pure).

## Create utility method for very commonly / similarly used mocks

When there is a mock that is very commonly used and the way that it is used is generally the same, that is a mock that probably should be done with a utility method. An example of this would be an authentication context that is needed pretty much on any page. Creating a utility method for mocking these types of things that has a simple api can greatly reduce boilerplate mocking code for testing.

## Use Cypresses mocking functionality for all mocking

Cypress has wrappers around most of the mocking functionality that sinon has (Cpyress wraps sinon under the hood) so we should be using that functionality for all out mocking needs, some of the more common apis would be:

- https://docs.cypress.io/api/commands/stub
- https://docs.cypress.io/api/commands/spy
- https://docs.cypress.io/api/commands/clock

## Wrap 3rd party components as needed for testing

There might be cases where mocking a 3rd party library is difficult (because of how it is exported) or impossible (because it is using es modules). Instead of trying to work with complex import mocking solutions which can can be finicky, wrap the library in a custom util file which then can be used to allow for very easy and straight forward mocking.

## Always test spy / stub call count with `.callCount` instead of `.callOnce`

While using `.callCount` like this:

```ts
expect(logStub.callCount).to.be(1);
```

is effectively the same as using `.calledOnce` (or similar properties) like this:

```ts
expect(logStub.calledOnce).to.be(true);
```

the benefit of always using `.callCount` is if the assertion fails, you will this result:

```
Expected: 1
Received: 2
```

instead of this:

```
Expected: true
Received: false
```

The former results lets you see how many calls did happen with any further investigation can can make debugging the failing test quicker / easier.

## Always test passed in arguments as an array

When testing arguments that are passed into a function for a unit test, always test them as an array like this:

```ts
expect(params.someMethod.getCall(0).args).toEqual([true, "test", 123]);
```

To test the same thing using each argument, you would have to do:

```ts
expect(params.someMethod.getCall(0).args.count).toBe(3);
expect(params.someMethod.getCall(0).args[0]).toBe(true);
expect(params.someMethod.getCall(0).args[1]).toBe("test");
expect(params.someMethod.getCall(0).args[2]).toBe(123);
```

Testing as an array allows for testing both the values and the number of arguments in one assertion instead of multiple assertions.

# All files should have a corresponding test file (except for type files)

Other than type files, all other files should have a corresponding test file. If a file does not need tests (which can happen), have a file like this:

```ts
export {};

describe('api utils', () => {
  test('needs no test', () => {
    // this code has no real custom logic that needs specific tests

    expect(1).toBe(1);
  });
});
```

This at least documents why there are no tests and someone is not wondering why some files don't have test files.

# Mocking complex types

**PATTERN FOR UNIT TESTING ONLY**

There are times where you need to mock a complex types (often with 3rd party libraries where we don't have control). Instead of trying to use complex types mockers that are not always easy to use, you can use the pattern of doing `as unknown as *`, so for example:

```ts
const complexMock = {needs: 'mock'} as unknown as ComplexType;
```

With this pattern you only mock what needs to be mocked for the test and even if `ComplexType` requires a 100+ properties to be defined, typescript will not complain.

# Anti-Patterns

## Avoid using `!` to force typescript to assume the value is not `null` / `undefined`

This is generally an anti-pattern. If a type has something as possible to be `null` or `undefined`, the code should properly check for that condition and do the correct thing (whether that is to return early, throw an exception, etc.).

### Initializing example

There might be times when you might have something that will always be defined except when initializing (like when a context might have a function that is generated by `useCallback` or something). In those case we want to avoid doing something like this:

```ts
// bad
export interface IAuthenticationContext {
  //...
  login: ILogin | null;
}

export const defaultAuthenticationContext: IAuthenticationContext = {
  //...
  login: null,
};
```

Doing something like this then requires other code referencing this to have to do this:

```ts
context.login!();
```

In cases like these, whenever possible, we should be doing something like this:

```ts
// good
export interface IAuthenticationContext {
  //...
  login: ILogin;
}

export const defaultAuthenticationContext: IAuthenticationContext = {
  //...
  login: () => {},
};
```

Then the calling code can just do:

```ts
context.login();
```

This might always be practical (method with really complex interfaces) or possible (3rd party code) but this should be the default way we handle this situation and if we can't, we add a comment about why.

# TO DO
- dark / light mode
- add `date-fns`
- complex form
  - try workaround for react <StrictMode> bug with using preview ref
  - dynamically loading data
- placeholder element while loading data
- auto open modal based on url query string or something
- 
