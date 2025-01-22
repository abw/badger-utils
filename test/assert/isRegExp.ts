import test from '@/test/library/ava-vitest'
import { isRegExp } from '@/src/index'

test(
  'isRegExp() identifies Regexps',
  t => t.true(isRegExp(/foo/))
)
test(
  'isRegExp() identifies non-RegExp',
  t => t.false(isRegExp(123))
)
test(
  'isRegExp() asserts RegExp type',
  t => {
    function maybeMatch(a: RegExp | string) {
      if (isRegExp(a)) {
        return a.test('hello')
      }
      else {
        return Boolean('hello'.match(a))
      }
    }
    t.is( maybeMatch(/hell/), true )
    t.is( maybeMatch(/hill/), false )
    t.is( maybeMatch('hell'), true )
    t.is( maybeMatch('hill'), false )
  }
)
