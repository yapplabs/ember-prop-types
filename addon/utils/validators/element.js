/* global Element */

import Ember from 'ember'
const {Logger} = Ember

export default function (ctx, name, value, def, logErrors) {
  const valid = value instanceof Element

  if (!valid && logErrors) {
    Logger.warn(`Expected property ${name} to be an element`)
  }

  return valid
}
