
/**
 * Utilities for generating random or mock data.
 * @module data_generation
 */

/**
 * Generates a random integer between min and max (inclusive).
 * @param {number} min - Minimum value (inclusive).
 * @param {number} max - Maximum value (inclusive).
 * @returns {number} A random integer between min and max.
 */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generates a random string of specified length using alphanumeric characters.
 * @param {number} length - Length of the string.
 * @returns {string} A random alphanumeric string.
 */
function getRandomString(length) {
  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var result = '';
  for (var i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Generates a random date between two dates.
 * @param {Date|string|number} start - Start date.
 * @param {Date|string|number} end - End date.
 * @returns {Date} Random date between start and end.
 */
function getRandomDate(start, end) {
  var startTime = new Date(start).getTime();
  var endTime = new Date(end).getTime();
  return new Date(getRandomInt(startTime, endTime));
}

/**
 * Generates an array filled with random integers.
 * @param {number} length - Number of elements.
 * @param {number} min - Minimum value.
 * @param {number} max - Maximum value.
 * @returns {number[]} Array of random integers.
 */
function getRandomIntArray(length, min, max) {
  return Array.from({ length }, () => getRandomInt(min, max));
}
