import test from '../library/ava-vitest'
import {
  stringSort, integerSort,
  multiSort, descendingOrder
} from '../../src/index'


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
        // @ts-expect-error - CBA to define data type
        stringSort( row => row.name.surname ),
        // @ts-expect-error - CBA to define data type
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
  'multiSort() none more differences',
  t => {
    const people = [
      { forename: 'John', surname: 'Smith', age: 28 },
      { forename: 'John', surname: 'Smith', age: 28 },
    ]
    const sorted = people.sort(multiSort('surname:string forename:string:asc age:integer:desc'))
    t.deepEqual(
      sorted,
      [
        { forename: 'John', surname: 'Smith', age: 28 },
        { forename: 'John', surname: 'Smith', age: 28 },
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
    // @ts-expect-error - invalid sort field
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
