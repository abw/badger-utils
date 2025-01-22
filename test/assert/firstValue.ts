import test from '@/test/library/ava-vitest'
import { isNumber, firstValue, Nothing
} from '@/src/index'

test(
  'firstValue returns 0',
  t => t.is(firstValue(0, 1, 2), 0)
)
test(
  'firstValue returns 0 after undefined',
  t => t.is(firstValue(undefined, 0, 1, 2), 0)
)
test(
  'firstValue returns 1',
  t => t.is(firstValue(1, 2, 3), 1)
)
test(
  'firstValue returns 1 after null',
  t => t.is(firstValue(null, 1, 2, 3), 1)
)
test(
  'firstValue returns false',
  t => t.false(firstValue<boolean|number>(false, 1, 2, 3))
)
test(
  'firstValue returns empty string',
  t => t.is(firstValue<string|number>('', 1, 2, 3), '')
)
test(
  'firstValue() asserts valued type',
  t => {
    function maybe(...a: Array<number | null>): number {
      const first = firstValue(...a)
      return isNumber(first)
        ? first
        : 42
    }
    t.is( maybe(5), 5 )
    t.is( maybe(null, 6), 6 )
    t.is( maybe(null, null), 42 )
  }
)

test(
  'firstValue() with generic type',
  t => {
    function maybe(...a: Array<number | null>): number | Nothing {
      return firstValue(...a)
    }
    t.is( maybe(5), 5 )
    t.is( maybe(null, 6), 6 )
    t.is( maybe(null, null), 42 )
  }
)

test(
  'firstValue with inferred type',
  t => {
    const a: number | undefined = firstValue(null, 1, 2, 3, undefined)
    t.is(a, 1)
  }
)

test(
  'firstValue with types',
  t => {
    const a: number | string | undefined = firstValue<number|string>(null, 1, 'two', 3, undefined)
    t.is(a, 1)
  }
)
