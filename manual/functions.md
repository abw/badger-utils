# Functions

Functions for working with functions.

## maybeFunction(fn, args)

This function can be used to call a function or return a value that isn't
a function.

It's a useful shortcut if you have a variable (for example, a configuration
option) which can contain a static value or a function that returns a value.

In this example, `notfn` is a static value and `maybeFunction()` will simply
return it.

```js
const notfn  = 'Hello World!'
const result = maybeFunction(notfn);  // => 'Hello World!'
```

In this example, `isfn` is a function that returns a value.  Now
`maybeFunction()` will call the function and return the value that it returns.

```js
const isfn   = () => 'Hello World!'
const result = maybeFunction(isfn);  // => 'Hello World!'
```

Any additional arguments passed to `maybeFunction()` will be forwarded to the
function.

```js
const add    = (a, b) => a + b
const result = maybeFunction(add, 10, 20);  // => 30
```
