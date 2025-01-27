import test from '../library/ava-vitest'
import { joinList, joinListAnd, joinListOr } from '../../src/index'

test(
  'joinList with default spaces',
  t => t.is(joinList(['foo', 'bar', 'baz']), 'foo bar baz')
)

test(
  'joinList with commas',
  t => t.is(joinList(['foo', 'bar', 'baz'], ', '), 'foo, bar, baz')
)

test(
  'joinList with one element',
  t => t.is(joinList(['foo']), 'foo')
)

test(
  'joinList with commas and "and"',
  t => t.is(joinList(['foo', 'bar', 'baz'], ', ', ' and '), 'foo, bar and baz')
)

test(
  'joinListAnd',
  t => t.is(joinListAnd(['foo', 'bar', 'baz']), 'foo, bar and baz')
)

test(
  'joinListOr',
  t => t.is(joinListOr(['foo', 'bar', 'baz']), 'foo, bar or baz')
)
