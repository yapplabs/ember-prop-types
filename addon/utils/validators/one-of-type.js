/**
 * The PropTypes.oneOfType validator
 */

import Ember from 'ember'
const {typeOf} = Ember

import * as logger from '../logger'

export default function (validators, ctx, name, value, def) {
  let valid = false

  if (typeOf(def.typeDefs) !== 'array') {
    logger.warn(ctx, 'PropTypes.oneOfType() requires an array of types to be passed in as an argument')

    return valid
  }

  for (let i = 0, len = def.typeDefs.length; i < len; i++) {
    const typeDef = def.typeDefs[i]

    if (validators[typeDef.type](ctx, name, value, typeDef, false)) {
      valid = true
      break
    }
  }

  if (!valid) {
    const types = def.typeDefs.map((typeDef) => typeDef.type)
    logger.warn(ctx, `Property ${name} does not match expected types: ${types.join(', ')}`)
  }

  return valid
}
