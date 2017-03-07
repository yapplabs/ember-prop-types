/**
 * The PropTypes.arrayOf validator
 */
import logger from '../logger'
import Ember from 'ember'

const {typeOf} = Ember
const {isArray} = Array

export default function (validators, ctx, name, value, def, logErrors, throwErrors) {
  const type = typeOf(value)
  const typeDef = def.typeDef

  const valid = isArray(value) && value.every((item, index) => {
    return validators[typeDef.type](ctx, `${name}[${index}]`, item, typeDef, logErrors, throwErrors)
  })

  if (!valid && logErrors) {
    logger.warn(ctx, `Expected property ${name} to be an array of type ${typeDef.type} but instead got: ${type}`, throwErrors)
  }

  return valid
}
