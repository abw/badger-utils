/**
 * Do nothing.  Nothing at all.
 */
export function doNothing() {
  // speak again Cordelia
}

/**
 * Returns the default locale.
 */
export function defaultLocale() {
  return Intl.DateTimeFormat().resolvedOptions().locale;
}