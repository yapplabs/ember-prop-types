/**
 * Unit test for the PropTypes.date validator
 */
import Ember from 'ember'
import SpreadMixin from 'ember-spread'
import {afterEach, beforeEach, describe} from 'mocha'
import sinon from 'sinon'

import {
  itValidatesOnUpdate,
  itValidatesTheProperty,
  spyOnValidateMethods
} from 'dummy/tests/helpers/validator'

import PropTypesMixin, {PropTypes} from 'ember-prop-types/mixins/prop-types'

const requiredDef = {
  required: true,
  type: 'date'
}

const notRequiredDef = {
  isRequired: requiredDef,
  required: false,
  type: 'date'
}

describe('Unit / validator / PropTypes.date', function () {
  const ctx = {propertyName: 'bar'}
  let sandbox, Foo

  beforeEach(function () {
    sandbox = sinon.sandbox.create()
    spyOnValidateMethods(sandbox)
  })

  afterEach(function () {
    sandbox.restore()
  })

  describe('when required', function () {
    beforeEach(function () {
      ctx.def = requiredDef
      Foo = Ember.Object.extend(SpreadMixin, PropTypesMixin, {
        propTypes: {
          bar: PropTypes.date.isRequired
        }
      })
    })

    describe('when initialized with date value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create({bar: new Date()})
      })

      itValidatesTheProperty(ctx, false)
      itValidatesOnUpdate(ctx, 'date', 'Expected property bar to be a date')
    })

    describe('when initialized without value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create()
      })

      itValidatesTheProperty(ctx, false, 'Missing required property bar')
      itValidatesOnUpdate(ctx, 'date', 'Expected property bar to be a date')
    })

    describe('when initialized with date value via spread property', function () {
      beforeEach(function () {
        ctx.instance = Foo.create({
          options: {
            bar: new Date()
          }
        })
      })

      itValidatesTheProperty(ctx, false)
    })

    describe('when initialized without value via spread property', function () {
      beforeEach(function () {
        ctx.instance = Foo.create({
          options: {}
        })
      })

      itValidatesTheProperty(ctx, false, 'Missing required property bar')
    })
  })

  describe('when not required', function () {
    beforeEach(function () {
      ctx.def = notRequiredDef
      Foo = Ember.Object.extend(SpreadMixin, PropTypesMixin, {
        propTypes: {
          bar: PropTypes.date
        }
      })
    })

    describe('when initialized with date value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create({bar: new Date()})
      })

      itValidatesTheProperty(ctx, false)
      itValidatesOnUpdate(ctx, 'date', 'Expected property bar to be a date')
    })

    describe('when initialized without value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create()
      })

      itValidatesTheProperty(ctx, false)
      itValidatesOnUpdate(ctx, 'date', 'Expected property bar to be a date')
    })

    describe('when initialized with date value via spread property', function () {
      beforeEach(function () {
        ctx.instance = Foo.create({
          options: {
            bar: new Date()
          }
        })
      })

      itValidatesTheProperty(ctx, false)
    })

    describe('when initialized without value via spread property', function () {
      beforeEach(function () {
        ctx.instance = Foo.create({
          options: {}
        })
      })

      itValidatesTheProperty(ctx, false)
    })
  })
})
