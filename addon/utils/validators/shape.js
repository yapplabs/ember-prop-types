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

    const objectValue = Ember.get(value, key)
    if (objectValue === undefined) {
      if (!typeDef.required) {
        return true
      } else {
        if (logErrors) {
          logger.warn(ctx, `Property ${name} is missing required property ${key}`)
        }
        return false
      }
    }

    return validators[typeDef.type](ctx, `${name}.${key}`, objectValue, typeDef, logErrors)
  })

  valid = valid && Object.keys(value).every((key) => {
    const keyIsKnown = (key in typeDefs)
    if (!keyIsKnown && logErrors) {
      logger.warn(ctx, `Property ${name} has an unknown key: ${key}`)
    }
    return keyIsKnown
  })

  if (!valid && logErrors) {
    logger.warn(ctx, `Property ${name} does not match the given shape`)
  }

  return valid
}
