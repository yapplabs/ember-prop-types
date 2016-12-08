/**
 * The PropTypes.symbol validator
 */

import * as logger from '../logger'

export default function (ctx, name, value, def, logErrors) {
  const valid = typeof value === 'symbol'

  if (!valid && logErrors) {
    logger.warn(ctx, `Expected property ${name} to be a symbol`)
  }

  return valid
}
