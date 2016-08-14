import Ember from 'ember'
const {Logger} = Ember
const {isArray} = Array

export default function (validators, ctx, name, value, def, logErrors) {
  const type = def.typeDef.type

  const valid = isArray(value) && value.every((item) => {
    return validators[type](ctx, name, item, type, false)
  })

  if (!valid && logErrors) {
    Logger.warn(`Expected property ${name} to be an array of type ${type}`)
  }

  return valid
}
