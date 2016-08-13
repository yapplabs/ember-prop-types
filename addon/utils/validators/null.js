import Ember from 'ember'
const {Logger} = Ember

export default function (ctx, name, value, def, logErrors) {
  const valid = value === null

  if (!valid && logErrors) {
    Logger.warn(`Expected property ${name} to be null`)
  }

  return valid
}
