import test from '../library/ava-vitest'
import { numberSort } from '../../src/index'

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
    // @ts-expect-error - CBA to define data type
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
  'numberSort() with integers',
  t => {
    const rows = [
      { name: 'Alan', points: 200 },
      { name: 'Brian', points: 100 },
      { name: 'Chris', points: 1010 }
    ]
    const sort = numberSort('points')
    const sorted = rows.sort(sort)
    t.deepEqual(
      sorted,
      [
        { name: 'Brian', points: 100 },
        { name: 'Alan',  points: 200 },
        { name: 'Chris', points: 1010 }
      ]
    )
  }
)

