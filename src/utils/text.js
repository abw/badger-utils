import { isString, isArray, noValue } from "./assert.js";
import { commas } from "./numbers.js";

/**
 * Split a comma/whitespace delimited string into an Array
 * @param {String} value - string to split
 * @return {Array} array of split strings
 * @example
 * const strings = splitList('one two three')
 * @example
 * const strings = splitList('one,two,three')
 * @example
 * const strings = splitList('one, two, three')
 */
export function splitList(value) {
  if (noValue(value)) {
    return [ ];
  }
  else if (isString(value)) {
    return value.length
      ? value.split(/,\s*|\s+/)
      : [ ]
  }
  else if (isArray(value)) {
    return value;
  }
  return [value];
}

/**
 * Split a string into an Array of lines.
 * @param {String} text - string to split
 * @return {Array} array of lines
*/
export function splitLines(text) {
  if (! isString(text) || text.length === 0) {
    return [ ];
  }
  var lines = text.split(/\s*\n+\s*/).filter(
    function(item) { return item.length > 0 }
  );
  return lines;
}

/**
 * Join an Array into a single string
 * @param {Array} array - array to join
 * @param {String} [joint=' '] - delimiter to join strings
 * @param {String} [lastJoint=joint] - delimiter for final item
 * @return {String} joined string
 * @example
 * joinList(['one', 'two', 'three']);   // one two three
 * @example
 * joinList(['one', 'two', 'three'], ', ');   // one, two, three
 * @example
 * joinList(['one', 'two', 'three'], ', ', ' and ');   // one, two and three
 */
export function joinList(array, joint=' ', lastJoint=joint) {
  let copy = [...array];
  const last = copy.pop();
  return copy.length
    ? [copy.join(joint), last].join(lastJoint)
    : last;
}

/**
 * Join an Array into a single string using commas for delimiters and ` and ` for the final item
 * @param {Array} array - array to join
 * @param {String} [joint=', '] - delimiter to join strings
 * @param {String} [lastJoint=' and '] - delimiter for final item
 * @return {String} joined string
 * @example
 * joinListAnd(['one', 'two', 'three']);   // one, two and three
 */
export function joinListAnd(array, joint=', ', lastJoint=' and ') {
  return joinList(array, joint, lastJoint);
}

/**
 * Join an Array into a single string using commas for delimiters and ` or ` for the final item
 * @param {Array} array - array to join
 * @param {String} [joint=', '] - delimiter to join strings
 * @param {String} [lastJoint=' or '] - delimiter for final item
 * @return {String} joined string
 * @example
 * joinListOr(['one', 'two', 'three']);   // one, two or three
 */
export function joinListOr(array, joint=', ', lastJoint=' or ') {
  return joinList(array, joint, lastJoint);
}

/**
 * Capitalise a string by converting the first character to upper case and other characters to lower case
 * @param {String} word - word to capitalise
 * @return {String} capitalised string
 * @example
 * capitalise('badger');   // Badger
 * @example
 * capitalise('BADGER');   // Badger
 */
export function capitalise(word) {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

/**
 * Capitalise all words in a string by converting the first character of each word to upper case
 * @param {String} string - words to capitalise
 * @return {String} capitalised string
 * @example
 * capitaliseWords('badger fun');   // Badger Fun
 * @example
 * capitaliseWords('BADGER FUN');   // Badger Fun
 */
export function capitaliseWords(string) {
  return string.replace(
    // /(?:^|\s)\S/g,
    /(\w+)/g,
    capitalise
  );
}

/**
 * Convert a snake case string to studly caps
 * @param {String} snake - word to capitalise
 * @return {String} capitalised string
 * @example
 * snakeToStudly('happy_badger_dance');   // HappyBadgerDance
 * @example
 * snakeToStudly('happy_badger/dance');   // HappyBadger/Dance
 */
export function snakeToStudly(snake) {
  return snake.split('/').map(
    // each segment can be like foo_bar which we convert to FooBar
    segment => segment.split('_').map(capitalise).join('')
  ).join('/');
}

/**
 * Convert a snake case string to camel case
 * @param {String} snake - word to capitalise
 * @return {String} capitalised string
 * @example
 * snakeToCamel('happy_badger_dance');   // happyBadgerDance
 * @example
 * snakeToCamel('happy_badger/dance');   // happyBadger/dance
 */
export function snakeToCamel(snake) {
  return snake.split('/').map(
    // each segment can be like foo_bar which we convert to fooBar
    segment => segment.split('_').map((i, n) => n ? capitalise(i) : i).join('')
  ).join('/');
}

/**
 * A very primitive function to pluralise the singular form of a words.  It only
 * works on words with standard endings and plural forms, because pluralising
 * words is notoriously difficult.
 * @param {String} singular - word to pluralise
 * @return {String} plural form
 * @example
 * pluralise('box');     // boxes
 * @example
 * pluralise('doggy');   // doggies
 * @example
 * pluralise('badger');  // badgers
 * @example
 * pluralise('woman');   // womans
 */
export function pluralise(singular) {
  let found;

  if (singular.match(/(ss?|sh|ch|x)$/)) {
    // e.g. grass/grasses, lash/lashes, watch/watches, box, boxes
    return singular + 'es';
  }
  else if ((found = singular.match(/(.*?[^aeiou])y$/))) {
    // doggy/doggies
    return found[1] + 'ies';
  }
  else if (singular.match(/([^s\d\W])$/)) {
    // cat/cats
    return singular + 's';
  }
  return singular;
}

/**
 * Utility function to inflect a string passed as the second argument to the singular/plural
 * form based on the number passed as the first argument.  Uses the {@link pluralise()} function
 * which only works on words with standard pluralisations.  The third argument can be provided
 * as the plural form where necessary.  The optional 4th argument can be used to provide a different
 * word for the case where n is 0.  The default is "no", e.g. "no badgers" when n is 0.
 * @param {Integer} n - number of items
 * @param {String} singular - singular form
 * @param {String} [plural] - optional plural form
 * @param {String} [no='no'] - optional word to use when `n` is 0
 * @example
 * inflect(0, 'cat')     # no cats
 * @example
 * inflect(1, 'cat')     # 1 cat
 * @example
 * inflect(2, 'cat')     # 2 cats
 * @example
 * inflect(0, 'child', 'children')     # no children
 * @example
 * inflect(1, 'child', 'children')     # 1 child
 * @example
 * inflect(2, 'child', 'children')     # 2 children
 * @example
 * inflect(0, 'black', 'black', "none, none more")     # none, none more black
 */
export function inflect(n, singular, plural, no='no') {
  return (n ? commas(n) : no)
    + ' '
    + (n === 1 ? singular : (plural || pluralise(singular)));
}

/**
 * Wrapper around {@link inflect()} which uses the word "No" instead of "no" for the
 * zero case, i.e. Inflect() is the capitalized form of inflect()
 * @param {Integer} n - number of items
 * @param {String} singular - singular form
 * @param {String} [plural] - optional plural form
 * @param {String} [no='No'] - optional word to use when `n` is 0
 */
export function Inflect(n, singular, plural, no='No') {
  return inflect(n, singular, plural, no);
}



// for the yanks
export const capitalize = capitalise;
export const capitalizeWords = capitaliseWords;
export const pluralize = pluralise;

