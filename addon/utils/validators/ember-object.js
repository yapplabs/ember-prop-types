import Ember from 'ember'
const {Logger, typeOf} = Ember

export default function (ctx, name, value, def, logErrors) {
  const valid = typeOf(value) === ('instance' || 'class')

  if (!valid && logErrors) {
    Logger.warn(`Expected property ${name} to be an Ember.Object`)
  }

  return valid
}
