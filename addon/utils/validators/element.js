/**
 * The PropTypes.element validator
 */

/* global Element */

import * as logger from '../logger'

export default function (ctx, name, value, def, logErrors) {
  const valid = value instanceof Element

  if (!valid && logErrors) {
    logger.warn(ctx, `Expected property ${name} to be an element`)
  }

  return valid
}
