/**
 * The PropTypes.null validator
 */

import * as logger from '../logger'

export default function (ctx, name, value, def, logErrors) {
  const valid = value === null

  if (!valid && logErrors) {
    logger.warn(ctx, `Expected property ${name} to be null`)
  }

  return valid
}
