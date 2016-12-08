/**
 * Logging utility that includes a little information about the object doing the logging
 */
import Ember from 'ember'
const {Logger} = Ember

/**
 * Log a warning message
 * @param {*} obj - the object doing the warning
 * @param {String} message - the warning message
 */
export function warn (obj, message) {
  const id = obj.toString()
  Logger.warn(`[${id}]: ${message}`)
}
