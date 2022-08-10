import { noValue } from "./assert.js";

let numberDefaults = {
  currency:  '£',
  thousands: ',',
  poa:       'POA'
};

/**
 * Function to add commas as thousand separators in a number.
 * @param {Integer} n - number of items
 * @param {String} [thousands=','] - optional thousands separator instead of a comma
 * @example
 * commas(12345)          # 12,345
 * commas(12345.67)       # 12,345.67
 * commas(12345.67, ' ')  # 12 345.67
 */
export function commas(n, thousands=numberDefaults.thousands) {
  if (noValue(n)) {
    return '';
  }
  var bits  = n.toString().split('.'),
    rgx   = /(\d+)(\d{3})/;

  while (rgx.test(bits[0])) {
    bits[0] = bits[0].replace(rgx, `$1${thousands}$2`);
  }
  return bits.join('.');
}

/**
 * Function to format a number as a price with commas and a currency symbol.
 * Uses British pounds by default because that's what works for me.
 * @param {Integer} money - number of items
 * @param {String} [options] - configuration options
 * @param {String} [options.currency='£'] - currency prefix
 * @param {String} [options.thousands=','] - thousands separator
 * @example
 * price(12345)          # £12,345.00
 * price(12345.67)       # £12,345.67
 * price(12345.67, { thousands: ' ' })  # £12 345.67
 * price(12345.67, { currency: '$' })   # $12 345.67
 */
export function price(money, options={ }) {
  const config = { ...numberDefaults, ...options };
  return money
    ? config.currency + commas(parseFloat(money).toFixed(2), config.thousands)
    : '';
}

/**
 * Function to format a number as a price with commas and a currency symbol.
 * If the amount is zero, undefined or null then it returns "£POA".
 * @param {Integer} money - number of items
 * @param {String} [options] - configuration options
 * @param {String} [options.currency='£'] - currency prefix
 * @param {String} [options.thousands=','] - thousands separator
 * @example
 * priceOrPOA(12345)     # £12,345.00
 * priceOrPOA(undefined) # £POA
 * priceOrPOA(12345.67, { thousands: ' ' })  # 12 345.67
 */
export function priceOrPOA(money, options={ }) {
  const config = { ...numberDefaults, ...options };
  return config.currency +
    (money
      ? commas(parseFloat(money).toFixed(2), config.thousands)
      : config.poa);
}

/**
 * Function to format a number as a price with commas and a currency symbol.
 * If the amount is zero, undefined or null then it returns "£0".
 * @param {Integer} money - number of items
 * @param {String} [options] - configuration options
 * @param {String} [options.currency='£'] - currency prefix
 * @param {String} [options.thousands=','] - thousands separator
 * @example
 * priceOrZero(12345)     # £12,345.00
 * priceOrZero(0)         # £0
 * priceOrZero(undefined) # £0
 * priceOrZero(12345.67, { thousands: ' ' })  # 12 345.67
 */
export function priceOrZero(money, options={ }) {
  const config = { ...numberDefaults, ...options };
  return config.currency + commas(parseFloat(money || 0).toFixed(2), config.thousands)
}

/**
 * Function to format a number as an inter price with commas and a currency symbol.
 * If the amount is zero or otherwise false then an empty string is returned.
 * @param {Integer} money - number of items
 * @param {String} [options] - configuration options
 * @param {String} [options.currency='£'] - currency prefix
 * @param {String} [options.thousands=','] - thousands separator
 * @example
 * pounds(12345)     # £12,345
 * pounds(12345.67)  # £12,345
 * pounds(0)         #
 * pounds(12345.67, { currency: '$', thousands: ' ' })  # $12 345
 */
export function pounds(money, options={ }) {
  const config = { ...numberDefaults, ...options };
  return money
    ? config.currency + commas(Math.floor(parseFloat(money)).toString(), config.thousands)
    : '';
}

/**
 * Function to create an array with a range of numbers.  Note that this will
 * include the last value.
 * @param {Integer} first - first number
 * @param {Integer} last - last number
 */
export const range = (first, last) =>
  Array(1 + last - first).fill(first).map((x, y) => x + y)
