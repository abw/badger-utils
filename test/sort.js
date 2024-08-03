import test from './library/ava-vitest.js'
import {
  stringField, numberField, integerField, booleanField,
  stringSort, numberSort, integerSort, booleanSort,
  multiSort, descendingOrder
} from '../src/utils/sort.js'

test(
  'integerField({ a: 10 }, "a")',
  t => t.is(integerField({ a: 10 }, "a"), 10)
);
test(
  'integerField({ a: "10" }, "a")',
  t => t.is(integerField({ a: "10" }, "a"), 10)
);
test(
  'integerField({ a: "10" }, "b")',
  t => t.is(integerField({ a: "10" }, "b"), 0)
);

test(
  'numberField({ pi: 3.14 }, "pi")',
  t => t.is(numberField({ pi: 3.14 }, "pi"), 3.14)
);
test(
  'numberField({ pi: "3.14" }, "pi")',
  t => t.is(numberField({ pi: "3.14" }, "pi"), 3.14)
);
test(
  'numberField({ pi: "3.14" }, "e")',
  t => t.is(numberField({ pi: "3.14" }, "e"), 0)
);

test(
  'stringField({ pi: 3.14 }, "pi")',
  t => t.is(stringField({ pi: 3.14 }, "pi"), "3.14")
);
test(
  'stringField({ pi: "3.14" }, "pi")',
  t => t.is(stringField({ pi: "3.14" }, "pi"), "3.14")
);
test(
  'stringField({ pi: "3.14" }, "e")',
  t => t.is(stringField({ pi: "3.14" }, "e"), "")
);

test(
  'booleanField({ a: true, b: false }, "a")',
  t => t.is(booleanField({ a: true, b: false }, "a"), true)
);
test(
  'booleanField({ a: true, b: false }, "b")',
  t => t.is(booleanField({ a: true, b: false }, "b"), false)
);
test(
  'booleanField({ a: 1, b: 0 }, "a")',
  t => t.is(booleanField({ a: 1, b: 0 }, "a"), true)
);
test(
  'booleanField({ a: 1, b: 0 }, "b")',
  t => t.is(booleanField({ a: 1, b: 0 }, "b"), false)
);

test(
  'integerSort()',
  t => {
    const sortByAge = integerSort('age');
    const people = [
      { name: "Fred",   age: 18 },
      { name: "Shaggy", age: 17 },
      { name: "Daphne", age: 16 },
      { name: "Velma",  age: 15 },
    ];
    const sorted = people.sort(sortByAge); // Velma, Daphne, Shaggy, Fred
    t.deepEqual(
      sorted,
      [
        { name: "Velma",  age: 15 },
        { name: "Daphne", age: 16 },
        { name: "Shaggy", age: 17 },
        { name: "Fred",   age: 18 },
      ]
    )
  }
);

test(
  'numberSort()',
  t => {
    const sortByValue = numberSort('value');
    const constants = [
      { name: "pi",   value: 3.14  },
      { name: "e",    value: 2.718 },
      { name: "phi",  value: 1.618 },
    ];
    const sorted = constants.sort(sortByValue);
    t.deepEqual(
      sorted,
      [
        { name: "phi",  value: 1.618 },
        { name: "e",    value: 2.718 },
        { name: "pi",   value: 3.14  },
      ]
    )
  }
);

test(
  'stringSort()',
  t => {
    const sortByName = stringSort('name');
    const constants = [
      { name: "pi",   value: 3.14  },
      { name: "e",    value: 2.718 },
      { name: "phi",  value: 1.618 },
    ];
    const sorted = constants.sort(sortByName);
    t.deepEqual(
      sorted,
      [
        { name: "e",    value: 2.718 },
        { name: "phi",  value: 1.618 },
        { name: "pi",   value: 3.14  },
      ]
    )
  }
);

test(
  'booleanSort()',
  t => {
    const sortByTruth = booleanSort('truth');
    const truths = [
      { name: "yes",   truth: 1 },
      { name: "no",    truth: 0 },
    ];
    const sorted = truths.sort(sortByTruth);
    t.deepEqual(
      sorted,
      [
        { name: "no",    truth: 0 },
        { name: "yes",   truth: 1 },
      ]
    )
  }
);

