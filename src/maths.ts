// Fixed floating point math.  For the mathematical theory, see:
// https://docs.oracle.com/cd/E19957-01/806-3568/ncg_goldberg.html
// This code was adapted from Sinful.js, see:
// https://github.com/guipn/sinful.js/blob/master/sinful.js#L37
// NOTE: this has now been moved into badger-maths and will be removed
// from here at some point in the future
const multiplier = (x: number): number => {
  const parts = x.toString().split('.')
  return parts.length < 2
    ? 1
    : Math.pow(10, parts[1].length)
}

// Given a variable number of arguments, returns the maximum
// multiplier that must be used to normalize an operation involving
// all of them.
const correctionFactor = (...args: number[]): number =>
  args.reduce(
    (prev, next) => {
      const mp = multiplier(prev)
      const mn = multiplier(next)
      return mp > mn ? mp : mn
    },
    -Infinity
  )

/**
 * Function to multiply numbers using fixed floating point maths.
 * @param {...number} args - numbers to multiply
 * @returns {number} - the product of the numbers
 * @deprecated Moved into \@abw/badger-maths
 * @example
 * multiply(3.0, 2.2, 2.0);  // 13.2
 */
export const multiply = (...args: number[]): number =>
  args.reduce(
    (sum, value) => {
      const cf = correctionFactor(sum, value)
      return (sum * cf) * (value * cf) / (cf * cf)
    },
    1
  )

/**
 * Function to divide numbers using fixed floating point maths.
 * @param {...number} args - numbers to divide
 * @returns {number} - the result of dividing the numbers
 * @deprecated Moved into \@abw/badger-maths
 * @example
 * divide(13.2, 2.0, 1.1);  // 6
 */
export const divide = (...args: number[]): number =>
  args.reduce(
    (sum, value) => {
      const cf = correctionFactor(sum, value)
      return (sum * cf) / (value * cf)
    }
  )

/**
 * Function to add numbers using fixed floating point maths.
 * @param {...number} args - numbers to add
 * @returns {number} - the result of adding the numbers
 * @deprecated Moved into \@abw/badger-maths
 * @example
 * add(1.1, 6.6, 0.1);  // 7.8
 */
export const add = (...args: number[]): number => {
  const cf = correctionFactor(...args)
  return args.reduce(
    (sum, value) => sum + cf * value,
    0
  ) / cf
}

/**
 * Function to subtract numbers using fixed floating point maths.
 * @param {...number} args - numbers to subtract
 * @returns {number} - the result of adding the numbers
 * @deprecated Moved into \@abw/badger-maths
 * @example
 * sub(7.8, 0.1, 2.4);  // 5.3
 */
export const subtract = (...args: number[]): number => {
  const cf = correctionFactor(...args)
  const [first, ...rest] = args
  return rest.reduce(
    (sum, value) => sum - cf * value,
    first * cf
  ) / cf
}

/**
 * Function to clamp a number to a min, max range
 * @param {number} n - number to clamp
 * @param {number} min - minimum value of n
 * @param {number} max - maximum value of n
 * @returns {number} - the number n clamped to the min, max range
 * @deprecated Moved into \@abw/badger-maths
 * @example
 * clamp(1.1, 0, 1);  // 1
 */
export const clamp = (n: number, min: number, max: number): number =>
  Math.min(Math.max(n, min), max)


