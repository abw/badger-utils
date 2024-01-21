import { isFunction } from '@abw/badger-utils'

/**
 * Function to call a function or return a non-function value.
 * @param {Function|*} fn - a function or other value
 * @param {...*} args - additional argument to pass to a function
 * @returns {*} - the value or return from the function
 * @example
 * maybeFunction('Hello World!');  // Hello World!
 * @example
 * maybeFunction(() => 'Hello World!');  // Hello World!
 * @example
 * maybeFunction(arg => `Hello ${arg.name}!`, { name: 'World' });  // Hello World!
 */

export const maybeFunction = (fn, ...args) =>
  isFunction(fn)
    ? fn(...args)
    : fn