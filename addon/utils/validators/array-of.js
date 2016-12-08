/**
 * The PropTypes.arrayOf validator
 */
import * as logger from '../logger'
const {isArray} = Array

export default function (validators, ctx, name, value, def, logErrors) {
  const type = def.typeDef.type

  const valid = isArray(value) && value.every((item) => {
    return validators[type](ctx, name, item, type, false)
  })

  if (!valid && logErrors) {
    logger.warn(ctx, `Expected property ${name} to be an array of type ${type}`)
  }

  return valid
}
