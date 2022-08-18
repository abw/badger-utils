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

## objSubset(obj, keys)

Extracts a subset of the keys and values from an object and returns a new object.

```js
objSubset(
    { a: 'alpha', b: 'bravo', c: 'charlie', d: 'delta', e: 'echo' },
    ['a', 'c', 'e']
)
// => { a: 'alpha', c: 'charlie', e: 'echo' }
```

If the keys are all simple word strings (e.g. don't contain any non-word characters
or spaces) then they can be specified as a string.

```js
objSubset(
    { a: 'alpha', b: 'bravo', c: 'charlie', d: 'delta', e: 'echo' },
    'a c e'
)
// => { a: 'alpha', c: 'charlie', e: 'echo' }
```

