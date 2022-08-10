/**
 * Function to generate a debouncer function which will call the wrapped function after
 * a timeout.  If the debouncer function is called again before the wrapped function has
 * been called then the debounced will reset the timer.
 * @param {Function} func - function to be debounced
 * @param {Function} [timeout=300] - timeout in milliseconds
 * @return {Function} debounced function
 */
export function debounce(func, timeout=300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(
      () => func.apply(this, args),
      timeout
    );
  };
}

/**
 * Function which returns a Promise which will resolve after a delay.
 * @param {Integer} ms - delay in millseconds
 * @return {Promise} - promise which will resolve after the delay
 */
export const sleep = ms =>
  new Promise(r => setTimeout(r, ms));
