import test from '../library/ava-vitest'
import { plural } from '../../src/index'

test(
  "plural('badger')",
  t => t.is( plural('badger'), 'badgers' )
)

test(
  "plural('grass')",
  t => t.is( plural('grass'), 'grasses' )
)

test(
  "plural('bush')",
  t => t.is( plural('bush'), 'bushes' )
)

test(
  "plural('church')",
  t => t.is( plural('church'), 'churches' )
)

test(
  "plural('box')",
  t => t.is( plural('box'), 'boxes' )
)

test(
  "plural('lorry')",
  t => t.is( plural('lorry'), 'lorries' )
)

test(
  "plural('toy')",
  t => t.is( plural('toy'), 'toys' )
)

test(
  "plural('woman')",
  t => t.is( plural('woman'), 'womans' )
)

test(
  "plural('-')",
  t => t.is( plural('-'), '-' )
)

test(
  "plural('woman') with special case",
  t => t.is( plural('woman', { woman: 'women' }), 'women' )
)
