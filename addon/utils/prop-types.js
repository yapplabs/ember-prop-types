import validators from './validators'

const PropTypes = {}

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
  'array',
  'bool',
  'EmberObject',
  'func',
  'null',
  'number',
  'object',
  'string'
]
  .forEach((key) => {
    PropTypes[key] = generateType(key)
  })

PropTypes.arrayOf = function (typeDef) {
  const type = generateType('arrayOf')
  type.isRequired.typeDef = type.typeDef = typeDef
  return type
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
