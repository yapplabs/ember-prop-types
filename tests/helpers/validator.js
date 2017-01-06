/**
 * Test helpers for testing a validator
 */
import {expect} from 'chai'
import Ember from 'ember'
const {Logger} = Ember
import config from 'ember-get-config'
import {beforeEach, describe, it} from 'mocha'

import {helpers} from 'ember-prop-types/mixins/prop-types'

export function itValidatesOnUpdate (ctx, type, warningMessage) {
  describe('when throwErrors not set', function () {
    beforeEach(function () {
      config['ember-prop-types'] = {
        validateOnUpdate: true
      }

      Logger.warn.reset()
    })

    describe('with array value', function () {
      beforeEach(function () {
        ctx.instance.set('bar', [])
      })

      if (type === 'array') {
        itValidatesTheProperty(ctx, false)
      } else {
        itValidatesTheProperty(ctx, false, warningMessage)
      }
    })

    describe('with boolean value', function () {
      beforeEach(function () {
        ctx.instance.set('bar', false)
      })

      if (type === 'bool') {
        itValidatesTheProperty(ctx, false)
      } else {
        itValidatesTheProperty(ctx, false, warningMessage)
      }
    })

    describe('with element value', function () {
      beforeEach(function () {
        ctx.instance.set('bar', document.createElement('span'))
      })

      if (['element', 'object'].indexOf(type) !== -1) {
        itValidatesTheProperty(ctx, false)
      } else {
        itValidatesTheProperty(ctx, false, warningMessage)
      }
    })

    describe('with function value', function () {
      beforeEach(function () {
        ctx.instance.set('bar', () => {})
      })

      if (type === 'func') {
        itValidatesTheProperty(ctx, false)
      } else {
        itValidatesTheProperty(ctx, false, warningMessage)
      }
    })

    describe('with null value', function () {
      beforeEach(function () {
        ctx.instance.set('bar', null)
      })

      if (type === 'null') {
        itValidatesTheProperty(ctx, false)
      } else {
        itValidatesTheProperty(ctx, false, warningMessage)
      }
    })

    describe('with number value', function () {
      beforeEach(function () {
        ctx.instance.set('bar', 2)
      })

      if (type === 'number') {
        itValidatesTheProperty(ctx, false)
      } else {
        itValidatesTheProperty(ctx, false, warningMessage)
      }
    })

    describe('with object value', function () {
      beforeEach(function () {
        ctx.instance.set('bar', {})
      })

      if (type === 'object') {
        itValidatesTheProperty(ctx, false)
      } else {
        itValidatesTheProperty(ctx, false, warningMessage)
      }
    })

    describe('with string value', function () {
      beforeEach(function () {
        ctx.instance.set('bar', 'spam')
      })

      if (type === 'string') {
        itValidatesTheProperty(ctx, false)
      } else {
        itValidatesTheProperty(ctx, false, warningMessage)
      }
    })

    describe('with symbol value', function () {
      beforeEach(function () {
        ctx.instance.set('bar', Symbol())
      })

      if (['object', 'symbol'].indexOf(type) !== -1) {
        itValidatesTheProperty(ctx, false)
      } else {
        itValidatesTheProperty(ctx, false, warningMessage)
      }
    })
  })

  describe('when throwErrors set to false', function () {
    beforeEach(function () {
      config['ember-prop-types'] = {
        throwErrors: false,
        validateOnUpdate: true
      }

      Logger.warn.reset()
    })

    describe('with array value', function () {
      beforeEach(function () {
        ctx.instance.set('bar', [])
      })

      if (type === 'array') {
        itValidatesTheProperty(ctx, false)
      } else {
        itValidatesTheProperty(ctx, false, warningMessage)
      }
    })

    describe('with boolean value', function () {
      beforeEach(function () {
        ctx.instance.set('bar', false)
      })

      if (type === 'bool') {
        itValidatesTheProperty(ctx, false)
      } else {
        itValidatesTheProperty(ctx, false, warningMessage)
      }
    })

    describe('with element value', function () {
      beforeEach(function () {
        ctx.instance.set('bar', document.createElement('span'))
      })

      if (['element', 'object'].indexOf(type) !== -1) {
        itValidatesTheProperty(ctx, false)
      } else {
        itValidatesTheProperty(ctx, false, warningMessage)
      }
    })

    describe('with function value', function () {
      beforeEach(function () {
        ctx.instance.set('bar', () => {})
      })

      if (type === 'func') {
        itValidatesTheProperty(ctx, false)
      } else {
        itValidatesTheProperty(ctx, false, warningMessage)
      }
    })

    describe('with null value', function () {
      beforeEach(function () {
        ctx.instance.set('bar', null)
      })

      if (type === 'null') {
        itValidatesTheProperty(ctx, false)
      } else {
        itValidatesTheProperty(ctx, false, warningMessage)
      }
    })

    describe('with number value', function () {
      beforeEach(function () {
        ctx.instance.set('bar', 2)
      })

      if (type === 'number') {
        itValidatesTheProperty(ctx, false)
      } else {
        itValidatesTheProperty(ctx, false, warningMessage)
      }
    })

    describe('with object value', function () {
      beforeEach(function () {
        ctx.instance.set('bar', {})
      })

      if (type === 'object') {
        itValidatesTheProperty(ctx, false)
      } else {
        itValidatesTheProperty(ctx, false, warningMessage)
      }
    })

    describe('with string value', function () {
      beforeEach(function () {
        ctx.instance.set('bar', 'spam')
      })

      if (type === 'string') {
        itValidatesTheProperty(ctx, false)
      } else {
        itValidatesTheProperty(ctx, false, warningMessage)
      }
    })

    describe('with symbol value', function () {
      beforeEach(function () {
        ctx.instance.set('bar', Symbol())
      })

      if (['object', 'symbol'].indexOf(type) !== -1) {
        itValidatesTheProperty(ctx, false)
      } else {
        itValidatesTheProperty(ctx, false, warningMessage)
      }
    })
  })
}

