import test from '@/test/library/ava-vitest'
import { haveValue } from '@/src/index'

test(
  'haveValue(false, null) = false',
  t => t.false(haveValue(false, null))
)
test(
  'haveValue(true, null) = false',
  t => t.false(haveValue(true, null))
)
test(
  'haveValue(true, true) = true',
  t => t.true(haveValue(true, true))
)
test(
  'haveValue(1, 2) = true',
  t => t.true(haveValue(1, 2))
)
test(
  'haveValue() asserts array with non-null or non-undefined items',
  t => {
    function addTwoNumbers(a: number | null, b: number | null): number {
      // Tyepscript can't type check rest params :-(
      // Note that the additional "as number" assertions  required to keep
      // Typescript happy
      return haveValue(a, b)
        ? (a as number) + (b as number)
        : 42
    }
    t.is( addTwoNumbers(5, 6), 11 )
    t.is( addTwoNumbers(5, null), 42 )
  }
)

