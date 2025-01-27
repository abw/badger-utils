import test from '../library/ava-vitest'
import { formatNumber } from '../../src/index'

test(
  "formatNumber(12345, { locale: 'en-GB'}",
  t => t.is( formatNumber(12345, { locale: 'en-GB' }), '12,345' )
)

test(
  "formatNumber(12345, { locale: 'en-GB', style: 'currency', 'currency: 'GBP' }",
  t => t.is( formatNumber(12345, { locale: 'en-GB', style: 'currency', currency: 'GBP' }), '£12,345.00' )
)
