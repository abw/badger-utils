# Maths

These basic mathematical functions used a fixed floating point algorithm
to work around the imprecision in the IEEE 754 standard which Javascript
uses for floating point numbers.

For example, the expression `1.1 + 0.1` will usually return a value
something like `1.20000000000002`.  Use the `add()` function instead and the
result will be `1.2`.

For the theory behind this, see
https://docs.oracle.com/cd/E19957-01/806-3568/ncg_goldberg.html

These functions were adapted from the code in
[Sinful.js](https://github.com/guipn/sinful.js/blob/master/sinful.js).

## add(n1, n2, ...) {#add}

Adds two or more numbers

```js
add(1.2, 0.1);                    // 1.2
add(2.2, 2.2, 2.2)                // 6.6
add(-3.14, -3.14, -3.14)          // -9.42
```

## subtract(n1, n2, ...) {#sub}

Subtracts two or more numbers

```js
subtract(3.14, 9.42)              // -6.28
subtract(-3.14, 6.28)             // -9.42
subtract(7.8, 0.1, 2.4)           // 5.3
```

## multiply(n1, n2, ...) {#multiply}

Multiplies two or more numbers

```js
multiply(3.0, 2.2)                // 6.6
multiply(-3.14, 3)                // -9.42
multiply(3.0, 2.2, 2.0)           // 13.2
```

## divide(n1, n2, ...) {#divide}

Divides two or more numbers

```js
divide(6.6, 2.2)                  // 3
divide(-14.08, 3.2)               // -4.4
divide(13.2, 2.0, 1.1)            // 6
```

## clamp(n, min, max) {#clamp}

Clamp the number `n` to the range `min` to `max`.  If the number `n` is
less than `min` then `min` will be returned.  If it's larger than `max`
then `max` will be returned.  Otherwise `n` will be returned.

```js
clamp(5, 1, 10);                  // 5
clamp(11, 1, 10)                  // 10
clamp(-3, 1, 10)                  // 1
```