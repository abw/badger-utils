import test from '@/test/library/ava-vitest'
import { isUndefined } from '@/src/index'

test(
  'isUndefined identifies undefined',
  t => t.true(isUndefined(undefined))
)
test(
  'isUndefined identifies null',
  t => t.false(isUndefined(null))
)
test(
  'isUndefined identifies nothing',
  // @ts-expect-error - isUndefined() expects a value
  t => t.true(isUndefined())
)
test(
  'isUndefined() asserts undefined type',
  t => {
    function maybe(a: number | undefined): number {
      return isUndefined(a)
        ? 42
        : a
    }
    t.is( maybe(5), 5 )
    t.is( maybe(undefined), 42 )
  }
)
