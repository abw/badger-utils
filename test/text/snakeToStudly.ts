import test from '../library/ava-vitest'
import { snakeToStudly } from '../../src/index'

test(
  'snakeToStudly foo => Foo',
  t => t.is(snakeToStudly('foo'), 'Foo')
)

test(
  'snakeToStudly foo_bar => FooBar',
  t => t.is(snakeToStudly('foo_bar'), 'FooBar')
)

test(
  'snakeToStudly foo_bar/baz_waz => FooBar/BazWaz',
  t => t.is(snakeToStudly('foo_bar/baz_waz'), 'FooBar/BazWaz')
)
