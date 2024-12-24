# Sort

Functions for sorting arrays of objects.

## stringSort(field) {#stringSort}

Factory function which returns a function that will sort an array of objects
by comparing the `field` property of each object as lower case strings.

For example, consider this array of object that we want to sort.

```js
const constants = [
  { name: "pi",   value: 3.14  },
  { name: "e",    value: 2.718 },
  { name: "phi",  value: 1.618 },
];
```

The `stringSort()` function can be used to generate a function that will
sort the array using the `name` property of each object.

```js
const sortByName = stringSort('name');
```

We can then pass that to the array `sort()` function and our work here
is done.

```js
const sorted = constants.sort(sortByName);
// Returns: [
//   { name: "e",    value: 2.718 },
//   { name: "phi",  value: 1.618 },
//   { name: "pi",   value: 3.14  },
// ]
```

You can pass a function to the `stringSort()` function to access nested data.
For example, consider this contrived example where the value we want to
sort on isn't a simple `name` field, but instead is the nested `greek.letter`.

```js
const constants = [
  { greek: { letter: "pi"  }, value: 3.14  },
  { greek: { letter: "e"   }, value: 2.718 },
  { greek: { letter: "phi" }, value: 1.618 },
];
```
Here we can pass a function to the `stringSort` function which receives
a row of data and returns the corresponding value.

```js
const sortByGreekLetter = stringSort( row => row.greek.letter );
```

This function will then sort the rows correctly:

```js
const sorted = constants.sort(sortByGreekLetter);
// Returns: [
//   { greek: { letter: "e"   }, value: 2.718 },
//   { greek: { letter: "pi"  }, value: 3.14  },
//   { greek: { letter: "phi" }, value: 1.618 },
// ]
```

## numberSort(field) {#numberSort}

Factory function which returns a function that will sort an array of objects
by comparing the `field` property of each as floating point numbers.

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

You can also pass a function to the `numberSort()` function to access
nested data.

```js
const constants = [
  { name: "pi",   approximate: { value: 3.14  } },
  { name: "e",    approximate: { value: 2.718 } },
  { name: "phi",  approximate: { value: 1.618 } },
];
const sortByApproximateValue = numberSort( row => row.approximate.value );
const sorted = constants.sort(sortByApproximateValue);
// Returns: [
//   { name: "phi",  approximate: { value: 1.618 } },
//   { name: "e",    approximate: { value: 2.718 } },
//   { name: "pi",   approximate: { value: 3.14  } },
// ]
```

## integerSort(field) {#integerSort}

Factory function which returns a function that will sort an array of objects
by comparing the `field` property of each as integers.

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

As with the other sorting functions, you can pass a function to access
nested data.

```js
const people = [
  { name: 'Fred',   dob: { year: 1967 } },
  { name: 'Shaggy', dob: { year: 1965 } },
  { name: 'Daphne', dob: { year: 1966 } },
  { name: 'Velma',  dob: { year: 1968 } },
];
const sortByYearOfBirth = integerSort( row => row.dob.year );
const sorted = people.sort(sortByYearOfBirth);
// Returns: [
//   { name: 'Shaggy', dob: { year: 1965 } },
//   { name: 'Daphne', dob: { year: 1966 } },
//   { name: 'Fred',   dob: { year: 1967 } },
//   { name: 'Velma',  dob: { year: 1968 } },
// ]
```

## booleanSort(field) {#booleanSort}

Factory function which returns a function that will sort an array of objects
by comparing the `field` property of each as booleans.  False values are
sorted before true values.

```js
const people = [
  { name: "Scooby", animal: true },
  { name: "Shaggy", animal: false },
];
const sortByAnimal = booleanSort('animal');
const sorted = people.sort(sortByAnimal);
// Returns: [
//   { name: "Shaggy", animal: false },
//   { name: "Scooby", animal: true },
// ]
```

This also supports the passing of a function to access nested data.

```js
const people = [
  { name: "Scooby", is: { an: { animal: true  } } },
  { name: "Shaggy", is: { an: { animal: false } } },
];
const sortByAnimal = booleanSort( row => row.is.an.animal );
const sorted = people.sort(sortByAnimal);
// Returns: [
//   { name: "Shaggy", is: { an: { animal: false } } },
//   { name: "Scooby", is: { an: { animal: true  } } },
// ]
```


## multiSort(fields) {#multiSort}

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
`number`, `integer` and `boolean`, or their abbreviations `str`, `num`,
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


## stringField(obj,field) {#stringField}

Helper function used by [`stringSort()`](#stringSort) to extract a field
from an object and coerce it to a string.  It accepts either a string as
the field name or a function to return the field value.

```js
const a = stringField({ a: "ten" }, "a");                 // "ten"
const a = stringField({ a: "10"  }, "a");                 // "10"
const a = stringField({ a: { b: 10 } }, row => row.a.b);  // "10"
```

## numberField(obj,field) {#numberField}

Helper function used by [`numberSort()`](#numberSort) to extract a field
from an object and coerce it to a floating point number.  It accepts either
a string as the field name or a function to return the field value.

```js
const a = numberField({ pi: 3.14  }, "pi");                   // 3.14
const a = numberField({ a: "3.14" }, "pi");                   // 3.14
const a = numberField({ a: { b: "3.14" } }, row => row.a.b);  // 3.14
```

## integerField(obj,field) {#integerField}

Helper function used by [`integerSort()`](#integerSort) to extract a field
from an object and coerce it to an integer.  It accepts either
a string as the field name or a function to return the field value.

```js
const a = integerField({ a:  10  }, "a");                   // 10
const a = integerField({ a: "10" }, "a");                   // 10
const a = integerField({ a: { b: "10" } }, row => row.a.b); // 10
```

## booleanField(obj,field) {#booleanField}

Helper function used by [`booleanSort()`](#booleanSort) to extract a field
from an object and coerce it to a boolean.  It accepts either
a string as the field name or a function to return the field value.

```js
const a = booleanField({ a: true }, "a");                 // true
const a = booleanField({ a: 1    }, "a");                 // true
const a = booleanField({ a: { b: 1 } }, row => row.a.b);  // true
```

## descendingOrder(sortFn) {#descendingOrder}

Helper function used by [`multiSort()`](#multiSort) to convert a sort function
that sorts by ascending order into one that sorts by descending order.

```js
const ageAsc  = integerSort('age');
const ageDesc = descendingOrder(ageAsc);
```

## ascendingOrder(sortFn) {#ascendingOrder}

Helper function used by [`multiSort()`](#multiSort) provided for completeness.
Given that sort functions sort in ascending order by default, this function
simply returns the function passed to it.

```js
const ageAsc1 = integerSort('age');
const ageAsc2 = ascendingOrder(ageAsc1);    // returns ageAsc1
```
