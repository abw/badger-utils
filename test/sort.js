import test from './library/ava-vitest.js'
import {
  getField, stringField, numberField, integerField, booleanField,
  stringSort, numberSort, integerSort, booleanSort,
  multiSort, descendingOrder
} from '../src/index'

test(
  'field({ a: { b: { c: 10 } } }, "a.b.c")',
  t => t.is(getField({ a: { b: { c: '10' } } }, data => data.a.b.c), '10')
)


test(
  'integerField({ a: 10 }, "a")',
  t => t.is(integerField({ a: 10 }, 'a'), 10)
)
test(
  'integerField({ a: "10" }, "a")',
  t => t.is(integerField({ a: '10' }, 'a'), 10)
)
test(
  'integerField({ a: "10" }, "b")',
  t => t.is(integerField({ a: '10' }, 'b'), 0)
)
test(
  'integerField({ a: { b: { c: 10 } } }, "a.b.c")',
  t => t.is(integerField({ a: { b: { c: '10' } } }, data => data.a.b.c), 10)
)


test(
  'numberField({ pi: 3.14 }, "pi")',
  t => t.is(numberField({ pi: 3.14 }, 'pi'), 3.14)
)
test(
  'numberField({ pi: "3.14" }, "pi")',
  t => t.is(numberField({ pi: '3.14' }, 'pi'), 3.14)
)
test(
  'numberField({ pi: "3.14" }, "e")',
  t => t.is(numberField({ pi: '3.14' }, 'e'), 0)
)
test(
  'numberField({ a: { b: { c: "3.14" } } }, "a.b.c")',
  t => t.is(numberField({ a: { b: { c: '3.14' } } }, data => data.a.b.c), 3.14)
)

test(
  'stringField({ pi: 3.14 }, "pi")',
  t => t.is(stringField({ pi: 3.14 }, 'pi'), '3.14')
)
test(
  'stringField({ pi: "3.14" }, "pi")',
  t => t.is(stringField({ pi: '3.14' }, 'pi'), '3.14')
)
test(
  'stringField({ pi: "3.14" }, "e")',
  t => t.is(stringField({ pi: '3.14' }, 'e'), '')
)
test(
  'stringField({ a: { b: { c: "3.14" } } }, "a.b.c")',
  t => t.is(stringField({ a: { b: { c: '3.14' } } }, data => data.a.b.c), '3.14')
)

test(
  'booleanField({ a: true, b: false }, "a")',
  t => t.is(booleanField({ a: true, b: false }, 'a'), true)
)
test(
  'booleanField({ a: true, b: false }, "b")',
  t => t.is(booleanField({ a: true, b: false }, 'b'), false)
)
test(
  'booleanField({ a: 1, b: 0 }, "a")',
  t => t.is(booleanField({ a: 1, b: 0 }, 'a'), true)
)
test(
  'booleanField({ a: 1, b: 0 }, "b")',
  t => t.is(booleanField({ a: 1, b: 0 }, 'b'), false)
)
test(
  'booleanField({ a: { b: { c: true } } }, "a.b.c")',
  t => t.is(booleanField({ a: { b: { c: true } } }, data => data.a.b.c), true)
)

test(
  'integerSort()',
  t => {
    const sortByAge = integerSort('age')
    const people = [
      { name: 'Fred',   age: 18 },
      { name: 'Shaggy', age: 17 },
      { name: 'Daphne', age: 16 },
      { name: 'Velma',  age: 15 },
    ]
    const sorted = people.sort(sortByAge) // Velma, Daphne, Shaggy, Fred
    t.deepEqual(
      sorted,
      [
        { name: 'Velma',  age: 15 },
        { name: 'Daphne', age: 16 },
        { name: 'Shaggy', age: 17 },
        { name: 'Fred',   age: 18 },
      ]
    )
  }
)
test(
  'integerSort() with nested data and function',
  t => {
    const sortByAge = integerSort( person => person.dob.year )
    const people = [
      { name: 'Fred',   dob: { year: 1967 } },
      { name: 'Shaggy', dob: { year: 1965 } },
      { name: 'Daphne', dob: { year: 1966 } },
      { name: 'Velma',  dob: { year: 1968 } },
    ]
    const sorted = people.sort(sortByAge) // Shaggy, Daphne, Fred, Velma
    t.deepEqual(
      sorted,
      [
        { name: 'Shaggy', dob: { year: 1965 } },
        { name: 'Daphne', dob: { year: 1966 } },
        { name: 'Fred',   dob: { year: 1967 } },
        { name: 'Velma',  dob: { year: 1968 } },
      ]
    )
  }
)

