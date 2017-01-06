/**
 * Logging utility that includes a little information about the object doing the logging
 */
import Ember from 'ember'
const {Logger} = Ember

export default {
  throwError (message) {
    throw new Error(message)
  },

  /**
   * Log a warning message
   * @param {*} obj - the object doing the warning
   * @param {String} message - the warning
   * @param {Boolean} throwError - whether or not to throw error
   */
  warn (obj, message, throwError) {
    if (throwError) {
      this.throwError(message)
    } else {
      const id = obj.toString()
      Logger.warn(`[${id}]: ${message}`)
    }
  }
}
