import { format } from './format.js'

/**
 * Throws a new Error object
 * @param {String[]} message - error message string(s)
 * @throws {Error}
 */
export function fail(...message) {
  throw new Error(message.join(''))
}

/**
 * Throws a new Error object with a message generated from a format string.
 * @param {String} message - message format
 * @param {Object} data - data items to embed in message
 * @throws {Error}
 */
export function failMsg(message, data) {
  throw new Error(
    format(message, data)
  )
}

/**
 * Re-throw an existing Error object
 * @param {Error} error - error object
 * @throws {Error}
 */
export function rethrow(error) {
  throw error
}

