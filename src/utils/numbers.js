import { noValue } from './assert.js'
import { defaultLocale } from './misc.js'

// this is an ugly hack to provide backwards compatibility
// with some of my older utility functions that are very much
// specific to me and my locale (e.g. formatting prices using
// British pounds)
let numberDefaults = {
  locale:       defaultLocale(),
  currency:     'GBP',
  currencySign: '£',
  thousands:    ',',
}

/**
 * Function to set the default options for formatting numbers.
 * @param {Object} defaults - default options
 * @param {String} [defaults.locale] - default locale
 * @param {String} [defaults.currency] - default currency, e.g. `GBP`
 * @param {String} [defaults.currencySign] - default currency sign, e.g. `£`
 * @param {String} [defaults.thousands] - default separator for thousands, e.g. `,`
 */
export function setNumberDefaults(defaults={}) {
  numberDefaults = { ...numberDefaults, ...defaults }
}

/**
 * Function to create an array with a range of numbers.  Note that this will
 * include the last value.
 * @param {Integer} first - first number
 * @param {Integer} last - last number
 * @param {Integer} [step=1] - step number
 */
export const range = (first, last, step=1) => {
  const down = last < first
  const walk = down ? -Math.abs(step) : step
  return Array(1 + Math.floor(Math.abs((last - first) / step)))
    .fill(first)
    .map((x, y) => x + y * walk)
}

/**
 * Function to format a number with various options.
 * @param {Number} number - number to format
 * @param {Object} [options] - configuration options
 * @param {Object} [options.locale] - locale
 */
export function formatNumber(number, options={}) {
  return new Intl.NumberFormat(
    options.locale || numberDefaults.locale,
    options
  ).format(number)
}

/**
 * Function to format a number as a currency.
 * @param {Number} number - number to format
 * @param {Object} [options] - configuration options
 * @param {Object} [options.locale] - locale
 * @param {Object} [options.currency] - currency code, e.g. `GBP` or `USD`
 */
export function currency(number, options={}) {
  return formatNumber(
    number,
    {
      style: 'currency',
      currency: numberDefaults.currency,
      ...options
    }
  )
}

/**
 * Function to add commas as thousand separators in a number.
 * @param {Integer} n - number of items
 * @param {String} [thousands=','] - optional thousands separator instead of a comma
 * @example
 * commas(12345)          // 12,345
 * commas(12345.67)       // 12,345.67
 * commas(12345.67, ' ')  // 12 345.67
 */
export function commas(n, thousands=numberDefaults.thousands) {
  if (noValue(n)) {
    return ''
  }
  var bits  = n.toString().split('.'),
    rgx   = /(\d+)(\d{3})/

  while (rgx.test(bits[0])) {
    bits[0] = bits[0].replace(rgx, `$1${thousands}$2`)
  }
  return bits.join('.')
}

