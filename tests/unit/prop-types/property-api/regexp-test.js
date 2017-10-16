/**
 * Unit test for the PropTypes.regexp validator
 */
import EmberObject from '@ember/object'
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
  type: 'regexp'
}

const notRequiredDef = {
  isRequired: requiredDef,
  required: false,
  type: 'regexp'
}

describe('Unit / validator / PropTypes.regexp', function () {
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
      Foo = EmberObject.extend(SpreadMixin, PropTypesMixin, {
        propTypes: {
          bar: PropTypes.regexp.isRequired
        }
      })
    })

    describe('when initialized with regexp value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create({bar: /./})
      })

      itValidatesTheProperty(ctx, false)
      itValidatesOnUpdate(ctx, 'regexp', 'Expected property bar to be a regular expression')
    })

    describe('when initialized without value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create()
      })

      itValidatesTheProperty(ctx, false, 'Missing required property bar')
      itValidatesOnUpdate(ctx, 'regexp', 'Expected property bar to be a regular expression')
    })

    describe('when initialized with regexp value via spread property', function () {
      beforeEach(function () {
        ctx.instance = Foo.create({
          options: {
            bar: /./
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
      Foo = EmberObject.extend(SpreadMixin, PropTypesMixin, {
        propTypes: {
          bar: PropTypes.regexp
        }
      })
    })

    describe('when initialized with regexp value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create({bar: /./})
      })

      itValidatesTheProperty(ctx, false)
      itValidatesOnUpdate(ctx, 'regexp', 'Expected property bar to be a regular expression')
    })

    describe('when initialized without value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create()
      })

      itValidatesTheProperty(ctx, false)
      itValidatesOnUpdate(ctx, 'regexp', 'Expected property bar to be a regular expression')
    })

    describe('when initialized with regexp value via spread property', function () {
      beforeEach(function () {
        ctx.instance = Foo.create({
          options: {
            bar: /./
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
