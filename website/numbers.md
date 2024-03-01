# Numbers

Functions for working with numbers.

## range(from, to, step=1) {#range}

Returns an array of sequential numbers from the starting value, `from`, up to
**and including** to the end value, `to`.

```js
range(1, 3);  // [1, 2, 3]
```

It handles negative numbers correctly, including cases where the range is
decreasing in value.

```js
range(-2, 2); // [-2, -1, 0, 1, 2]
range(2, -2); // [2, 1, 0, -1, -2]
```

An optional third argument can be provided as a stepping value.

```js
range(2, 8, 2);   // [2, 4, 6, 8]
range(-4, 4, 2);  // [-4, -2, 0, 2, 4]
range(4, -4, -2); // [4, 2, 0, -2, -4]
```

It will also correctly handle the case where you are a numpty and
provide a step that has the wrong sign.

```js
range(4, -4, -2); // [4, 2, 0, -2, -4]
range(4, -4, 2);  // [4, 2, 0, -2, -4]
```

## formatNumber(number, options) {#formatNumber}

This function is for formatting numbers.  It is implemented as a
wrapper around the
[Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat) `format()` function.

The first argument is the number to format.  The second optional argument is
an object containing configuration options.  These can include `locale` and
any of the other options supported by [Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat).

If no options are provided then it will format the number according to the default locale.
For my locale (`en-GB`), the convention is to use commas to separate thousands.

```js
// this works in my locale but might be different in yours
formatNumber(12345); // 12,345
```

An explicit locale can be provided as a configuration option.

```js
formatNumber(12345, { locale: 'en-GB'});    // 12,345
```

Other options include `style` and `currency`, e.g. for formatting a number
as a currency.

```js
formatNumber(12345, { locale: 'en-GB', style: 'currency', currency: 'GBP' })
  // => £12,345.00
```

## currency(number, options) {#currency}

This is a wrapper around the [`formatNumber()`](#formatNumber) function
for formatting currencies.

```js
currency(12345, { locale: 'en-GB', currency: 'GBP' }) // £12,345.00
currency(12345, { locale: 'en-US', currency: 'USD' }) // $12,345.00
```

## commas(n) {#commas}

This function will add commas as thousand separators in a number.

```js
commas(12345); // 12,345
```

An optional second argument can be provided to change the separator.

```js
commas(12345, ' '); // 12 345
```

For locale-specific number formatting it is recommended that you use
[`formatNumber()`](#formatNumber).

## setNumberDefaults(defaults) {#setNumberDefaults}

This function can be used to set the default options for various number
formatting functions.

```js
setNumberDefaults({
  locale: 'en-US',    // default locale
  currency: 'USD',    // default currency
  thousands: ','      // default thousands separator
});

// defaults applied in various functions
numberFormat(12345) // 12,345
currency(12345)     // $12,345.00
commas(12345)       // 12,345

// defaults can be overridden when functions are called
currency(12345, { locale: 'en-GB', currency: 'GBP' }) // £12,345.00
```
