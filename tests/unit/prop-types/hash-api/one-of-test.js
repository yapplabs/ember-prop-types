/**
 * Unit test for the PropTypes.oneOf validator
 */
import EmberObject from '@ember/object'

import {expect} from 'chai'
import Ember from 'ember'
const {Logger} = Ember
import {afterEach, beforeEach, describe, it} from 'mocha'
import sinon from 'sinon'

import {
  itValidatesTheProperty,
  spyOnValidateMethods
} from 'dummy/tests/helpers/validator'
import PropTypesMixin, {PropTypes} from 'ember-prop-types/mixins/prop-types'

const requiredDef = {
  required: true,
  type: 'oneOf',
  valueOptions: ['alpha', 'bravo']
}

const notRequiredDef = {
  required: false,
  type: 'oneOf',
  valueOptions: ['alpha', 'bravo']
}

describe('Unit / validator / PropTypes.oneOf', function () {
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
      Foo = EmberObject.extend(PropTypesMixin, {
        propTypes: {
          bar: PropTypes.oneOf(
            [
              'alpha',
              'bravo'
            ],
            {
              required: true
            }
          )
        }
      })
    })

    describe('when initialized with valid value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create({bar: 'alpha'})
      })

      itValidatesTheProperty(ctx, false)
    })

    describe('when initialized with another valid value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create({bar: 'bravo'})
      })

      itValidatesTheProperty(ctx, false)
    })

    describe('when initialized with invalid value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create({bar: 'charlie'})
      })

      itValidatesTheProperty(ctx, false, 'Property bar is not one of: alpha, bravo')
    })

    describe('when initialized without value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create()
      })

      itValidatesTheProperty(ctx, false, 'Missing required property bar')
    })
  })

  describe('when not required', function () {
    beforeEach(function () {
      ctx.def = notRequiredDef
      Foo = EmberObject.extend(PropTypesMixin, {
        propTypes: {
          bar: PropTypes.oneOf(
            [
              'alpha',
              'bravo'
            ],
            {
              required: false
            }
          )
        }
      })
    })

    describe('when initialized with valid value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create({bar: 'alpha'})
      })

      itValidatesTheProperty(ctx, false)
    })

    describe('when initialized with another valid value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create({bar: 'bravo'})
      })

      itValidatesTheProperty(ctx, false)
    })

    describe('when initialized with invalid value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create({bar: 'charlie'})
      })

      itValidatesTheProperty(ctx, false, 'Property bar is not one of: alpha, bravo')
    })

    describe('when initialized without value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create()
      })

      itValidatesTheProperty(ctx, false)
    })
  })

  describe('when updatable', function () {
    beforeEach(function () {
      console.warn.reset()

      ctx.def = {
        required: false,
        type: 'oneOf',
        updatable: true
      }

      const Foo = EmberObject.extend(PropTypesMixin, {
        propTypes: {
          bar: PropTypes.oneOf(['foo', 'bar'], {updatable: true})
        }
      })

      ctx.instance = Foo.create({bar: 'foo'})
    })

    describe('when updated', function () {
      beforeEach(function () {
        ctx.instance.set('bar', 'bar')
      })

      it('should not log warning', function () {
        expect(console.warn.called).to.equal(false)
      })
    })
  })

  describe('when not updatable', function () {
    beforeEach(function () {
      console.warn.reset()

      ctx.def = {
        required: false,
        type: 'oneOf',
        updatable: false
      }

      const Foo = EmberObject.extend(PropTypesMixin, {
        propTypes: {
          bar: PropTypes.oneOf(['foo', 'bar'], {updatable: false})
        }
      })

      ctx.instance = Foo.create({bar: 'foo'})
    })

    describe('when updated', function () {
      beforeEach(function () {
        ctx.instance.set('bar', 'bar')
      })

      it('should log warning', function () {
        expect(console.warn.called).to.equal(true)
        expect(console.warn).to.have.been.calledWith(
          `[${ctx.instance.toString()}]: bar should not be updated`
        )
      })
    })
  })
})
