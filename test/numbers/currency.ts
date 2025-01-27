import test from '../library/ava-vitest'
import { currency } from '../../src/index'

test(
  "currency(12345, { locale: 'en-GB', currency: 'GBP' })",
  t => t.is(currency(12345, { locale: 'en-GB', currency: 'GBP' }), '£12,345.00')
)

test(
  "currency(12345, { locale: 'en-US', currency: 'USD' })",
  t => t.is(currency(12345, { locale: 'en-US', currency: 'USD' }), '$12,345.00')
)

