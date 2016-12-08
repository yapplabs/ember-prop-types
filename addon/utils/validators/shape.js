/**
 * The PropTypes.shape validator
 */

import Ember from 'ember'
const {typeOf} = Ember

import * as logger from '../logger'

export default function (validators, ctx, name, value, def, logErrors) {
  const typeDefs = def.typeDefs
  if (typeOf(typeDefs) !== 'object') {
    logger.warn(ctx, 'PropTypes.shape() requires a plain object to be be passed in as an argument')
    return false
  }

  if (typeOf(value) !== 'object') {
    logger.warn(ctx, `Property ${name} does not match the given shape`)
    return false
  }

  let valid = Object.keys(typeDefs).every((key) => {
    const typeDef = typeDefs[key]

    if (!typeDef.required && value[key] === undefined) {
      return true
    }

    const objectValue = Ember.get(value, key)
    return validators[typeDef.type](ctx, key, objectValue, typeDef, false)
  })

  valid = valid && Object.keys(value).every((key) => {
    return key in typeDefs
  })

  if (!valid && logErrors) {
    logger.warn(ctx, `Property ${name} does not match the given shape`)
  }

  return valid
}
