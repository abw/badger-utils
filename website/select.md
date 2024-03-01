# Select

Function for selecting things.

## selector(spec) {#selector}

The `selector()` function can be used to create a function that will select
things based on a number of different specifications.  It is used in various
other utility functions including [`hash()`](objects#hash)
and [`extract()`](objects#extract).

```js
import { selector } from '@abw/badger-utils'
```

If passed an object it will return a selection function that will return
`true` for items that have a true-like value in the object or false otherwise.
It uses the `Boolean()` function to test for trueness.

```js
const select = selector({ foo: true, bar: 1, baz: false })

select('foo')       // true
select('bar')       // true
select('baz')       // false
select('qux')       // false
```

If passed an array it will convert the array to an object with each item
in the array being set to `true`.

```js
const select = selector(['foo', 'bar'])

select('foo')       // true
select('bar')       // true
select('baz')       // false
select('qux')       // false
```

If passed a string it will split it on whitespace and/or commas and create
an object as above.

```js
const select = selector('foo bar')  // or 'foo,bar', 'foo, bar'

select('foo')       // true
select('bar')       // true
select('baz')       // false
select('qux')       // false
```

If passed a regular expression it will return `true` for candidates that match it.

```js
const select = selector(/^foo|bar$/)

select('foo')       // true
select('bar')       // true
select('baz')       // false
select('qux')       // false
```

If passed a function then it simply returns the function unchanged.

```js
const select = selector( item => item === 'foo' || item === 'bar' )

select('foo')       // true
select('bar')       // true
select('baz')       // false
select('qux')       // false
```


