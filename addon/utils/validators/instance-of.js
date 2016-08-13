import Ember from 'ember'
const {Logger} = Ember

export default function (ctx, name, value, def, logErrors) {
  const type = def.typeDef
  const valid = value instanceof type

  if (!valid && logErrors) {
    const nameOfType = type.toString().match(/function (\w*)/)[1]
    Logger.warn(`Expected property ${name} to be an instance of ${nameOfType}`)
  }

  return valid
}
