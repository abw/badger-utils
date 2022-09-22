/**
 * Function to extract an integer field from an object.  Uses `parseInt()` to
 * coerce non-integer values (e.g. numbers in strings) to an integer.
 * @param {Object} obj - object containing data
 * @param {String} field - field to return as integer
 * @return {Integer} - integer value from object
 * @example
 * integerField({ a: "10" }, "a");     // 10
 */
export const integerField = (obj, field) =>
  parseInt(obj[field]||0)

/**
 * Function to extract a number field from an object.  Uses `parseFloat()` to
 * coerce non-number values (e.g. numbers in strings) to floats.
 * @param {Object} obj - object containing data
 * @param {String} field - field to return as float
 * @return {Float} - floating point number from object
 * @example
 * numberField({ pi: "3.14" }, "pi");     // 3.14
 */
export const numberField = (obj, field) =>
  parseFloat(obj[field]||0)

/**
 * Function to extract a string field from an object.  Uses `toString()` to
 * coerce non-string values (e.g. numbers) to strings.
 * @param {Object} obj - object containing data
 * @param {String} field - field to return as string
 * @return {Float} - string value from object
 * @example
 * numberField({ pi: 3.14 }, "pi");     // "3.14"
 */
export const stringField = (obj, field) =>
  (obj[field]||'').toString()

/**
 * Sort function generator for sorting objects by an integer field.
 * Takes a single field name and returns a sort function which will sort
 * objects by that field.
 * @param {String} field - field to return as string
 * @return {Function} - sort function to sort objects by the named integer field
 * @example
 * const people = [
 *   { name: "Fred",   age: 18 },
 *   { name: "Shaggy", age: 17 },
 *   { name: "Daphne", age: 16 },
 *   { name: "Velma",  age: 15 },
 * ];
 * const sortByAge = integerSort('age');
 * const sorted = people.sort(sortByAge); // Velma, Daphne, Shaggy, Fred
 */
export const integerSort = field => (a, b) => {
  return integerField(a, field) - integerField(b, field);
}

/**
 * Sort function generator for sorting objects by a number field.
 * Takes a single field name and returns a sort function which will sort
 * objects by that field.
 * @param {String} field - field to return as string
 * @return {Function} - sort function to sort objects by the named number field
 * @example
 * const constants = [
 *   { name: "pi",   value: 3.14  },
 *   { name: "e",    value: 2.718 },
 *   { name: "phi",  value: 1.618 },
 * ];
 * const sortByValue = numberSort('value');
 * const sorted = constants.sort(sortByValue); // phi, e, pi
 */
export const numberSort = field => (a, b) => {
  return numberField(a, field) - numberField(b, field);
}

/**
 * Sort function generator for sorting objects by a string field.
 * Takes a single field name and returns a sort function which will sort
 * objects by that field.
 * @param {String} field - field to return as string
 * @return {Function} - sort function to sort objects by the named string field
 * @example
 * const constants = [
 *   { name: "pi",   value: 3.14  },
 *   { name: "e",    value: 2.718 },
 *   { name: "phi",  value: 1.618 },
 * ];
 * const sortByName = stringSort('name');
 * const sorted = constants.sort(sortByName); // e, phi, pi
 */
export const stringSort = field => (a, b) => {
  let c = stringField(a, field).toLowerCase();
  let d = stringField(b, field).toLowerCase();
  return c > d ? 1 : d > c ? -1 : 0;
}

