import test from '@/test/library/ava-vitest'
import { hasValue } from '@/src/index'

test(
  'hasValue identifies nothing = false',
  // @ts-expect-error - hasValue() expects a value
  t => t.false(hasValue())
)
test(
  'hasValue identifies undefined = false',
  t => t.false(hasValue(undefined))
)
test(
  'hasValue identifies null = false',
  t => t.false(hasValue(null))
)
test(
  'hasValue identifies false = true',
  t => t.true(hasValue(false))
)
test(
  'hasValue identifies 0 = true',
  t => t.true(hasValue(0))
)
test(
  'hasValue() asserts non-null or non-undefined type',
  t => {
    function maybe(a: number | null | undefined): number {
      return hasValue(a)
        ? a
        : 42
    }
    t.is( maybe(5), 5 )
    t.is( maybe(null), 42 )
    t.is( maybe(undefined), 42 )
  }
)
