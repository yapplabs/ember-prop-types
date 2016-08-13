import Ember from 'ember'
const {Logger, typeOf} = Ember

export default function (ctx, name, value, def, logErrors) {
  const valueOptions = def.valueOptions

  if (typeOf(valueOptions) !== 'array') {
    Logger.warn(
      'PropTypes.oneOf() requires an array of values to be passed in as an argument'
    )
    return false
  }

  const valid = valueOptions.some((option) => option === value)

  if (!valid && logErrors) {
    Logger.warn(`Property ${name} is not one of: ${valueOptions.join(', ')}`)
  }

  return valid
}
