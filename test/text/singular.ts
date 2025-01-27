import test from '../library/ava-vitest'
import { singular } from '../../src/index'

test(
  "singular('badgers')",
  t => t.is( singular('badgers'), 'badger' )
)

test(
  "singular('grasses')",
  t => t.is( singular('grasses'), 'grass' )
)

test(
  "singular('bushes')",
  t => t.is( singular('bushes'), 'bush' )
)

test(
  "singular('churches')",
  t => t.is( singular('churches'), 'church' )
)

test(
  "singular('boxes')",
  t => t.is( singular('boxes'), 'box' )
)

test(
  "singular('lorries')",
  t => t.is( singular('lorries'), 'lorry' )
)

test(
  "singular('toys')",
  t => t.is( singular('toys'), 'toy' )
)

test(
  "singular('women')",
  t => t.is( singular('women'), 'women' )
)

test(
  "singular('women') with special case",
  t => t.is( singular('women', { women: 'woman' }), 'woman' )
)
