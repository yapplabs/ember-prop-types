/**
 * Test helpers for testing a validator
 */
import {expect} from 'chai'
import Ember from 'ember'
const {Logger} = Ember
import {beforeEach, it} from 'mocha'

import {helpers} from 'ember-prop-types/mixins/prop-types'

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
 * @param {String} [warningMessage] - if present, expect Logger.warn to be called with it, else expect no warnings
 */
export function itValidatesTheProperty (ctx, warningMessage) {
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

  if (warningMessage) {
    it('should log a warning', function () {
      expect(Logger.warn).to.have.callCount(1)
      expect(Logger.warn).to.have.been.calledWith(`[${instance.toString()}]: ${warningMessage}`)
    })
  } else {
    it('should not log warning', function () {
      expect(Logger.warn).to.have.callCount(0)
    })
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
