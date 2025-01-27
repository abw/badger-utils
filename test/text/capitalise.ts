import test from '../library/ava-vitest'
import { capitalise, capitalize } from '../../src/index'

test(
  'capitalise foo => Foo',
  t => t.is(capitalise('foo'), 'Foo')
)

test(
  'capitalise FOO => Foo',
  t => t.is(capitalise('FOO'), 'Foo')
)

test(
  'capitalize foo => Foo',
  t => t.is(capitalize('foo'), 'Foo')
)

test(
  'capitalize FOO => Foo',
  t => t.is(capitalize('FOO'), 'Foo')
)

