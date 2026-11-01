# Timing

Timing-related functions.

## debounce(func, timeout=300) {#debounce}

Function to generate a debouncer function which will call the wrapped
function after a timeout.  If the debouncer function is called again before
the wrapped function has been called then the debounced will reset the timer.

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

## throttle(func, limit=300) {#throttle}

Function to generate a throttling function which will only call the wrapped
function at most once during the specified time limit, no matter how many
times it is called.

```js
function foo() {
    console.log("foo was called");
}

const callFooOnce = throttle(foo, 200);

callFooOnce();  // function is called
callFooOnce();  // function is not called
callFooOnce();  // function is not called

// Wait until the time window has elapsed and the function will be called again
sleep(300).then(callFooOnce)
```

## sleep(ms) {#sleep}

Function which returns a Promise which will resolve after a delay.

```js
sleep(1000).then( () => console.log("Called one second later") )
```
