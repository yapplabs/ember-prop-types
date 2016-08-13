import Ember from 'ember'
const {Logger, typeOf} = Ember

export default function (ctx, name, value, def, logErrors) {
  const valid = typeOf(value) === 'string'

  if (!valid && logErrors) {
    Logger.warn(`Expected property ${name} to be a string`)
  }

  return valid
}
