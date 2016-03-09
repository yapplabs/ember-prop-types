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

validators.oneOf = function (ctx, name, value, def) {
  let valid = false

  if (!_.isArray(def.typeDefs)) {
    Ember.Logger.warn(
      'PropTypes.oneOf() requires an array of types to be passed in as an argument'
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

PropTypes.oneOf = function (typeDefs) {
  const type = generateType('oneOf')
  type.isRequired.typeDefs = type.typeDefs = typeDefs
  return type
}

export default PropTypes
export {validators}
