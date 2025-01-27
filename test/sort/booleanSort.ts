import test from '../library/ava-vitest'
import { booleanSort } from '../../src/index'

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
    // @ts-expect-error - CBA to define data type
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
