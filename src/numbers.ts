import { noValue } from './assert'
import { defaultLocale } from './misc'

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
 * @param {string} [defaults.locale] - default locale
 * @param {string} [defaults.currency] - default currency, e.g. `GBP`
 * @param {string} [defaults.currencySign] - default currency sign, e.g. `£`
 * @param {string} [defaults.thousands] - default separator for thousands, e.g. `,`
 */
export function setNumberDefaults(
  defaults: {
    locale?: string,
    currency?: string,
    currencySign?: string,
    thousands?: string
  }
): void {
  numberDefaults = { ...numberDefaults, ...defaults }
}

/**
 * Function to create an array with a range of numbers.  Note that this will
 * include the last value.
 * @param {number} first - first number
 * @param {number} last - last number
 * @param {number} [step=1] - step number
 */
export const range = (first: number, last: number, step: number=1): number[] => {
  const down = last < first
  const walk = down ? -Math.abs(step) : step
  return Array(1 + Math.floor(Math.abs((last - first) / step)))
    .fill(first)
    .map((x, y) => x + y * walk)
}

interface FormatNumberOptions extends Intl.NumberFormatOptions {
  locale?: string
}

/**
 * Function to format a number with various options.
 * @param {number} number - number to format
 * @param {Object} [options] - configuration options
 * @param {string} [options.locale] - locale
 */
export function formatNumber(
  number: number,
  options: FormatNumberOptions = { }
): string {
  return new Intl.NumberFormat(
    options.locale,
    options
  ).format(number)
}

/**
 * Function to format a number as a currency.
 * @param {number} number - number to format
 * @param {Object} [options] - configuration options
 * @param {string} [options.locale] - locale
 * @param {string} [options.currency] - currency code, e.g. `GBP` or `USD`
 */
export function currency(
  number: number,
  options: FormatNumberOptions = { }
): string {
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
 * @param {number} n - number of items
 * @param {string} [thousands=','] - optional thousands separator instead of a comma
 * @example
 * commas(12345)          // 12,345
 * commas(12345.67)       // 12,345.67
 * commas(12345.67, ' ')  // 12 345.67
 */
export function commas(
  n: number,
  thousands: string = numberDefaults.thousands
): string {
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

