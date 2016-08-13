import Ember from 'ember'
const {Logger, typeOf} = Ember

export default function (validators, ctx, name, value, def, logErrors) {
  const typeDefs = def.typeDefs
  if (typeOf(typeDefs) !== 'object') {
    Logger.warn(
      'PropTypes.shape() requires a plain object to be be passed in as an argument'
    )
    return false
  }

  const valid = Object.keys(typeDefs).every((key) => {
    const typeDef = typeDefs[key]
    const objectValue = Ember.get(value, key)
    return validators[typeDef.type](ctx, key, objectValue, typeDef, false)
  })

  if (!valid && logErrors) {
    Logger.warn(`Property ${name} does not match the given shape`)
  }

  return valid
}
