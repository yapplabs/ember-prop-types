import {expect} from 'chai'
import Ember from 'ember'
const {Logger} = Ember
import PropTypesMixin, {helpers, PropTypes} from 'ember-prop-types/mixins/prop-types'
import {afterEach, beforeEach, describe, it} from 'mocha'

const requiredDef = {
  required: true,
  type: 'element'
}

const notRequiredDef = {
  isRequired: requiredDef,
  required: false,
  type: 'element'
}

describe('PropTypes.element', function () {
  let sandbox

  beforeEach(function () {
    sandbox = sinon.sandbox.create()
    sandbox.spy(helpers, 'validateProperty')
    sandbox.spy(helpers, 'validatePropTypes')
    sandbox.stub(Logger, 'warn')
  })

  afterEach(function () {
    sandbox.restore()
  })

  describe('when required', function () {
    let Foo

    beforeEach(function () {
      Foo = Ember.Object.extend(PropTypesMixin, {
        propTypes: {
          bar: PropTypes.element.isRequired
        }
      })
    })

    describe('when initialized with element value', function () {
      let instance

      beforeEach(function () {
        instance = Foo.create({bar: document.createElement('div')})
      })

      it('validates prop-types for instance', function () {
        expect(helpers.validatePropTypes.lastCall.args).to.eql([instance])
      })

      it('validates property "bar"', function () {
        expect(helpers.validateProperty.lastCall.args).to.eql([instance, 'bar', requiredDef])
      })

      it('does not log warning', function () {
        expect(Logger.warn.callCount).to.equal(0)
      })
    })

    describe('when initialized with string value', function () {
      let instance

      beforeEach(function () {
        instance = Foo.create({bar: 'baz'})
      })

      it('validates prop-types for instance', function () {
        expect(helpers.validatePropTypes.lastCall.args).to.eql([instance])
      })

      it('validates property "bar"', function () {
        expect(helpers.validateProperty.lastCall.args).to.eql([instance, 'bar', requiredDef])
      })

      it('logs warning', function () {
        expect(Logger.warn.callCount).to.equal(1)
        expect(Logger.warn.lastCall.args).to.eql(['Expected property bar to be an element'])
      })
    })

    describe('when initialized without value', function () {
      let instance

      beforeEach(function () {
        instance = Foo.create()
      })

      it('validates prop-types for instance', function () {
        expect(helpers.validatePropTypes.lastCall.args).to.eql([instance])
      })

      it('validates property "bar"', function () {
        expect(helpers.validateProperty.lastCall.args).to.eql([instance, 'bar', requiredDef])
      })

      it('logs warning', function () {
        expect(Logger.warn.callCount).to.equal(1)
        expect(Logger.warn.lastCall.args).to.eql(['Missing required property bar'])
      })
    })
  })

  describe('when not required', function () {
    let Foo

    beforeEach(function () {
      Foo = Ember.Object.extend(PropTypesMixin, {
        propTypes: {
          bar: PropTypes.element
        }
      })
    })

    describe('when initialized with element value', function () {
      let instance

      beforeEach(function () {
        instance = Foo.create({bar: document.createElement('div')})
      })

      it('validates prop-types for instance', function () {
        expect(helpers.validatePropTypes.lastCall.args).to.eql([instance])
      })

      it('validates property "bar"', function () {
        expect(helpers.validateProperty.lastCall.args).to.eql([instance, 'bar', notRequiredDef])
      })

      it('does not log warning', function () {
        expect(Logger.warn.callCount).to.equal(0)
      })
    })

    describe('when initialized with string value', function () {
      let instance

      beforeEach(function () {
        instance = Foo.create({bar: 'baz'})
      })

      it('validates prop-types for instance', function () {
        expect(helpers.validatePropTypes.lastCall.args).to.eql([instance])
      })

      it('validates property "bar"', function () {
        expect(helpers.validateProperty.lastCall.args).to.eql([instance, 'bar', notRequiredDef])
      })

      it('logs warning', function () {
        expect(Logger.warn.callCount).to.equal(1)
        expect(Logger.warn.lastCall.args).to.eql(['Expected property bar to be an element'])
      })
    })

    describe('when initialized without value', function () {
      let instance

      beforeEach(function () {
        instance = Foo.create()
      })

      it('validates prop-types for instance', function () {
        expect(helpers.validatePropTypes.lastCall.args).to.eql([instance])
      })

      it('validates property "bar"', function () {
        expect(helpers.validateProperty.lastCall.args).to.eql([instance, 'bar', notRequiredDef])
      })

      it('does not log warning', function () {
        expect(Logger.warn.callCount).to.equal(0)
      })
    })
  })
})
