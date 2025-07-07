
/**
 * Validation utilities for strings, numbers, arrays, dates, and objects.
 * @module validation
 */

/**
 * Checks if a value is a non-empty string.
 * @param {*} value - The value to validate.
 * @returns {boolean} True if the value is a non-empty string.
 */
function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim() !== '';
}

/**
 * Checks if a value is undefined, null, or the strings "undefined" / "null".
 * @param {*} value - The value to validate.
 * @returns {boolean} True if the value is considered invalid.
 */
function isInvalid(value) {
  return (
    value === undefined ||
    value === null ||
    value === 'undefined' ||
    value === 'null'
  );
}

/**
 * Checks if a value is a valid non-empty string.
 * @param {*} value - The value to validate.
 * @returns {boolean} True if the value is a valid non-empty string.
 */
function isValidString(value) {
  return !isInvalid(value) && typeof value === 'string' && value.trim() !== '';
}

/**
 * Checks if a value is a finite number.
 * @param {*} value - The value to validate.
 * @returns {boolean} True if the value is a valid number.
 */
function isValidNumber(value) {
  return (
    !isInvalid(value) &&
    typeof value === 'number' &&
    Number.isFinite(value)
  );
}

/**
 * Checks if a value is an array with at least one item.
 * @param {*} value - The value to validate.
 * @returns {boolean} True if the value is a non-empty array.
 */
function isValidArray(value) {
  return Array.isArray(value) && value.length > 0;
}

/**
 * Checks if a value is a valid Date object or parseable date string.
 * @param {*} value - The value to validate.
 * @returns {boolean} True if the value is a valid date.
 */
function isValidDate(value) {
  const date = new Date(value);
  return !isNaN(date.getTime());
}

/**
 * Checks if a given date is in the future.
 * @param {Date|string|number} inputDate - The date to validate.
 * @returns {boolean} True if the date is in the future.
 */
function isDateInFuture(inputDate) {
  try {
    const date = new Date(inputDate);
    return date.getTime() > Date.now();
  } catch {
    return false;
  }
}

/**
 * Checks if a given date is in the past.
 * @param {Date|string|number} inputDate - The date to validate.
 * @returns {boolean} True if the date is in the past.
 */
function isDateInPast(inputDate) {
  try {
    const date = new Date(inputDate);
    return date.getTime() < Date.now();
  } catch {
    return false;
  }
}

/**
 * Validates that an object contains all specified required fields.
 * @param {Object} obj - The object to check.
 * @param {string[]} requiredFields - List of required property names.
 * @returns {boolean} True if all required fields exist and are not null/undefined.
 */
function hasRequiredFields(obj, requiredFields) {
  if (typeof obj !== 'object' || obj === null) return false;
  return requiredFields.every(
    field => Object.prototype.hasOwnProperty.call(obj, field) && obj[field] != null
  );
}
