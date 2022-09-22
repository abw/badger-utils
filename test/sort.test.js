import test from 'ava';
import {
  stringField, numberField, integerField,
  stringSort, numberSort, integerSort
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
  'numberField({ pi: 3.14 }, "pi")',
  t => t.is(numberField({ pi: 3.14 }, "pi"), 3.14)
);
test(
  'numberField({ pi: "3.14" }, "pi")',
  t => t.is(numberField({ pi: "3.14" }, "pi"), 3.14)
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


