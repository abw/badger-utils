import test from '@/test/library/ava-vitest'
import { hasValues } from '@/src/index'

test(
  'hasValues([false, null]) = false',
  t => t.false(hasValues([false, null]))
)
test(
  'hasValues([true, null]) = false',
  t => t.false(hasValues([true, null]))
)
test(
  'hasValues([true, true]) = true',
  t => t.true(hasValues([true, true]))
)
test(
  'hasValues([1, 2]) = true',
  t => t.true(hasValues([1, 2]))
)

test(
  'hasValues() asserts array with non-null or non-undefined items',
  t => {
    function addSomeNumbers(a: Array<number | null | undefined>): number {
      return hasValues(a)
        ? a.reduce( (sum, n) => sum + n, 0 )
        : 42
    }
    t.is( addSomeNumbers([5, 6]), 11 )
    t.is( addSomeNumbers([5, 6, null]), 42 )
    t.is( addSomeNumbers([5, 6, undefined]), 42 )
  }
)

