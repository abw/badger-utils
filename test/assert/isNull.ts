import test from '@/test/library/ava-vitest'
import { isNull } from '@/src/index'

test(
  'isNull identifies undefined',
  t => t.false(isNull(undefined))
)
test(
  'isNull identifies null',
  t => t.true(isNull(null))
)
test(
  'isNull identifies nothing',
  // @ts-expect-error - isNull() expects a value
  t => t.false(isNull())
)
test(
  'isNull() asserts null type',
  t => {
    function maybe(a: number | null): number {
      return isNull(a)
        ? 42
        : a
    }
    t.is( maybe(5), 5 )
    t.is( maybe(null), 42 )
  }
)
