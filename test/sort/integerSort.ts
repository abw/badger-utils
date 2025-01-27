import test from '../library/ava-vitest'
import { integerSort } from '../../src/index'

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
    // @ts-expect-error - CBA to define data type
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

