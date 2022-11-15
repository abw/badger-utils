# Errors

Functions for throwing errors.

## fail(message)

This function throws an error with a message constructed by
concatenating all arguments passed to it.

```js
fail('Failed to ', 'insert', ' record');
// -> throws error with message 'Failed to insert record'
```

The benefit of using this function over `throw` is that it can
be used in an expression.

```js
const x = params.x || fail('No x specified');
```

## failMsg(message, data)

This function throws an error with a message generated from
expanding a message template using the
[format()](manual/text.html#format-message--data-) function.

```js
failMsg('Failed to <action> record', { action: 'insert' })
// -> throws error with message 'Failed to insert record'
```

## rethrow(error)

Function to rethrow an error. The benefit of using this function over `throw` is that it can be used in an expression.

