/**
 * The PropTypes.func validator
 */

import Ember from 'ember'
const {typeOf} = Ember

import * as logger from '../logger'

export default function (ctx, name, value, def, logErrors) {
  const valid = typeOf(value) === 'function'

  if (!valid && logErrors) {
    logger.warn(ctx, `Expected property ${name} to be a function`)
  }

  return valid
}
