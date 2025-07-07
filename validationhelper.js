var validationhelper = {};

/**
 * Validation utilities for strings, numbers, arrays, dates, and objects.
 * @module validation
 */

/**
 * Checks if a value is a non-empty string.
 * @param {*} value - The value to validate.
 * @returns {boolean} True if the value is a non-empty string.
 */
validationhelper.isNonEmptyString = function(value) {
  return typeof value === 'string' && value.trim() !== '';
};

/**
 * Checks if a value is undefined, null, or the strings "undefined" / "null".
 * @param {*} value - The value to validate.
 * @returns {boolean} True if the value is considered invalid.
 */
validationhelper.isInvalid = function(value) {
  return (
      value === undefined ||
      value === null ||
      value === 'undefined' ||
      value === 'null'
    );
};

/**
 * Checks if a value is a valid non-empty string.
 * @param {*} value - The value to validate.
 * @returns {boolean} True if the value is a valid non-empty string.
 */
validationhelper.isValidString = function(value) {
  return !isInvalid(value) && typeof value === 'string' && value.trim() !== '';
};

/**
 * Checks if a value is a finite number.
 * @param {*} value - The value to validate.
 * @returns {boolean} True if the value is a valid number.
 */
validationhelper.isValidNumber = function(value) {
  return (
      !isInvalid(value) &&
      typeof value === 'number' &&
      Number.isFinite(value)
    );
};

/**
 * Checks if a value is an array with at least one item.
 * @param {*} value - The value to validate.
 * @returns {boolean} True if the value is a non-empty array.
 */
validationhelper.isValidArray = function(value) {
  return Array.isArray(value) && value.length > 0;
};

/**
 * Checks if a value is a valid Date object or parseable date string.
 * @param {*} value - The value to validate.
 * @returns {boolean} True if the value is a valid date.
 */
validationhelper.isValidDate = function(value) {
  const date = new Date(value);
    return !isNaN(date.getTime());
};

/**
 * Checks if a given date is in the future.
 * @param {Date|string|number} inputDate - The date to validate.
 * @returns {boolean} True if the date is in the future.
 */
validationhelper.isDateInFuture = function(inputDate) {
  try {
      const date = new Date(inputDate);
      return date.getTime() > Date.now();
    } catch {
      return false;
    }
};

/**
 * Checks if a given date is in the past.
 * @param {Date|string|number} inputDate - The date to validate.
 * @returns {boolean} True if the date is in the past.
 */
validationhelper.isDateInPast = function(inputDate) {
  try {
      const date = new Date(inputDate);
      return date.getTime() < Date.now();
    } catch {
      return false;
    }
};

/**
 * Validates that an object contains all specified required fields.
 * @param {Object} obj - The object to check.
 * @param {string[]} requiredFields - List of required property names.
 * @returns {boolean} True if all required fields exist and are not null/undefined.
 */
validationhelper.hasRequiredFields = function(obj, requiredFields) {
  if (typeof obj !== 'object' || obj === null) return false;
    return requiredFields.every(
      field => Object.prototype.hasOwnProperty.call(obj, field) && obj[field] != null
    );
};

/**
 * Recursively compares two objects and returns an object indicating key-wise equality.
 * @param {Object} obj1 - First object.
 * @param {Object} obj2 - Second object.
 * @returns {Object} Object with boolean values for each key indicating equality.
 */
validationhelper.compareObjects = function(obj1, obj2) {
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
};

/**
* Checks if a value is initialized. Basically checking if its different than null and undefined.
* @function basicValueCheck
* @param {ANY} value - Any value or object.
* @returns {boolean} True if object is different than null and undefined.
* @global
*/
validationhelper.basicValueCheck = function(value) {
  var result = false;
    result = value != null && value != undefined;
    //log.info(">>> value: " + value + " result: " + result);
    return result;
};

/**
* Checks if a string is initialized and is different than a empty string.
* @function basicValueCheckString
* @param {ANY} value - The value to be checked if it's a string .
* @returns {boolean} Returns true if the input is initialized and has as a value a string different than "".
*/
validationhelper.basicValueCheckString = function(value) {
  var result = false;
    result = basicValueCheck(value) && value != "";
    //log.info(">>> value: " + value + " result: " + result);
    return result;
};

