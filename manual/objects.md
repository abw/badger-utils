# Objects

Functions for working with objects.

## hash(source, options)

This function can be used to create a modified version of a plain old
Javascript object (aka "hash array" or "hash table", hence the name).

A source object can be passed as the first argument.  A new copy of the
object is returned.

```js
const copy = hash({ a: 10, b: 20 });  // => { a: 10, b: 20 }
```

An array can be passed.  This is passed to the
[splitHash()](manual/text.html#splithash-value--set-true--hash----) function which
turns it into a hash array.  The elements of the array will be the keys of the
returned objects with the values set to `true`.

```js
const copy = hash(['a', 'b']);  // => { a: true, b: true }
```

A string can be passed containing words separated by commas and/or spaces.
The string is split into an array of words and then converted to an object
as above.

```js
const copy1 = hash('a b');    // => { a: true, b: true }
const copy2 = hash('a,b');    // => { a: true, b: true }
const copy3 = hash('a, b');   // => { a: true, b: true }
```

A second argument can be passed as an object containing modification
functions.

The `include` option can be a function used to specify which items you want
to include in the output object.  It is passed a `key`, `value`, the `input`
object and `output` object.  It should return `true` to include the entry
in the output object, or false to exclude it.

```js
const copy = hash(
  { a: 10, b: 20, c: 30 },
  { include: k => k === 'a' }   // only include the 'a' key
);                              // => { a: 10 }
```

As well as specifying `include` as a function, you can use any of the
selection criteria supported by the
[selector()](manual/select.html#selector-spec-) function.
For example, you can specify an object containing the keys you want to accept.

```js
const copy = hash(
  { a: 10, b: 20, c: 30 },
  { include: { a: true, b: true } } // include the 'a' and 'b' keys
);                                  // => { a: 10, b: 20 }
```

Or an array:

```js
const copy = hash(
  { a: 10, b: 20, c: 30 },
  { include: ['a', 'b'] }
);
```

Or a string of keys delimited by whitespace and/or commas:

```js
const copy = hash(
  { a: 10, b: 20, c: 30 },
  { include: 'a b' }
);
```

Or a regular expression:

```js
const copy = hash(
  { a: 10, b: 20, c: 30 },
  { include: /^a|b$/ }
);
```

The `exclude` option works the same way, but should return `true` to exclude
the entry and `false` to include it.

```js
const copy = hash(
  { a: 10, b: 20, c: 30 },
  { exclude: k => k === 'a' }   // exclude the 'a' key
);                              // => { b: 20, c: 30 }
```

It can also be specified as an object, array, string or regular expression.

```js
const copy = hash(
  { a: 10, b: 20, c: 30 },
  { exclude: { a: true } }
);
```

The `key` option allows you to modify the keys of the object.  It should be
a function that will be passed the same arguments as for `include` and
`exclude`.  It should return the (potentially) modified key.

```js
const copy = hash(
  { a: 10, b: 20, c: 30 },
  { key: k => k.toUpperCase() } // convert keys to upper case
);                              // => { A: 10, B: 20, C: 30 }
```

The `value` option allows you to modify the value of the object.  It should
be a function like the others, but **be warned** that the order of the
first two arguments is reversed: (`value`, `key`, `input`, `output`).
This is to accommodate the usual case where you're only interested in
modifying the value.

```js
const copy = hash(
  { a: 10, b: 20, c: 30 },
  { value: v => v + 1 }         // add 1 to each value
);                              // => { A: 11, B: 21, C: 31 }
```

These function are applied in the order listed above: `include`, `exclude`,
`key` and `value`.  In all cases you can modify the `output` object, e.g.
by adding new values, but you should not modify the `input` object.

## objMap(obj, fn)

Applies a function to each value of an object and returns a new object.

```js
objMap(
    { a: 'alpha', b: 'bravo' },
    v => v.toUpperCase()
)
// => { a: 'ALPHA', b: 'BRAVO' }
```

## remove(object, key)

Removes an item from an object and returns the corresponding value.

```js
let source  = { a: 'alpha', b: 'bravo', c: 'charlie' };
let removed = remove(source, 'a');
// source  = { b: 'bravo', c: 'charlie' }
// removed = 'alpha'
```

## extract(object, keys, options)

Extracts a subset of the keys and values from an object and returns a new object.

The keys to extract can be specified in a number of ways.  They can be the keys
in an object that have a corresponding true value.

```js
extract(
  { a: 'alpha', b: 'bravo', c: 'charlie', d: 'delta', e: 'echo' };
  { a: true, c: true, e: true }
)
// => { a: 'alpha', c: 'charlie', e: 'echo' }
```

The keys can also be specified as an array.

```js
extract(
  { a: 'alpha', b: 'bravo', c: 'charlie', d: 'delta', e: 'echo' };
  ['a', 'c', 'e']
)
// => { a: 'alpha', c: 'charlie', e: 'echo' }
```

If the keys are all simple word strings (e.g. don't contain any non-word characters
or spaces) then they can be specified as a string.

```js
extract(
  { a: 'alpha', b: 'bravo', c: 'charlie', d: 'delta', e: 'echo' };
  'a c e'
)
// => { a: 'alpha', c: 'charlie', e: 'echo' }
```

A regular expression can also be used.

```js
extract(
  { a: 'alpha', b: 'bravo', c: 'charlie', d: 'delta', e: 'echo' };
  /^[ace]$/
)
// => { a: 'alpha', c: 'charlie', e: 'echo' }
```

Or a function can be provided to select the items to extract.

```js
extract(
  { a: 'alpha', b: 'bravo', c: 'charlie', d: 'delta', e: 'echo' };
  key => key === 'a' || key === 'c' || key === 'e'
)
// => { a: 'alpha', c: 'charlie', e: 'echo' }
```

The third argument can be used to provide a set of options.  The first is
the `delete` option which can be set to `true` (default value is `false`)
to delete the items from the source object.

```js
let source = { a: 'alpha', b: 'bravo', c: 'charlie', d: 'delta', e: 'echo' };
let subset = extract(
  source,
  'a c e',
  { delete: true }
)
// source = { b: 'bravo', d: 'delta' }
// subset = { a: 'alpha', c: 'charlie', e: 'echo' }
```

The `key` option can be used to transform the keys that are extracted.
It should be a function that accepts the source key and returns the
modified key.

```js
let subset = extract(
  {
    DATABASE_USERNAME: 'badger',
    DATABASE_PASSWORD: 's3cr3t',
  },
  /^DATABASE_/,
  { key: key => key.replace(/^DATABASE_/, '').toLowerCase() }
)
// => { username: 'badger', password: 's3cr3t' }
```

The `value` option can be used to transform values that are extracted.
It should be a function that accepts the source value and returns the
modified value.

```js
extract(
  { a: 10, b: 20, c: 30 },
  'a b',
  { value: value => value * 2 }
)
// => { a: 20, b: 40 }
```

## keys(object)

An alias for `Object.keys` which returns an array of the object's own
enumerable string-keyed property names.

```js
keys(
  { a: 10, b: 20, c: 30 }
)
// => ['a', 'b', 'c']
```

## values(object)

An alias for `Object.values` which returns an array of the object's own
enumerable string-keyed property values.

```js
values(
  { a: 10, b: 20, c: 30 }
)
// => [10, 20, 30]
```

## entries(object)

An alias for `Object.entries` which returns an array of the object's own
enumerable string-keyed property key-value pairs.

```js
entries(
  { a: 10, b: 20, c: 30 }
)
// => [['a', 10], ['b', 20], ['c', 30]]
```
