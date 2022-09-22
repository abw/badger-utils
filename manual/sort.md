# Sort

Various utility functions for sorting objects.

## stringSort(field)

Function to return a function that will sort an array of objects by
comparing the `field` property of each and comparing as lower case strings.

```js
const constants = [
  { name: "pi",   value: 3.14  },
  { name: "e",    value: 2.718 },
  { name: "phi",  value: 1.618 },
];
const sortByName = stringSort('name');
const sorted = constants.sort(sortByName);
// Returns: [
//   { name: "e",    value: 2.718 },
//   { name: "phi",  value: 1.618 },
//   { name: "pi",   value: 3.14  },
// ]
```

## numberSort(field)

Function to return a function that will sort an array of objects by
comparing the `field` property of each and comparing as floating point
numbers.

```js
const constants = [
  { name: "pi",   value: 3.14  },
  { name: "e",    value: 2.718 },
  { name: "phi",  value: 1.618 },
];
const sortByValue = numberSort('value');
const sorted = constants.sort(sortByValue);
// Returns: [
//   { name: "phi",  value: 1.618 },
//   { name: "e",    value: 2.718 },
//   { name: "pi",   value: 3.14  },
// ]
```

## integerSort(field)

Function to return a function that will sort an array of objects by
comparing the `field` property of each and comparing as integers.

```js
const people = [
  { name: "Fred",   age: 18 },
  { name: "Fred",   age: 18 },
  { name: "Shaggy", age: 17 },
  { name: "Daphne", age: 16 },
  { name: "Velma",  age: 15 },
];
const sortByAge = integerSort('age');
const sorted = people.sort(sortByAge);
// Returns: [
//   { name: "Velma",  age: 15 },
//   { name: "Daphne", age: 16 },
//   { name: "Shaggy", age: 17 },
//   { name: "Fred",   age: 18 },
// ]
```

## stringField(obj,field)

Helper function used by `stringSort()` to extract a field from an object
and coerce to a string.

```js
const a = stringField({ a: "ten" }, "a");     // "ten"
const a = stringField({ a: "10"  }, "a");     // "10"
```

## numberField(obj,field)

Helper function used by `numberSort()` to extract a field from an object
and coerce to a floating point number.

```js
const a = numberField({ pi: 3.14  }, "pi");     // 3.14
const a = numberField({ a: "3.14" }, "pi");     // 3.14
```

## integerField(obj,field)

Helper function used by `integerSort()` to extract a field from an object
and coerce to an integer.

```js
const a = integerField({ a:  10  }, "a");     // 10
const a = integerField({ a: "10" }, "a");     // 10
```
