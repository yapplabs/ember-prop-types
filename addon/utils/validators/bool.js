/**
 * The PropTypes.bool validator
 */
import Ember from 'ember'
const {typeOf} = Ember

import * as logger from '../logger'

export default function (ctx, name, value, def, logErrors) {
  const valid = typeOf(value) === 'boolean'

  if (!valid && logErrors) {
    logger.warn(ctx, `Expected property ${name} to be a boolean`)
  }

  return valid
}