test(
  'multiSort() strings',
  t => {
    const people = [
      { forename: "John", surname: "Smith" },
      { forename: "Jack", surname: "Smith" },
      { forename: "John", surname: "Jones" },
    ];
    const sorted = people.sort(multiSort('surname forename'));
    t.deepEqual(
      sorted,
      [
        { forename: "John", surname: "Jones" },
        { forename: "Jack", surname: "Smith" },
        { forename: "John", surname: "Smith" },
      ]
    )
  }
);

test(
  'multiSort() with types and order',
  t => {
    const people = [
      { forename: "John", surname: "Smith", age: 28 },
      { forename: "Jack", surname: "Smith", age: 30 },
      { forename: "John", surname: "Smith", age: 25 },
      { forename: "John", surname: "Jones", age: 32 },
    ];
    const sorted = people.sort(multiSort('surname:string forename:string:asc age:integer:desc'));
    t.deepEqual(
      sorted,
      [
        { forename: "John", surname: "Jones", age: 32 },
        { forename: "Jack", surname: "Smith", age: 30 },
        { forename: "John", surname: "Smith", age: 28 },
        { forename: "John", surname: "Smith", age: 25 },
      ]
    )
  }
);

test(
  'multiSort() with abbreviated types and order',
  t => {
    const people = [
      { forename: "John", surname: "Smith", age: 28 },
      { forename: "Jack", surname: "Smith", age: 30 },
      { forename: "John", surname: "Smith", age: 25 },
      { forename: "John", surname: "Jones", age: 32 },
    ];
    const sorted = people.sort(multiSort('surname:str forename:str:asc age:int:desc'));
    t.deepEqual(
      sorted,
      [
        { forename: "John", surname: "Jones", age: 32 },
        { forename: "Jack", surname: "Smith", age: 30 },
        { forename: "John", surname: "Smith", age: 28 },
        { forename: "John", surname: "Smith", age: 25 },
      ]
    )
  }
);

test(
  'multiSort() with booleans and order',
  t => {
    const people = [
      { forename: "John", surname: "Smith", age: 29, premium: true  },
      { forename: "Jack", surname: "Smith", age: 30, premium: true  },
      { forename: "John", surname: "Smith", age: 25, premium: false },
      { forename: "John", surname: "Smith", age: 28, premium: true },
      { forename: "John", surname: "Jones", age: 32, premium: false },
    ];
    const sorted = people.sort(multiSort('premium:bool:desc age:int surname:str forename:str'));
    t.deepEqual(
      sorted,
      [
        { forename: "John", surname: "Smith", age: 28, premium: true },
        { forename: "John", surname: "Smith", age: 29, premium: true },
        { forename: "Jack", surname: "Smith", age: 30, premium: true },
        { forename: "John", surname: "Smith", age: 25, premium: false },
        { forename: "John", surname: "Jones", age: 32, premium: false },
      ]
    )
  }
);

test(
  'multiSort() with functions',
  t => {
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
    t.deepEqual(
      sorted,
      [
        { forename: "John", surname: "Jones", age: 32 },
        { forename: "Jack", surname: "Smith", age: 30 },
        { forename: "John", surname: "Smith", age: 28 },
        { forename: "John", surname: "Smith", age: 25 },
      ]
    )
  }
);


test(
  'multiSort() invalid type',
  t => t.throws(
    () => multiSort('surname:strong'),
    {
      message: 'Invalid sort type "strong" in sort field: surname:strong'
    }
  )
);

test(
  'multiSort() invalid order',
  t => t.throws(
    () => multiSort('surname:str:des'),
    {
      message: 'Invalid sort order "des" in sort field: surname:str:des'
    }
  )
);

test(
  'multiSort() invalid sort field 99',
  t => t.throws(
    () => multiSort([99]),
    {
      message: 'Invalid sort field: 99'
    }
  )
);
test(
  'multiSort() invalid sort field -',
  t => t.throws(
    () => multiSort('-'),
    {
      message: 'Invalid sort field: -'
    }
  )
);
