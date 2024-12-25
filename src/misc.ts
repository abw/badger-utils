/**
 * Returns the default locale.
 */
export function defaultLocale(): string {
  return Intl.DateTimeFormat().resolvedOptions().locale
}