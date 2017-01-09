import Ember from 'ember'
const {isArray, typeOf} = Ember
import logger from './logger'
import validators from './validators'

const PropTypes = {}

export function getDef (def) {
  // Support handling non-function call propTypes
  // i.e. PropTypes.string.isRequired
  if (def && def.prototype) {
    return {
      isRequired: def.isRequired,
      required: def.required,
      type: def.type
    }
  }

  // Support handling function call propTypes
  // i.e. PropTypes.string({required: true})
  return def
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

;[
  'any',
  'array',
  'bool',
  'element',
  'EmberObject',
  'func',
  'null',
  'number',
  'object',
  'string',
  'symbol'
]
  .forEach((key) => {
    PropTypes[key] = function (options) {
      const def = {
        required: false,
        type: key
      }

      if (typeOf(options) !== 'object') {
        return def
      }

      if ('required' in options) {
        def.required = options.required
      }

      return def
    }

    const obj = PropTypes[key]

    obj.isRequired = {
      required: true,
      type: key
    }

    obj.required = false
    obj.type = key
  })

PropTypes.arrayOf = function (typeDef) {
  const type = generateType('arrayOf')
  type.isRequired.typeDef = type.typeDef = getDef(typeDef)
  return type
}

PropTypes.oneOfType = function (typeDefs) {
  const type = generateType('oneOfType')

  if (isArray(typeDefs)) {
    typeDefs = typeDefs.map((def) => {
      return getDef(def)
    })
  }

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

  if (typeOf(typeDefs) === 'object') {
    Object.keys(typeDefs)
      .forEach((key) => {
        typeDefs[key] = getDef(typeDefs[key])
      })
  }

  type.isRequired.typeDefs = type.typeDefs = typeDefs

  return type
}

export default PropTypes
export {validators}
export {logger}