/**
 * Ensure that the proper validation methods are called and that no warning is logged
 *
 * NOTE: you must first call spyOnValidateMethods() to set up the stubs/spies this helper depends on
 * and don't forget, that has to be BEFORE you create your object and its init() method is called.
 *
 * @param {Object} ctx - the test context
 * @param {Object} ctx.def - the propType definition
 * @param {Object} ctx.instance - the object instance that has the mixin
 * @param {String} ctx.propertyName - the object instance that has the mixin
 * @param {Boolean} throwErrors - whether or not errors should be thrown
 * @param {String[]} [warningMessages] - if present, expect Logger.warn to be called with them, else expect no warnings
 */
export function itValidatesTheProperty (ctx, throwErrors, ...warningMessages) {
  let def, instance, propertyName

  beforeEach(function () {
    def = ctx.def
    instance = ctx.instance
    propertyName = ctx.propertyName
  })

  it('should validate prop-types for instance', function () {
    expect(helpers.validatePropTypes).to.have.been.calledWith(instance)
  })

  it(`should validate the property "${ctx.propertyName}"`, function () {
    expect(helpers.validateProperty).to.have.been.calledWith(instance, propertyName, def)
  })

  if (throwErrors) {
    it('should not log warning', function () {
      expect(Logger.warn).to.have.callCount(0)
    })
  } else {
    if (warningMessages.length > 0) {
      it('should log warning(s)', function () {
        expect(Logger.warn).to.have.callCount(warningMessages.length)
        warningMessages.forEach((msg) => {
          expect(Logger.warn).to.have.been.calledWith(`[${instance.toString()}]: ${msg}`)
        })
      })
    } else {
      it('should not log warning', function () {
        expect(Logger.warn).to.have.callCount(0)
      })
    }
  }
}

/**
 * Spy/stub the appropriate validation methods used by the itValidatesTheProperty() helper
 * @param {*} sandbox - the sinon sandbox instance to use to stub/spy
 */
export function spyOnValidateMethods (sandbox) {
  sandbox.spy(helpers, 'validatePropTypes')
  sandbox.spy(helpers, 'validateProperty')
  sandbox.stub(Logger, 'warn')
}
