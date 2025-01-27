export type DebounceFunction = (...args: unknown[]) => void

/**
 * Function to generate a debouncer function which will call the wrapped function after
 * a timeout.  If the debouncer function is called again before the wrapped function has
 * been called then the debounced will reset the timer.
 * @param {Function} func - function to be debounced
 * @param {number} [timeout=300] - timeout in milliseconds
 * @return {Function} debounced function
 */
export function debounce(
  func: (...args: unknown[]) => void,
  timeout: number = 300
): DebounceFunction {
  let timer: ReturnType<typeof setTimeout>
  return (...args: unknown[]) => {
    clearTimeout(timer)
    timer = setTimeout(
      () => func(...args),
      timeout
    )
  }
}

/**
 * Function which returns a Promise which will resolve after a delay.
 * @param {number} ms - delay in millseconds
 * @return {Promise} - promise which will resolve after the delay
 */
export function sleep(ms: number): Promise<unknown> {
  return new Promise(r => setTimeout(r, ms))
}
