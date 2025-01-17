import { isFunction } from './assert'

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

export const maybeFunction = (fn: unknown, ...args: unknown[]): unknown =>
  isFunction(fn)
    ? fn(...args)
    : fn

/**
 * No-op function which does nothing.  Nothing at all.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function doNothing(...args: unknown[]) {
  // speak again Cordelia
}

/**
 * Identity function which returns the argument passed to it.
 */
export const identity = <T>(value: T) => value