test(
  'numberSort()',
  t => {
    const sortByValue = numberSort('value')
    const constants = [
      { name: 'pi',   value: 3.14  },
      { name: 'e',    value: 2.718 },
      { name: 'phi',  value: 1.618 },
    ]
    const sorted = constants.sort(sortByValue)
    t.deepEqual(
      sorted,
      [
        { name: 'phi',  value: 1.618 },
        { name: 'e',    value: 2.718 },
        { name: 'pi',   value: 3.14  },
      ]
    )
  }
)

test(
  'numberSort() with nested data and function',
  t => {
    const sortByValue = numberSort( row => row.approx.value )
    const constants = [
      { name: 'pi',   approx: { value: 3.14  } },
      { name: 'e',    approx: { value: 2.718 } },
      { name: 'phi',  approx: { value: 1.618 } },
    ]
    const sorted = constants.sort(sortByValue)
    t.deepEqual(
      sorted,
      [
        { name: 'phi',  approx: { value: 1.618 } },
        { name: 'e',    approx: { value: 2.718 } },
        { name: 'pi',   approx: { value: 3.14  } },
      ]
    )
  }
)

test(
  'stringSort()',
  t => {
    const sortByName = stringSort('name')
    const constants = [
      { name: 'pi',   value: 3.14  },
      { name: 'e',    value: 2.718 },
      { name: 'phi',  value: 1.618 },
    ]
    const sorted = constants.sort(sortByName)
    t.deepEqual(
      sorted,
      [
        { name: 'e',    value: 2.718 },
        { name: 'phi',  value: 1.618 },
        { name: 'pi',   value: 3.14  },
      ]
    )
  }
)

test(
  'stringSort() with nested data and function',
  t => {
    const sortByName = stringSort( row => row.greek.letter )
    const constants = [
      { greek: { letter: 'pi'  }, value: 3.14  },
      { greek: { letter: 'e'   }, value: 2.718 },
      { greek: { letter: 'phi' }, value: 1.618 },
    ]
    const sorted = constants.sort(sortByName)
    t.deepEqual(
      sorted,
      [
        { greek: { letter: 'e'   }, value: 2.718 },
        { greek: { letter: 'phi' }, value: 1.618 },
        { greek: { letter: 'pi'  }, value: 3.14  },
      ]
    )
  }
)

test(
  'booleanSort()',
  t => {
    const sortByTruth = booleanSort('truth')
    const truths = [
      { name: 'yes',   truth: 1 },
      { name: 'no',    truth: 0 },
    ]
    const sorted = truths.sort(sortByTruth)
    t.deepEqual(
      sorted,
      [
        { name: 'no',  truth: 0 },
        { name: 'yes', truth: 1 },
      ]
    )
  }
)

test(
  'booleanSort() with nested data and function',
  t => {
    const sortByTruth = booleanSort( row => row.truth.is.out.there )
    const truths = [
      { name: 'yes',   truth: { is: { out: { there: 1 } } } },
      { name: 'no',    truth: { is: { out: { there: 0 } } } },
    ]
    const sorted = truths.sort(sortByTruth)
    t.deepEqual(
      sorted,
      [
        { name: 'no',    truth: { is: { out: { there: 0 } } } },
        { name: 'yes',   truth: { is: { out: { there: 1 } } } },
      ]
    )
  }
)

test(
  'multiSort() strings',
  t => {
    const people = [
      { forename: 'John', surname: 'Smith' },
      { forename: 'Jack', surname: 'Smith' },
      { forename: 'John', surname: 'Jones' },
    ]
    const sorted = people.sort(multiSort('surname forename'))
    t.deepEqual(
      sorted,
      [
        { forename: 'John', surname: 'Jones' },
        { forename: 'Jack', surname: 'Smith' },
        { forename: 'John', surname: 'Smith' },
      ]
    )
  }
)

test(
  'multiSort() with types and order',
  t => {
    const people = [
      { forename: 'John', surname: 'Smith', age: 28 },
      { forename: 'Jack', surname: 'Smith', age: 30 },
      { forename: 'John', surname: 'Smith', age: 25 },
      { forename: 'John', surname: 'Jones', age: 32 },
    ]
    const sorted = people.sort(multiSort('surname:string forename:string:asc age:integer:desc'))
    t.deepEqual(
      sorted,
      [
        { forename: 'John', surname: 'Jones', age: 32 },
        { forename: 'Jack', surname: 'Smith', age: 30 },
        { forename: 'John', surname: 'Smith', age: 28 },
        { forename: 'John', surname: 'Smith', age: 25 },
      ]
    )
  }
)

