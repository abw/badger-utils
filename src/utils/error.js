/**
 * Throws a new Error object
 * @param {String[]} message - error message string(s)
 * @throws {Error}
 */
export function fail(...message) {
  throw new Error(message.join(''));
}

/**
 * Re-throw an existing Error object
 * @param {Error} error - error object
 * @throws {Error}
 */
export function rethrow(error) {
  throw error;
}

