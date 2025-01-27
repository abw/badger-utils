import test from '../library/ava-vitest'
import { snakeToCamel, } from '../../src/index'

test(
  'snakeToCamel foo => Foo',
  t => t.is(snakeToCamel('foo'), 'foo')
)

test(
  'snakeToCamel foo_bar => FooBar',
  t => t.is(snakeToCamel('foo_bar'), 'fooBar')
)

test(
  'snakeToCamel foo_bar/baz_waz => fooBar/BazWaz',
  t => t.is(snakeToCamel('foo_bar/baz_waz'), 'fooBar/bazWaz')
)