test(
  'multiSort() with abbreviated types and order',
  t => {
    const people = [
      { forename: 'John', surname: 'Smith', age: 28 },
      { forename: 'Jack', surname: 'Smith', age: 30 },
      { forename: 'John', surname: 'Smith', age: 25 },
      { forename: 'John', surname: 'Jones', age: 32 },
    ]
    const sorted = people.sort(multiSort('surname:str forename:str:asc age:int:desc'))
    t.deepEqual(
      sorted,
      [
        { forename: 'John', surname: 'Jones', age: 32 },
        { forename: 'Jack', surname: 'Smith', age: 30 },
        { forename: 'John', surname: 'Smith', age: 28 },
        { forename: 'John', surname: 'Smith', age: 25 },
      ]
    )
  }
)

test(
  'multiSort() with booleans and order',
  t => {
    const people = [
      { forename: 'John', surname: 'Smith', age: 29, premium: true  },
      { forename: 'Jack', surname: 'Smith', age: 30, premium: true  },
      { forename: 'John', surname: 'Smith', age: 25, premium: false },
      { forename: 'John', surname: 'Smith', age: 28, premium: true },
      { forename: 'John', surname: 'Jones', age: 32, premium: false },
    ]
    const sorted = people.sort(multiSort('premium:bool:desc age:int surname:str forename:str'))
    t.deepEqual(
      sorted,
      [
        { forename: 'John', surname: 'Smith', age: 28, premium: true },
        { forename: 'John', surname: 'Smith', age: 29, premium: true },
        { forename: 'Jack', surname: 'Smith', age: 30, premium: true },
        { forename: 'John', surname: 'Smith', age: 25, premium: false },
        { forename: 'John', surname: 'Jones', age: 32, premium: false },
      ]
    )
  }
)

test(
  'multiSort() with functions',
  t => {
    const people = [
      { forename: 'John', surname: 'Smith', age: 28 },
      { forename: 'Jack', surname: 'Smith', age: 30 },
      { forename: 'John', surname: 'Smith', age: 25 },
      { forename: 'John', surname: 'Jones', age: 32 },
    ]
    const sortByNameAndAge = multiSort([
      stringSort('surname'),
      stringSort('forename'),
      descendingOrder(integerSort('age'))
    ])
    const sorted = people.sort(sortByNameAndAge)
    t.deepEqual(
      sorted,
      [
        { forename: 'John', surname: 'Jones', age: 32 },
        { forename: 'Jack', surname: 'Smith', age: 30 },
        { forename: 'John', surname: 'Smith', age: 28 },
        { forename: 'John', surname: 'Smith', age: 25 },
      ]
    )
  }
)

test(
  'multiSort() with nested data and function',
  t => {
    const people = [
      { name: { forename: 'John', surname: 'Smith', }, age: 29, premium: true  },
      { name: { forename: 'Jack', surname: 'Smith', }, age: 30, premium: true  },
      { name: { forename: 'John', surname: 'Smith', }, age: 25, premium: false },
      { name: { forename: 'John', surname: 'Smith', }, age: 28, premium: true },
      { name: { forename: 'John', surname: 'Jones', }, age: 32, premium: false },
    ]
    const sorted = people.sort(
      multiSort([
        'premium:bool:desc',
        'age:int',
        stringSort( row => row.name.surname ),
        stringSort( row => row.name.forename )
      ])
    )
    t.deepEqual(
      sorted,
      [
        { name: { forename: 'John', surname: 'Smith', }, age: 28, premium: true },
        { name: { forename: 'John', surname: 'Smith', }, age: 29, premium: true  },
        { name: { forename: 'Jack', surname: 'Smith', }, age: 30, premium: true  },
        { name: { forename: 'John', surname: 'Smith', }, age: 25, premium: false },
        { name: { forename: 'John', surname: 'Jones', }, age: 32, premium: false },
      ]
    )
  }
)

test(
  'multiSort() invalid type',
  t => t.throws(
    () => multiSort('surname:strong'),
    {
      message: 'Invalid sort type "strong" in sort field: surname:strong'
    }
  )
)

test(
  'multiSort() invalid order',
  t => t.throws(
    () => multiSort('surname:str:des'),
    {
      message: 'Invalid sort order "des" in sort field: surname:str:des'
    }
  )
)

test(
  'multiSort() invalid sort field 99',
  t => t.throws(
    () => multiSort([99]),
    {
      message: 'Invalid sort field: 99'
    }
  )
)
test(
  'multiSort() invalid sort field -',
  t => t.throws(
    () => multiSort('-'),
    {
      message: 'Invalid sort field: -'
    }
  )
)
