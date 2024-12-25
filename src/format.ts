import { noValue } from './assert'

/**
 * Function to format strings by inserting values into placeholder locations.
 * @param {!string} msg - the source string
 * @param {Object} data - data items to insert into the string
 * @returns {string} - the expanded string
 * @example
 * format('Hello <name>!', { name: 'World'});  // Hello World!
 */
export const format = (msg: string, data: object): string =>
  msg.replace(
    /<(\w+)>/g,
    (_, key) => {
      const val = data[key as keyof object]
      if (noValue(val)) {
        throw new Error(`Invalid variable expansion <${key}> in message format: ${msg}`)
      }
      return val
    }
  )
