/**
 * The PropTypes.EmberObject validator
 */

import Ember from 'ember'
const {typeOf} = Ember

import * as logger from '../logger'

export default function (ctx, name, value, def, logErrors) {
  const valid = typeOf(value) === ('instance' || 'class')

  if (!valid && logErrors) {
    logger.warn(ctx, `Expected property ${name} to be an Ember.Object`)
  }

  return valid
}
