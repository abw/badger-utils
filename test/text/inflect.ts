import test from '../library/ava-vitest'
import { inflect, Inflect } from '../../src/index'

test(
  'inflect(0, "badger")',
  t => t.is( inflect(0, 'badger'), 'no badgers' )
)

test(
  'inflect(1, "badger")',
  t => t.is( inflect(1, 'badger'), '1 badger' )
)

test(
  'inflect(2, "badger")',
  t => t.is( inflect(2, 'badger'), '2 badgers' )
)

test(
  'inflect(0, "child", "children")',
  t => t.is( inflect(0, 'child', 'children'), 'no children' )
)

test(
  'inflect(1, "child", "children")',
  t => t.is( inflect(1, 'child', 'children'), '1 child' )
)

test(
  'inflect(2, "child", "children")',
  t => t.is( inflect(2, 'child', 'children'), '2 children' )
)

test(
  'inflect(0, "black", "black", "none, none more")',
  t => t.is( inflect(0, 'black', 'black', 'none, none more'), 'none, none more black' )
)

test(
  'Inflect(0, "dog")',
  t => t.is( Inflect(0, 'dog'), 'No dogs' )
)

