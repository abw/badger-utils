# Miscellaneous

Miscellaneous functions.

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

## defaultLocale() {#defaultLocale}

Returns the default locale.
