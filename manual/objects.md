# Objects

Various utility functions for working with objects.

## objMap(obj, fn)

Applies a function to each value of an object and returns a new object.

```js
objMap(
    { a: 'alpha', b: 'bravo' },
    v => v.toUpperCase()
)
// => { a: 'ALPHA', b: 'BRAVO' }
```

## extract(object, keys, del=true)

Extracts a subset of the keys and values from an object and returns a new object.
By default the keys and corresponding values will be deleted from the source object.
Set the third argument, `del`, to `false` to suppress this.

The keys to extract can be specified in a number of ways.  They can be the keys
in an object that have a corresponding true value.

```js
let source = { a: 'alpha', b: 'bravo', c: 'charlie', d: 'delta', e: 'echo' };
let subset = extract(
  source,
  { a: true, c: true, e: true }
)
// source = { b: 'bravo', d: 'delta' }
// subset = { a: 'alpha', c: 'charlie', e: 'echo' }
```

The `keys` can also be specified as an array.

```js
let source = { a: 'alpha', b: 'bravo', c: 'charlie', d: 'delta', e: 'echo' };
let subset = extract(
  source,
  ['a', 'c', 'e']
)
// source = { b: 'bravo', d: 'delta' }
// subset = { a: 'alpha', c: 'charlie', e: 'echo' }
```

If the keys are all simple word strings (e.g. don't contain any non-word characters
or spaces) then they can be specified as a string.

```js
let source = { a: 'alpha', b: 'bravo', c: 'charlie', d: 'delta', e: 'echo' };
let subset = extract(
  source,
  'a c e'
)
// source = { b: 'bravo', d: 'delta' }
// subset = { a: 'alpha', c: 'charlie', e: 'echo' }
```

A regular expression can also be used.

```js
let source = { a: 'alpha', b: 'bravo', c: 'charlie', d: 'delta', e: 'echo' };
let subset = extract(
  source,
  /^[ace]$/
)
// source = { b: 'bravo', d: 'delta' }
// subset = { a: 'alpha', c: 'charlie', e: 'echo' }
```

Or a function can be provided to select the items to extract.

```js
let source = { a: 'alpha', b: 'bravo', c: 'charlie', d: 'delta', e: 'echo' };
let subset = extract(
  source,
  key => key === 'a' || key === 'c' || key === 'e'
)
// source = { b: 'bravo', d: 'delta' }
// subset = { a: 'alpha', c: 'charlie', e: 'echo' }
```

## remove(object, key)

Removes an item from an object and returns the corresponding value.

```js
let source  = { a: 'alpha', b: 'bravo', c: 'charlie' };
let removed = remove(source, 'a');
// source  = { b: 'bravo', c: 'charlie' }
// removed = 'alpha'
```

