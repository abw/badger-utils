# Functions

Functions for working with functions.

## maybeFunction(fn, args) {#maybeFunction}

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

## doNothing() {#doNothing}

This function does nothing.  Nothing at all.  If you're wondering how much
less functionality this function could have, the answer is none, none less
functionality.

That said, it can be quite useful as a shortcut.  For example, you might want
to define a `debug()` function which prints some output using `console.log`.

```js
const debug = msg => console.log(msg)
debug('Hello World!')
```

Some time later, when you're confident that your code works, you decide you
don't need debugging statements any more.  You could delete them, or comment
them out.  Or you could add a `DEBUGGING` flag so that you can enable them
again at a later date, should you need to.

```js
// debugging flag
const DEBUGGING = false;
```

You could go through your code and change every `debug()` call to this:

```js
if (DEBUGGING) {
  debug('Hello World!')
}
```

Or you could write your `debug()` function like this:

```js
function debug(msg) {
  if (DEBUGGING) {
    console.log(msg)
  }
}
```

Alternately, you can define your `debug()` function like so:

```js
const debug = DEBUGGING
  ? msg => console.log(msg)
  : doNothing
```

When the `DEBUGGING` flag is false, `debug()` will be mapped to `doNothing()`,
which does nothing:

```js
debug("Hello World!")   // nothing
```

Another common use is as the default option for a callback function.

```js
function doSomething(someData, callback=doNothing) {
  // do something here then call the callback
  callback(someData)
}
```

If the `callback` argument isn't passed to the function then calling it will
do nothing.  It saves a few lines of code over writing it like this:

```js
function doSomething(someData, callback) {
  // do something here then call the callback
  if (callback) {
    callback(someData)
  }
}
```

You might think that's just being lazy, and you would be right.  I'm lazy.

## identity(value) {#identity}

The identity function simply returns its first argument unmodified.

It's another trivial function that looks pointless at first glance but can
be convenient to have available for some specialised cases.  In particular
it can be used as the a default for an option that *might* be provided to
modify some other value, but otherwise should do nothing.

Consider this example where we have a function which compares two values.
The third optional argument, `coerce`, defaults to the `identity` function.
In this case it does nothing and the end effect is the same as comparing
`a` to `b` directly, e.g. `a === b`.

```js
function areEqual(a, b, coerce=identity) {
  return coerce(a) === coerce(b)
}
areEqual(true, true) // true
areEqual(true, 1)    // false
```

However we can pass in a different function for the `coerce` option (e.g.
`Boolean`) to coerce the values.  In this case `1` will be coerced to `true`
and the function will return `true`

```js
areEqual(true, 1, Boolean)  // true
```

The alternative would require an additional test to see if the `coerce`
option is defined.  It's admittedly not much more code and it may even be
slightly faster (for the computer) doing it this way.

```js
function areEqualTheLongerWay(a, b, coerce) {
  return coerce
    ? coerce(a) === coerce(b)
    : a === b
}
```

