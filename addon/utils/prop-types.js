import _ from 'lodash'
import Ember from 'ember'

const PropTypes = {}

const validators = {
  EmberObject: function (ctx, name, value, def, logErrors) {
    const valid = Ember.Object.prototype.isPrototypeOf(value)

    if (!valid && logErrors) {
      Ember.Logger.warn(`Expected property ${name} to be an Ember.Object`)
    }

    return valid
  },

  array: function (ctx, name, value, def, logErrors) {
    const valid = _.isArray(value)

    if (!valid && logErrors) {
      Ember.Logger.warn(`Expected property ${name} to be an array`)
    }

    return valid
  },

  bool: function (ctx, name, value, def, logErrors) {
    const valid = _.isBoolean(value)

    if (!valid && logErrors) {
      Ember.Logger.warn(`Expected property ${name} to be a boolean`)
    }

    return valid
  },

  func: function (ctx, name, value, def, logErrors) {
    const valid = _.isFunction(value)

    if (!valid && logErrors) {
      Ember.Logger.warn(`Expected property ${name} to be a function`)
    }

    return valid
  },

  null: function (ctx, name, value, def, logErrors) {
    const valid = value === null

    if (!valid && logErrors) {
      Ember.Logger.warn(`Expected property ${name} to be null`)
    }

    return valid
  },

  number: function (ctx, name, value, def, logErrors) {
    const valid = _.isNumber(value)

    if (!valid && logErrors) {
      Ember.Logger.warn(`Expected property ${name} to be a number`)
    }

    return valid
  },

  object: function (ctx, name, value, def, logErrors) {
    const valid = _.isPlainObject(value)

    if (!valid && logErrors) {
      Ember.Logger.warn(`Expected property ${name} to be an object`)
    }

    return valid
  },

  string: function (ctx, name, value, def, logErrors) {
    const valid = _.isString(value)

    if (!valid && logErrors) {
      Ember.Logger.warn(`Expected property ${name} to be a string`)
    }

    return valid
  }
}

export function generateType (key) {
  return {
    isRequired: {
      required: true,
      type: key
    },
    required: false,
    type: key
  }
}

Object.keys(validators).forEach((key) => {
  PropTypes[key] = generateType(key)
})

validators.oneOfType = function (ctx, name, value, def) {
  let valid = false

  if (!_.isArray(def.typeDefs)) {
    Ember.Logger.warn(
      'PropTypes.oneOfType() requires an array of types to be passed in as an argument'
    )

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
    Ember.Logger.warn(`Property ${name} does not match expected types: ${types.join(', ')}`)
  }

  return valid
}

validators.oneOf = function (ctx, name, value, def, logErrors) {
  const valueOptions = def.valueOptions

  if (!_.isArray(valueOptions)) {
    Ember.Logger.warn(
      'PropTypes.oneOf() requires an array of values to be passed in as an argument'
    )
    return false
  }

  const valid = _.some(valueOptions, (option) => option === value)

  if (!valid && logErrors) {
    Ember.Logger.warn(`Property ${name} is not one of ${valueOptions.join(', ')}`)
  }

  return valid
}

validators.instanceOf = function (ctx, name, value, def, logErrors) {
  const type = def.typeDef
  const valid = value instanceof type

  if (!valid && logErrors) {
    Ember.Logger.warn(`Expected property ${name} to be an instance of ${type}`)
  }

  return valid
}

validators.shape = function (ctx, name, value, def, logErrors) {
  const typeDefs = def.typeDefs
  if (!_.isPlainObject(typeDefs)) {
    Ember.logger.warn(
      'PropTypes.shape() requires a plain object to be be passed in as an argument'
    )
    return false
  }

  const valid = _.every(Object.keys(typeDefs), (key) => {
    const typeDef = typeDefs[key]
    const objectValue = Ember.get(value, key)
    return validators[typeDef.type](ctx, key, objectValue, typeDef, false)
  })

  if (!valid && logErrors) {
    Ember.Logger.warn(`Property ${name} does not match the given shape`)
  }

  return valid
}

PropTypes.oneOfType = function (typeDefs) {
  const type = generateType('oneOfType')
  type.isRequired.typeDefs = type.typeDefs = typeDefs
  return type
}

PropTypes.oneOf = function (valueOptions) {
  const type = generateType('oneOf')
  type.isRequired.valueOptions = type.valueOptions = valueOptions
  return type
}

PropTypes.instanceOf = function (typeDef) {
  const type = generateType('instanceOf')
  type.isRequired.typeDef = type.typeDef = typeDef
  return type
}

PropTypes.shape = function (typeDefs) {
  const type = generateType('shape')
  type.isRequired.typeDefs = type.typeDefs = typeDefs
  return type
}

export default PropTypes
export {validators}
