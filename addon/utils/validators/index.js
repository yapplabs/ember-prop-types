import Ember from 'ember'
const {assign} = Ember

import any from './any'
import array from './array'
import arrayOf from './array-of'
import bool from './bool'
import emberObject from './ember-object'
import func from './func'
import instanceOf from './instance-of'
import nullFn from './null'
import number from './number'
import object from './object'
import oneOf from './one-of'
import oneOfType from './one-of-type'
import shape from './shape'
import string from './string'

const validators = {
  any,
  array,
  bool,
  EmberObject: emberObject,
  func,
  instanceOf,
  null: nullFn,
  number,
  object,
  oneOf,
  string
}

assign(validators, {
  arrayOf: arrayOf.bind(this, validators),
  oneOfType: oneOfType.bind(this, validators),
  shape: shape.bind(this, validators)
})

export default validators
