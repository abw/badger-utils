# Function Reference

## Assertions

Functions for testing the type of a value.

| Function | Description |
|-|-|
|[`isBoolean(value)`](assertions#isBoolean)|Test if a value is a Boolean|
|[`isString(value)`](assertions#isString)|Test if a value is a String|
|[`isNumber(value)`](assertions#isNumber)|Test if a value is a Number|
|[`isInteger(value)`](assertions#isInteger)|Test if a value is an Integer|
|[`isFloat(value)`](assertions#isFloat)|Test if a value is a Float|
|[`isArray(value)`](assertions#isArray)|Test if a value is an Array |
|[`isFunction(value)`](assertions#isFunction)|Test if a value is a Function|
|[`isRegExp(value)`](assertions#isRegExp)|Test if a value is a RegExp|
|[`isObject(value)`](assertions#isObject)|Test if a value is an Object|
|[`isUndefined(value)`](assertions#isUndefined)|Test if a value is undefined|
|[`isNull(value)`](assertions#isNull)|Test if a value is null|
|[`hasValue(value)`](assertions#hasValue)|Test if a value is not null or undefined|
|[`noValue(value)`](assertions#noValue)|Test if a value is null or undefined|
|[`haveValue(...values)`](assertions#haveValues)|Test if all values are not null or undefined|
|[`firstValue(...values)`](assertions#firstValue)|Return the first value that is not null or undefined|

## Numbers

Functions for working with numbers.

| Function | Description |
|-|-|
|[`range(from, to, step=1)`](numbers#range)|Return an array of numbers in a range|
|[`formatNumber(number, options)`](numbers#formatNumber)|Format a number using Intl.NumberFormat|
|[`currency(number, options)`](numbers#currency)|Format a number as a currency|
|[`commas(n)`](numbers#commas)|Add commas as thousand separators to a number|
|[`setNumberDefaults(defaults)`](numbers#setNumberDefaults)|Set the default formatting options for numbers|

## Text

Functions for working with text.

| Function | Description |
|-|-|
|[`splitLines(text)`](text#splitLines)|Split text into lines|
|[`splitList(value)`](text#splitList)|Split a whitespace delimited string into an array of words|
|[`splitHash(value,set=true, hash={})`](text#splitHash)|Split a whitespace delimited string into a hash table object for quick lookup|
|[`joinList(array, joint=' ', lastJoint=joint)`](text#joinList)|Join an array of words into a single string with separators|
|[`joinListAnd(array, joint=', ', lastJoint=' and ')`](text#joinListAnd)|Join an array of words using commas and 'and', e.g. `David, Nigel and Derek`|
|[`joinListOr(array, joint=', ', lastJoint=' or ')`](text#joinListOr)|Join an array of words using commas and 'or', e.g. `David, Nigel or Derek`|
|[`capitalise(word) / capitalize(word)`](text#capitalise)|Capitalise a word|
|[`capitaliseWords(string) / capitalizeWords(string)`](text#capitaliseWords)|Capitalise all words in a string|
|[`snakeToStudly(snake)`](text#snakeToStudly)|Convert snake case to studly caps (e.g. `foo_bar` to `FooBar`)|
|[`snakeToCamel(snake)`](text#snakeToCamel)|Convert snake case to camel case (e.g. `foo_bar` to `fooBar`)|
|[`plural(singular)`](text#plural)|Return the plural form of a singular word|
|[`singular(plural)`](text#singular)|Return the singular form of a plural word|
|[`inflect(n, singular, plural, no='no')`](text#inflect)|Inflect a noun based on the plurality (e.g. `no cats`, `1 cat`, `2 cats`)|
|[`Inflect(n, singular, plural, no='No')`](text#Inflect)|Inflect a noun with first capital letter (e.g. `No cats`, `1 cat`, `2 cats`)|
|[`format(message, data)`](text#format)|Format a string to fill in `<placeholder>` markers|

## Objects

Functions for working with objects.

| Function | Description |
|-|-|
|[`hash(source, options)`](objects#hash)|Modify (a.k.a "make a hash of") an object (a.k.a a "hash table")|
|[`objMap(obj, fn)`](objects#objMap)|Apply a function to each value in an object|
|[`remove(object, key)`](objects#remove)|Remove a value from an object|
|[`extract(object, keys, options)`](objects#extract)|Extract values from an object|
|[`keys(object)`](objects#keys)|Return the keys for an object|
|[`values(object)`](objects#values)|Return the values for an object|
|[`entries(object)`](objects#entries)|Return the entries (`[key, value]` pairs) for an object|

## Functions

Functions for working with functions.

| Function | Description |
|-|-|
|[`maybeFunction(fn, args)`](functions#maybeFunction)|Call a function or simply return a static value that isn't a function|

## Select

Function for selecting things.

| Function | Description |
|-|-|
|[`selector(spec)`(select#selector)|Factory to create a function that will select values using various criteria|

## Sort

Functions for sorting arrays of objects.

| Function | Description |
|-|-|
|[`stringSort(field)`](sort#stringSort)|Sort using a string field|
|[`numberSort(field)`](sort#numberSort)|Sort using a numeric field|
|[`integerSort(field)`](sort#integerSort)|Sort using an integer field|
|[`booleanSort(field)`](sort#booleanSort)|Sort using a boolean field|
|[`multiSort(fields)`](sort#multiSort)|Sort using multiple fields|
|[`stringField(obj,field)`](sort#stringField)|Extract a string field from an object|
|[`numberField(obj,field)`](sort#numberField)|Extract a number field from an object|
|[`integerField(obj,field)`](sort#integerField)|Extract an integer field from an object|
|[`booleanField(obj,field)`](sort#booleanField)|Extract a boolean field from an object|
|[`descendingOrder(sortFn)`](sort#descendingOrder)|Sort in descending order|
|[`ascendingOrder(sortFn)`](sort#ascendingOrder)|Sort in ascending order|

## Timing

Timing-related function.

| Function | Description |
|-|-|
|[`debounce(func, timeout=300)`](timing#debounce)|Create a debouncing function|
|[`sleep(ms)`](timing#sleep)|Delay function which waits before resolving|

## Errors

Functions for throwing errors.

| Function | Description |
|-|-|
|[`fail(message)`](errors#fail)|Throw an error|
|[`failMsg(message, data)`](errors#failMsg)|Throw an error using a message format string|
|[`rethrow(error)`](errors#rethrow)|Rethrow an error|

## Miscellaneous

Miscellaneous functions.

| Function | Description |
|-|-|
|[`doNothing()`](misc#doNothing)|Function that does nothing|
|[`defaultLocale()`](misc#defaultLocale)|Return the default locale|
