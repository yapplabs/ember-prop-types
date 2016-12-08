/**
 * Unit test for the PropTypes.arrayOf validator
 */
import Ember from 'ember'
import {afterEach, beforeEach, describe} from 'mocha'
import sinon from 'sinon'

import {itValidatesTheProperty, spyOnValidateMethods} from 'dummy/tests/helpers/validator'
import PropTypesMixin, {PropTypes} from 'ember-prop-types/mixins/prop-types'

const stringTypeDef = {
  isRequired: {
    required: true,
    type: 'string'
  },
  required: false,
  type: 'string'
}

const requiredDef = {
  required: true,
  type: 'arrayOf',
  typeDef: stringTypeDef
}

const notRequiredDef = {
  isRequired: requiredDef,
  required: false,
  type: 'arrayOf',
  typeDef: stringTypeDef
}

describe('Unit / validator / PropTypes.arrayOf', function () {
  const ctx = {propertyName: 'bar'}
  let sandbox, Foo

  beforeEach(function () {
    sandbox = sinon.sandbox.create()
    spyOnValidateMethods(sandbox)
  })

  afterEach(function () {
    sandbox.restore()
  })

  describe('when an array of a simple type (string)', function () {
    describe('when required', function () {
      beforeEach(function () {
        ctx.def = requiredDef
        Foo = Ember.Object.extend(PropTypesMixin, {
          propTypes: {
            bar: PropTypes.arrayOf(PropTypes.string).isRequired
          }
        })
      })

      describe('when initialized with array of strings', function () {
        beforeEach(function () {
          ctx.instance = Foo.create({bar: ['alpha', 'bravo']})
        })

        itValidatesTheProperty(ctx)
      })

      describe('when initialized with array of booleans', function () {
        beforeEach(function () {
          ctx.instance = Foo.create({bar: [true, false]})
        })

        itValidatesTheProperty(ctx, 'Expected property bar to be an array of type string')
      })

      describe('when initialized with a heterogenous array', function () {
        beforeEach(function () {
          ctx.instance = Foo.create({bar: ['alpha', false]})
        })

        itValidatesTheProperty(ctx, 'Expected property bar to be an array of type string')
      })

      describe('when initialized without value', function () {
        beforeEach(function () {
          ctx.instance = Foo.create()
        })

        itValidatesTheProperty(ctx, 'Missing required property bar')
      })
    })

    describe('when not required', function () {
      beforeEach(function () {
        ctx.def = notRequiredDef
        Foo = Ember.Object.extend(PropTypesMixin, {
          propTypes: {
            bar: PropTypes.arrayOf(PropTypes.string)
          }
        })
      })

      describe('when initialized with array of strings', function () {
        beforeEach(function () {
          ctx.instance = Foo.create({bar: ['alpha', 'bravo']})
        })

        itValidatesTheProperty(ctx)
      })

      describe('when initialized with array of booleans', function () {
        beforeEach(function () {
          ctx.instance = Foo.create({bar: [true, false]})
        })

        itValidatesTheProperty(ctx, 'Expected property bar to be an array of type string')
      })

      describe('when initialized with a heterogenous array', function () {
        beforeEach(function () {
          ctx.instance = Foo.create({bar: ['alpha', false]})
        })

        itValidatesTheProperty(ctx, 'Expected property bar to be an array of type string')
      })

      describe('when initialized without value', function () {
        beforeEach(function () {
          ctx.instance = Foo.create()
        })

        itValidatesTheProperty(ctx)
      })
    })
  })
})
