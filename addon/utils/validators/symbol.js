import Ember from 'ember'
const {Logger} = Ember

export default function (ctx, name, value, def, logErrors) {
  const valid = typeof value === 'symbol'

  if (!valid && logErrors) {
    Logger.warn(`Expected property ${name} to be a symbol`)
  }

  return valid
}
