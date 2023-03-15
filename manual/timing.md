# Timing

Timing-related function.

## debounce(func, timeout=300)

Function to generate a debouncer function which will call the wrapped function after
a timeout.  If the debouncer function is called again before the wrapped function has
been called then the debounced will reset the timer.

```js
function foo() {
    console.log("foo was called");
}

const callFooSoon = debounce(foo, 1000);

callFooSoon();  // starts 1s timer
callFooSoon();  // resets timer
callFooSoon();  // resets timer
    // => foo() will be called once, 1s after last reset
```

## sleep(ms)

Function which returns a Promise which will resolve after a delay.

```js
sleep(1000).then( () => console.log("Called one second later") )
```
