# Assertions

## isBoolean(value)

Determines if a value is a boolean. Returns `true` if the value is
`true` or `false`.  Otherwise it returns false.

```js
isBoolean(true);         // true
isBoolean(false);        // true
isBoolean(1);            // false
isBoolean(0);            // false
```

Values that can be coerced to boolean values (e.g. the numbers `0`
and `1`) are NOT considered booleans and the function will return
`false`.

## isString(value)

Determines if a value is a string.  Returns Boolean `true` or `false`.

```js
isString('Hello World'); // true
isString(42);            // false
```

## isNumber(value)

Determines if a value is a number.  Returns Boolean `true` or `false`.

```js
isNumber(42);      // true
isNumber(42.43);   // true
isNumber("42");    // false
```

## isInteger(value)

Determines if a value is an integer.  Returns Boolean `true` or `false`.

```js
isInteger(42);      // true
isInteger(42.0);    // true
isInteger(42.43);   // false
isInteger("42");    // false
```

Note that numbers with decimal parts that are zero (e.g. `42.0`) are considered
to be integers.

## isFloat(value)

Determines if a value is a floating point number.  Returns Boolean `true` or `false`.

```js
isFloat(42);      // false
isFloat(42.0);    // false
isFloat(42.43);   // true
isFloat("42");    // false
```

Note that numbers with decimal parts that are zero (e.g. `42.0`) are considered
to be integers and the function will return `false` in those cases.

## isArray(value)

Determines if a value is an array.  Returns Boolean `true` or `false`.

```js
isArray([42, 43]);  // true
isArray("42, 43");  // false
```

## isFunction(value)

Determines if a value is a function.  Returns Boolean `true` or `false`.

```js
isFunction( a => a + 1 );     // true
isFunction("badger badger");  // false
```

## isRegExp(value)

Determines if a value is a RegExp object.  Returns Boolean `true` or `false`.

```js
isRegExp(/badger/);         // true
isRegExp("badger badger");  // false
```

## isObject(value)

Determines if a value is an object.

Javascript's concept of an object is ambiguous because a number of
different data types are considered to be objects, including `Array`
and `null`.  This function will return `false` for arrays and null
values and only return `true` for values that are objects in the
more traditional sense: an instance of a class (e.g. `new Date()`)
or a data structure created with curly braces (e.g. `{ b: 'badger' }`).

Returns Boolean `true` or `false`.

```js
isObject(new Date());        // true
isObject({ b: 'badger' });   // true
isObject([10, 20]);          // false
isObject(null);              // false
```

## isUndefined(value)

Determines if a value has the `undefined` value.  Returns Boolean `true` or `false`.

Note that this does **not** include `null`.  Use [hasValue(value)](#hasValue) or
[noValue(value)](#noValue) to test for a value being `undefined` or `null`.

```js
isUndefined(undefined); // true
isUndefined(null);      // false
isUndefined(0);         // false
```

## isNull(value)

Determines if a value has the `null` value.  Returns Boolean `true` or `false`.

Note that this does **not** include `undefined` values.
Use [hasValue(value)](#hasvalue-value-) or [noValue(value)](#novalue-value-) to test for a value
being `undefined` or `null`.

```js
isNull(null);      // true
isNull(undefined); // false
isNull(0);         // false
```

## hasValue(value)

Determines if a value has a defined and non-null value.  Returns Boolean `true` or `false`.

Note that this is subtly different from Javascript's idea of truth.  This function
will return `true` if the value is a boolean `false` or the number `0`.

```js
hasValue(0);         // true
hasValue(false);     // true
hasValue(null);      // false
hasValue(undefined); // false
```

## noValue(value)

Determines if a value does not have a defined and non-null value.
It is the logical negation of [hasValue()](#hasvalue-value-)
Returns Boolean `true` or `false`.

```js
noValue(null);      // true
noValue(undefined); // true
noValue(0);         // true
noValue(false);     // true
```

## haveValue(...values)

Determines if all the values passed as arguments have defined and non-null value.
Returns Boolean `true` or `false`.

```js
haveValue(0, 1, 2);         // true
haveValue(0, 1, undefined); // false
```

## firstValue(...values)

Returns the first argument that has a defined and non-null value.

```js
firstValues(0, 1, 2);         // 0
firstValues(undefined, 1, 2); // 1
firstValues(null, 2, 3);      // 2
firstValues(false, 3, 4);     // false
```
