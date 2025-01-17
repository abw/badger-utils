import test from './library/ava-vitest'
import { range, commas, formatNumber, currency } from '../src/index'

//-----------------------------------------------------------------------------
// range()
//-----------------------------------------------------------------------------
test(
  'range(0, 1)',
  t => {
    const r = range(0, 1)
    t.is(r.length, 2)
    t.is(r[0], 0)
    t.is(r[1], 1)
  }
)
test(
  'range(10, 11)',
  t => {
    const r = range(10, 11)
    t.is(r.length, 2)
    t.is(r[0], 10)
    t.is(r[1], 11)
  }
)
test(
  'range(100, 105)',
  t => {
    const r = range(100, 105)
    t.is(r.length, 6)
    t.is(r[0], 100)
    t.is(r[1], 101)
    t.is(r[2], 102)
    t.is(r[3], 103)
    t.is(r[4], 104)
    t.is(r[5], 105)
  }
)
test(
  'range(-2, 2)',
  t => {
    const r = range(-2, 2)
    t.is(r.length, 5)
    t.is(r[0], -2)
    t.is(r[1], -1)
    t.is(r[2], 0)
    t.is(r[3], 1)
    t.is(r[4], 2)
  }
)
test(
  'range(2, -2)',
  t => {
    const r = range(2, -2)
    t.is(r.length, 5)
    t.is(r[0], 2)
    t.is(r[1], 1)
    t.is(r[2], 0)
    t.is(r[3], -1)
    t.is(r[4], -2)
  }
)
test(
  'range(2, 8, 2)',
  t => {
    const r = range(2, 8, 2)
    t.is(r.length, 4)
    t.is(r[0], 2)
    t.is(r[1], 4)
    t.is(r[2], 6)
    t.is(r[3], 8)
  }
)
test(
  'range(8, 2, 2)',
  t => {
    const r = range(8, 2, 2)
    t.is(r.length, 4)
    t.is(r[0], 8)
    t.is(r[1], 6)
    t.is(r[2], 4)
    t.is(r[3], 2)
  }
)
test(
  'range(8, 2, -2)',
  t => {
    const r = range(8, 2, -2)
    t.is(r.length, 4)
    t.is(r[0], 8)
    t.is(r[1], 6)
    t.is(r[2], 4)
    t.is(r[3], 2)
  }
)
test(
  'range(-4, 4, 2)',
  t => {
    const r = range(-4, 4, 2)
    t.is(r.length, 5)
    t.is(r[0], -4)
    t.is(r[1], -2)
    t.is(r[2], 0)
    t.is(r[3], 2)
    t.is(r[4], 4)
  }
)
test(
  'range(4, -4, 2)',
  t => {
    const r = range(4, -4, 2)
    t.is(r.length, 5)
    t.is(r[0], 4)
    t.is(r[1], 2)
    t.is(r[2], 0)
    t.is(r[3], -2)
    t.is(r[4], -4)
  }
)
test(
  'range(4, -4, -2)',
  t => {
    const r = range(4, -4, 2)
    t.is(r.length, 5)
    t.is(r[0], 4)
    t.is(r[1], 2)
    t.is(r[2], 0)
    t.is(r[3], -2)
    t.is(r[4], -4)
  }
)


//-----------------------------------------------------------------------------
// formatNumber()
//-----------------------------------------------------------------------------
test(
  "formatNumber(12345, { locale: 'en-GB'}",
  t => t.is( formatNumber(12345, { locale: 'en-GB' }), '12,345' )
)
test(
  "formatNumber(12345, { locale: 'en-GB', style: 'currency', 'currency: 'GBP' }",
  t => t.is( formatNumber(12345, { locale: 'en-GB', style: 'currency', currency: 'GBP' }), '£12,345.00' )
)

//-----------------------------------------------------------------------------
// commas()
//-----------------------------------------------------------------------------
test(
  'commas(123)',
  t => t.is(commas(123), '123')
)
test(
  'commas(12345)',
  t => t.is(commas(12345), '12,345')
)
test(
  'commas(12345.67)',
  t => t.is(commas(12345.67), '12,345.67')
)
test(
  'commas(12345.67, " ")',
  t => t.is(commas(12345.67, ' '), '12 345.67')
)
test(
  'commas()',
  // @ts-expect-error - commas() expects arguments
  t => t.is(commas(), '')
)

//-----------------------------------------------------------------------------
// currency
//-----------------------------------------------------------------------------
test(
  "currency(12345, { locale: 'en-GB', currency: 'GBP' })",
  t => t.is(currency(12345, { locale: 'en-GB', currency: 'GBP' }), '£12,345.00')
)
test(
  "currency(12345, { locale: 'en-US', currency: 'USD' })",
  t => t.is(currency(12345, { locale: 'en-US', currency: 'USD' }), '$12,345.00')
)

