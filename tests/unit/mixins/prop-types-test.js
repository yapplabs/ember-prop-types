const expect = chai.expect

import {afterEach, beforeEach, describe, it} from 'mocha'
import PropTypesMixin, {helpers, PropTypes} from 'ember-prop-types/mixins/prop-types'

describe('prop-types', function () {
  let sandbox

  beforeEach(function () {
    sandbox = sinon.sandbox.create()
  })

  afterEach(function () {
    sandbox.restore()
  })

  describe('propTypes not defined on Ember.Object', function () {
    beforeEach(function () {
      sandbox.spy(helpers, 'validateProperty')
      const Object = Ember.Object.extend(PropTypesMixin, {})
      Object.create()
    })

    it('does not call validateProperty', function () {
      expect(helpers.validateProperty.called).to.be.false
    })
  })

  describe('propTypes not defined on Ember.Component', function () {
    beforeEach(function () {
      sandbox.spy(helpers, 'validateProperty')
      const Component = Ember.Component.extend(PropTypesMixin, {})
      Component.create()
    })

    it('does not call validateProperty', function () {
      expect(helpers.validateProperty.called).to.be.false
    })
  })

  describe('propTypes defined but empty on Ember.Object', function () {
    beforeEach(function () {
      sandbox.spy(helpers, 'validateProperty')
      const Object = Ember.Object.extend(PropTypesMixin, {
        propTypes: {}
      })
      Object.create()
    })

    it('does not call validateProperty', function () {
      expect(helpers.validateProperty.called).to.be.false
    })
  })

  describe('propTypes defined but empty on Ember.Component', function () {
    beforeEach(function () {
      sandbox.spy(helpers, 'validateProperty')
      const Component = Ember.Component.extend(PropTypesMixin, {
        propTypes: {}
      })
      Component.create()
    })

    it('does not call validateProperty', function () {
      expect(helpers.validateProperty.called).to.be.false
    })
  })

  describe('propTypes defined but unknown type on Ember.Object', function () {
    beforeEach(function () {
      sandbox.spy(Ember.Logger, 'warn')
      sandbox.spy(helpers, 'validateProperty')
      const Object = Ember.Object.extend(PropTypesMixin, {
        propTypes: {
          foo: PropTypes.doesNotExist
        }
      })
      Object.create()
    })

    it('does not call validateProperty', function () {
      expect(helpers.validateProperty.called).to.be.false
    })

    it('logs warning message', function () {
      expect(Ember.Logger.warn.called).to.be.true
    })
  })

  describe('propTypes defined but unknown type on Ember.Component', function () {
    beforeEach(function () {
      sandbox.spy(Ember.Logger, 'warn')
      sandbox.spy(helpers, 'validateProperty')
      const Component = Ember.Component.extend(PropTypesMixin, {
        propTypes: {
          foo: PropTypes.doesNotExist
        }
      })
      Component.create()
    })

    it('does not call validateProperty', function () {
      expect(helpers.validateProperty.called).to.be.false
    })

    it('logs warning message', function () {
      expect(Ember.Logger.warn.called).to.be.true
    })
  })

  describe('propTypes defined with validations present on Ember.Object', function () {
    beforeEach(function () {
      sandbox.spy(helpers, 'validateProperty')
      const Object = Ember.Object.extend(PropTypesMixin, {
        propTypes: {
          foo: PropTypes.string,
          bar: PropTypes.number
        }
      })
      Object.create()
    })

    it('calls validateProperty for each propType', function () {
      expect(helpers.validateProperty.called).to.be.true
    })
  })

  describe('propTypes defined with validations present on Ember.Component', function () {
    beforeEach(function () {
      sandbox.spy(helpers, 'validateProperty')
      const Component = Ember.Component.extend(PropTypesMixin, {
        propTypes: {
          foo: PropTypes.string,
          bar: PropTypes.number
        }
      })
      Component.create()
    })

    it('calls validateProperty for each propType', function () {
      expect(helpers.validateProperty.called).to.be.true
    })
  })
})
