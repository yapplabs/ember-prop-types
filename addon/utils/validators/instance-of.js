/**
 * The PropTypes.instanceOf validator
 */

import * as logger from '../logger'

export default function (ctx, name, value, def, logErrors) {
  const type = def.typeDef
  const valid = value instanceof type

  if (!valid && logErrors) {
    const nameOfType = type.toString().match(/function (\w*)/)[1]
    logger.warn(ctx, `Expected property ${name} to be an instance of ${nameOfType}`)
  }

  return valid
}
