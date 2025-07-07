
/**
 * Miscellaneous or domain-specific utility functions.
 * @module misc
 */

/**
 * Recursively compares two objects and returns an object indicating key-wise equality.
 * @param {Object} obj1 - First object.
 * @param {Object} obj2 - Second object.
 * @returns {Object} Object with boolean values for each key indicating equality.
 */
function compareObjects(obj1, obj2) {
  var result = {};

  function compareKeys(a, b, prefix = '') {
    var keys = new Set([...Object.keys(a || {}), ...Object.keys(b || {})]);

    for (var key of keys) {
      var fullKey = prefix ? "" + (prefix) + ".${key}" : key;
      var val1 = a?.[key];
      var val2 = b?.[key];

      if (typeof val1 === 'object' && typeof val2 === 'object' && val1 !== null && val2 !== null) {
        compareKeys(val1, val2, fullKey);
      } else {
        result[fullKey] = val1 === val2;
      }
    }
  }

  compareKeys(obj1, obj2);
  return result;
}
