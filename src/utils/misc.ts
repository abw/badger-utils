/**
 * Returns the default locale.
 */
export function defaultLocale() {
  return Intl.DateTimeFormat().resolvedOptions().locale
}