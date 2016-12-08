/**
 * The PropTypes.arrayOf validator
 */
import * as logger from '../logger'
const {isArray} = Array

export default function (validators, ctx, name, value, def, logErrors) {
  const typeDef = def.typeDef

  const valid = isArray(value) && value.every((item) => {
    return validators[typeDef.type](ctx, name, item, typeDef, false)
  })

  if (!valid && logErrors) {
    logger.warn(ctx, `Expected property ${name} to be an array of type ${typeDef.type}`)
  }

  return valid
}