/**
* Checks if a value of a NameValuePair element is initialized and different than "".
* @function basicValueCheckNVP
* @param {NameValuePair} nvpItem - Any value or object.
* @returns {boolean} True if value of 'nvpItem' is initialized and different than "".
* @global
*/
validationhelper.basicValueCheckNVP = function(nvpItem) {
  var result = false;
    if ( basicValueCheck(nvpItem) ) {
      result = basicValueCheckString(nvpItem.value);
    }
    //log.info(">>> value: " + String(nvpItem) + " result: " + result);
    return result;
};

/**
* This function uses {@link UTF8StringHelper.getLength} and {@link basicValueCheckNumber} to check if the length of a string is less than 'maxLength'. 
* @function basicMaxLengthCheck
* @param {string} str - The string to be checked
* @param {integer} maxLength - The maximum length of the string.
* @returns {boolean} True if 'str' is smaller than 'maxLength'
* @global
* @todo This function can be cleaned on the validation of maxLength
*/
validationhelper.basicMaxLengthCheck = function(str,maxLength) {
  var ret = true;
                 maxLength = maxLength == null || basicValueCheckNumber(maxLength) == false ? 0 : maxLength;
                 return UTF8StringHelper.getLength(str) <= maxLength;
};

/**
* Checks if the source is a BSN. The algorithm to check if a string is a valid BSN is (9xA)+(8xB)+(7xC)+(6xD)+(5xE)+(4xF)+(3xG)+(2xH)+(-1xI) and then divide everything by 11, if the integer division returns 0 it's valid.
* @returns {boolean} Returns true if the source is a valid BSN.
* @param {string} source - The BSN to be validated.
* @function validationElfProef
*/
validationhelper.validationElfProef = function(source) {
  var result = false;
    // Voor persoonnummer ABCDEFGHI moet gelden:
    // (9xA)+(8xB)+(7xC)+(6xD)+(5xE)+(4xF)+(3xG)+(2xH)+(-1xI) moet deelbaar door 11 zijn
    
    // verwijder alle tekens die geen cijfers zijn
    // persoonnummer = persoonnummer.replace(/\D/g, ""); 
    
    // Plaats voorloopnul als er slechts 8 tekens zijn.
    // var bsn = stringToXDigitString(9, "0", source);
    var bsn = source;
    
    // regex = waarde moet tussen 0 en 9 liggen, herhaal dit minimaal 7 en maximaal 9 keer.
    var regex = "[0-9]{7,9}";
    if ( matchExact( regex, source ) ){
      var pos = 0;
      var sum = 0;
      var outcome = 0;
      // maak per gewogen getal(i) het produkt met het getal op positie pos en tel deze bij het totaal op
      for ( var i = source.length; i > 0 ; i-- ) {
        // de laatste positie moet met -1 vermenigvuldigd worden en er bij opgeteld worden
        var digit = Number(bsn.charAt(pos));
        sum += digit;
        outcome += (i != 1) ? (i * digit) : -digit;
        pos++;
      }
      // indien deelbaar door 11 return true, anders false
      result = (sum != 0) && (outcome % 11 == 0); // all-zeros is disallowed
    }
    return result;
};

/**
* Checks if a string is matched by a regex.
* @returns {boolean} Returns true if the regex matches the whole string
* @param {RegEx} regex - The regular expression to test a string.
* @param {string} str - The string to be tested.
* @function matchExact
*/
validationhelper.matchExact = function(regex, str) {
  var ret = false;
     var match;
     if (basicValueCheck(str)) {
       match = str.match(regex);
       ret = (match != null && str == match[0]);
     }
     return ret;
};

/**
* Checks if the length of a string is between a given interval.
* @returns {boolean} Returns true if the length of the source if between max and min characters.
* @param {string} source - The string to be tested.
* @param {integer} min - The minimum amount of character the string can have.
* @param {integer} max - The maximum amount of character the string can have.
* @function testStringIsInRange
*/
validationhelper.testStringIsInRange = function(source,min,max) {
  if(!basicValueCheckString(source)) {
          if(min >0) {return false;}
      }
      return (source.length >=min && source.length <=max);
};