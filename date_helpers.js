
/**
 * Date and time utility functions.
 * @module date_helpers
 */

/**
 * Converts a Unix timestamp (in seconds) to a JavaScript Date object.
 * @param {number} unixSeconds - The Unix timestamp in seconds.
 * @returns {Date} The corresponding JavaScript Date object.
 */
function unixToJsDate(unixSeconds) {
  return new Date(unixSeconds * 1000);
}

/**
 * Converts a JavaScript Date object to a Unix timestamp (in seconds).
 * @param {Date} date - The JavaScript Date object.
 * @returns {number} The Unix timestamp in seconds.
 */
function jsDateToUnix(date) {
  if (!(date instanceof Date)) return NaN;
  return Math.floor(date.getTime() / 1000);
}

/**
 * Formats a date to a YYYY-MM-DD string.
 * @param {Date|string|number} input - The date input.
 * @returns {string} The formatted date string.
 */
function formatDate(input) {
  const date = new Date(input);
  if (isNaN(date.getTime())) return '';
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Checks if dateA is before dateB.
 * @param {Date|string|number} dateA
 * @param {Date|string|number} dateB
 * @returns {boolean} True if dateA is before dateB.
 */
function isBefore(dateA, dateB) {
  return new Date(dateA).getTime() < new Date(dateB).getTime();
}

/**
 * Checks if dateA is after dateB.
 * @param {Date|string|number} dateA
 * @param {Date|string|number} dateB
 * @returns {boolean} True if dateA is after dateB.
 */
function isAfter(dateA, dateB) {
  return new Date(dateA).getTime() > new Date(dateB).getTime();
}
