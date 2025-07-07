
/**
 * Logging utility functions.
 * @module logging
 */

/**
 * Creates a standard log prefix with timestamp and optional tag.
 * @param {string} [tag] - Optional tag to include.
 * @returns {string} Log prefix string.
 */
function getLogPrefix(tag) {
  const now = new Date().toISOString();
  return tag ? `[${now}][${tag}]` : `[${now}]`;
}

/**
 * Formats a log message with context.
 * @param {string} message - The log message.
 * @param {Object} [context] - Additional metadata to log.
 * @returns {string} Formatted log string.
 */
function formatLogMessage(message, context = {}) {
  const contextStr = Object.keys(context).length
    ? ` | Context: ${JSON.stringify(context)}`
    : '';
  return `${getLogPrefix()} ${message}${contextStr}`;
}
