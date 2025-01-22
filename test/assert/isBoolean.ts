import test from '@/test/library/ava-vitest'
import { isBoolean } from '@/src/index'

test(
  'isBoolean() identifies true',
  t => t.true(isBoolean(true))
)
test(
  'isBoolean() identifies false',
  t => t.true(isBoolean(false))
)
test(
  'isBoolean() identifies number',
  t => t.false(isBoolean(1))
)
test(
  'isBoolean() asserts boolean type',
  t => {
    function even(a: boolean | number): boolean {
      if (isBoolean(a)) {
        return a
      }
      else {
        return a % 2 === 0
      }
    }
    t.is( even(true), true )
    t.is( even(4), true )
    t.is( even(3), false )
  }
)

