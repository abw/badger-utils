# Miscellaneous

Miscellaneous functions.

## doNothing()

This function does nothing.  Nothing at all.  None more functionality.

It can be used when you want to explicitly set a handler which does
nothing.

```js
// debugging flag
const DEBUGGING = false;

// debug function which calls console.log() or does nothing,
// depending on the value of DEBUGGING
const debug = DEBUGGING
  ? msg => console.log(msg)
  : doNothing

// call the debug function
debug("Hello World!")
```

## defaultLocale()

Returns the default locale.
