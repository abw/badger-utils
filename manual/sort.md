# Sort

Functions for sorting objects.

## stringSort(field)

Function to return a function that will sort an array of objects by
comparing the `field` property of each object as lower case strings.

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
comparing the `field` property of each as floating point
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
comparing the `field` property of each as integers.

```js
const people = [
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

## booleanSort(field)

Function to return a function that will sort an array of objects by
comparing the `field` property of each as booleans.  True values are sorted
before false alues.

```js
const people = [
  { name: "Shaggy", animal: false },
  { name: "Scooby", animal: true },
];
const sortByAnimal = booleanSort('animal');
const sorted = people.sort(sortByAnimal);
// Returns: [
//   { name: "Scooby", animal: true },
//   { name: "Shaggy", animal: false },
// ]
```

## multiSort(fields)

This function can be used to compose a sorting function from a number
of other sorting functions.  For example, suppose you have an array of
objects that you want to sort by `surname` first, and if they have the
same surname, then by `forename`.

```js
const people = [
  { forename: "John", surname: "Smith" },
  { forename: "Jack", surname: "Smith" },
  { forename: "John", surname: "Jones" },
];
```

You can compose a sort function by passing an array of sort functions
to `multisort()`, like so:

```js
const sortByName = multiSort([
  stringSort('surname'),
  stringSort('forename')
]);
const sorted = people.sort(sortByName);
// Returns: [
//   { forename: "John", surname: "Jones" },
//   { forename: "Jack", surname: "Smith" },
//   { forename: "John", surname: "Smith" },
// ]
```

The shorthand form allows you to specify the field names as a
whitespace delimited string.  It will construct the sort function
from that specification.  If you don't specify otherwise (more on that
below), it will assume that they're string fields to be sorted in ascending
(alphabetical) order.

```js
// short form:
const sortByName = multiSort('surname forename');

// same as:
const sortByName = multiSort([
  stringSort('surname'),
  stringSort('forename')
]);
```

Here's a slightly more complex example where we want to sort by
`surname`, `forename` (both in ascending order) and `age` in
descending order (i.e. oldest first).  The `descendingOrder` wrapper
function can be used to convert an ascending order sort function into
one that sorts in descending order.

```js
const people = [
  { forename: "John", surname: "Smith", age: 28 },
  { forename: "Jack", surname: "Smith", age: 30 },
  { forename: "John", surname: "Smith", age: 25 },
  { forename: "John", surname: "Jones", age: 32 },
];
const sortByNameAndAge = multiSort([
  stringSort('surname'),
  stringSort('forename'),
  descendingOrder(integerSort('age'))
]);
const sorted = people.sort(sortByNameAndAge);
// Returns: [
//   { forename: "John", surname: "Jones", age: 32 },
//   { forename: "Jack", surname: "Smith", age: 30 },
//   { forename: "John", surname: "Smith", age: 28 },
//   { forename: "John", surname: "Smith", age: 25 },
// ]
```

You can also use the shorthand form here.  The field name,
optional field type and optional sort order should be joined
by colons.

```js
// short form:
const sortByName = multiSort('surname forename age:integer:desc');

// long form:
const sortByNameAndAge = multiSort([
  stringSort('surname'),
  stringSort('forename'),
  descendingOrder(integerSort('forename'))
]);
```

For the field types you can use the long names `string` (default),
`number`, `integer` and `boolan`, or their abbreviations `str`, `num`,
`int` and `bool`.

You can specify the sort order as `ascending` (default) or `descending`
if verbosity is your thing, or using the shorter `asc` and `desc` forms.

Here are some examples of the mappings from strings to functions to clarify.

| Short Form                 | Expansion                               |
|----------------------------|-----------------------------------------|
| surname                    | stringSort('surname')                   |
| surname:str                | stringSort('surname')                   |
| surname:string             | stringSort('surname')                   |
| surname:str:desc           | descendingOrder(stringSort('surname'))  |
| surname:string:descending  | descendingOrder(stringSort('surname'))  |
| age:int                    | integerSort('age')                      |
| age:integer                | integerSort('age')                      |
| age:int:desc               | descendingOrder(integerSort('age'))     |
| age:integer:descending     | descendingOrder(integerSort('age'))     |
| price:num                  | numberSort('age')                       |
| price:number               | numberSort('price')                     |
| price:num:desc             | descendingOrder(numberSort('price'))    |
| price:number:descending    | descendingOrder(numberSort('price'))    |
| premium:bool:desc          | descendingOrder(booleanSort('premium')) |


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

## booleanField(obj,field)

Helper function used by `booleanSort()` to extract a field from an object
and coerce to a boolean.

```js
const a = booleanField({ a: true }, "a");     // true
const a = booleanField({ a: 1    }, "a");     // true
```

## descendingOrder(sortFn)

Helper function used by `multiSort()` to convert a sort function that sorts
by ascending order into one that sorts by descending order.

```js
const ageAsc  = integerSort('age');
const ageDesc = descendingOrder(ageAsc);
```

## ascendingOrder(sortFn)

Helper function used by `multiSort()` provided for completeness.  Given that
sort functions sort in ascending order by default, this function simply returns
the function passed to it.

```js
const ageAsc1 = integerSort('age');
const ageAsc2 = ascendingOrder(ageAsc1);    // returns ageAsc1
```
