
/**
 * String utility functions including UTF-8 encoding/decoding.
 * @module string_utils
 */

/**
 * Encodes a string into UTF-8.
 * @param {string} str - The input string.
 * @returns {Uint8Array} The UTF-8 encoded byte array.
 */
function encodeUtf8(str) {
  return new TextEncoder().encode(str);
}

/**
 * Decodes a UTF-8 encoded byte array back into a string.
 * @param {Uint8Array} bytes - The UTF-8 byte array.
 * @returns {string} The decoded string.
 */
function decodeUtf8(bytes) {
  return new TextDecoder().decode(bytes);
}

/**
 * Trims a string and returns an empty string if input is null or undefined.
 * @param {string|null|undefined} str - The input string.
 * @returns {string} A trimmed string or an empty string.
 */
function safeTrim(str) {
  return typeof str === 'string' ? str.trim() : '';
}

/**
 * Capitalizes the first letter of a string.
 * @param {string} str - The input string.
 * @returns {string} The capitalized string.
 */
function capitalizeFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
