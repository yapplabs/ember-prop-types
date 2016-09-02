import {expect} from 'chai'
import PropTypesMixin, {helpers, PropTypes} from 'ember-prop-types/mixins/prop-types'
import {afterEach, beforeEach, describe, it} from 'mocha'

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
    let instance
    beforeEach(function () {
      sandbox.spy(helpers, 'validateProperty')
      const Component = Ember.Component.extend(PropTypesMixin, {
        getDefaultProps () {
          return {
            foo: '!foo',
            bar: 647
          }
        }
      })
      instance = Component.create()
    })

    it('calls validateProperty for each propType', function () {
      expect(instance.get('foo')).to.equal('!foo')
      expect(instance.get('bar')).to.equal(647)
    })
  })

  describe('propTypes defined with validations present on Ember.Component and Ember.Mixin', function () {
    let instance
    beforeEach(function () {
      sandbox.spy(helpers, 'validateProperty')
      const Mixin = Ember.Mixin.create(PropTypesMixin, {
        propTypes: {
          baz: PropTypes.string,
          quux: PropTypes.number
        }
      })

      const Component = Ember.Component.extend(PropTypesMixin, Mixin, {
        propTypes: {
          foo: PropTypes.string,
          bar: PropTypes.number
        }
      })
      instance = Component.create()
    })

    it('calls validateProperty for each propType', function () {
      expect(helpers.validateProperty.calledWith(instance, 'foo')).to.be.true
      expect(helpers.validateProperty.calledWith(instance, 'bar')).to.be.true
      expect(helpers.validateProperty.calledWith(instance, 'baz')).to.be.true
      expect(helpers.validateProperty.calledWith(instance, 'quux')).to.be.true
    })
  })

  describe('propTypes defined with defaults present on Ember.Object', function () {
    let instance
    beforeEach(function () {
      sandbox.spy(helpers, 'validateProperty')
      const Object = Ember.Object.extend(PropTypesMixin, {
        getDefaultProps () {
          return {
            foo: '!foo',
            bar: 647
          }
        }
      })
      instance = Object.create()
    })

    it('has defaults for each property', function () {
      expect(instance.get('foo')).to.equal('!foo')
      expect(instance.get('bar')).to.equal(647)
    })
  })

  describe('propTypes defined with defaults present on Ember.Component', function () {
    let instance
    beforeEach(function () {
      sandbox.spy(helpers, 'validateProperty')
      const Component = Ember.Component.extend(PropTypesMixin, {
        propTypes: {
          foo: PropTypes.string,
          bar: PropTypes.number
        },
        getDefaultProps () {
          return {
            foo: '!foo',
            bar: 647
          }
        }
      })
      instance = Component.create()
    })

    it('calls validateProperty for each property', function () {
      expect(helpers.validateProperty.calledWith(instance, 'foo')).to.be.true
      expect(helpers.validateProperty.calledWith(instance, 'bar')).to.be.true
    })

    it('has defaults for each property', function () {
      expect(instance.get('foo')).to.equal('!foo')
      expect(instance.get('bar')).to.equal(647)
    })
  })

  describe('propTypes defined with validations and defaults present on Ember.Object', function () {
    let instance
    beforeEach(function () {
      sandbox.spy(helpers, 'validateProperty')
      const Object = Ember.Object.extend(PropTypesMixin, {
        propTypes: {
          foo: PropTypes.string,
          bar: PropTypes.number
        },
        getDefaultProps () {
          return {
            foo: '!foo',
            bar: 647
          }
        }
      })
      instance = Object.create()
    })

    it('calls validateProperty for each property', function () {
      expect(helpers.validateProperty.calledWith(instance, 'foo')).to.be.true
      expect(helpers.validateProperty.calledWith(instance, 'bar')).to.be.true
    })

    it('has defaults for each property', function () {
      expect(instance.get('foo')).to.equal('!foo')
      expect(instance.get('bar')).to.equal(647)
    })
  })

  describe('propTypes defined with validations and defaults present on Ember.Component', function () {
    let instance
    beforeEach(function () {
      sandbox.spy(helpers, 'validateProperty')
      const Component = Ember.Component.extend(PropTypesMixin, {
        propTypes: {
          foo: PropTypes.string,
          bar: PropTypes.number
        },
        getDefaultProps () {
          return {
            foo: '!foo',
            bar: 647
          }
        }
      })
      instance = Component.create()
    })

    it('calls validateProperty for each property', function () {
      expect(instance.get('foo')).to.equal('!foo')
      expect(instance.get('bar')).to.equal(647)
    })

    it('has defaults for each property', function () {
      expect(helpers.validateProperty.calledWith(instance, 'foo')).to.be.true
      expect(helpers.validateProperty.calledWith(instance, 'bar')).to.be.true
    })
  })

  describe('propTypes defined with validations and defaults present on Ember.Component and Ember.Mixin', function () {
    let instance
    beforeEach(function () {
      sandbox.spy(helpers, 'validateProperty')
      const Mixin = Ember.Mixin.create(PropTypesMixin, {
        propTypes: {
          baz: PropTypes.string,
          quux: PropTypes.number
        },
        getDefaultProps () {
          return {
            foo: 'INVALID',
            baz: '!baz',
            quux: '!quux'
          }
        }
      })

      const Component = Ember.Component.extend(PropTypesMixin, Mixin, {
        propTypes: {
          foo: PropTypes.string,
          bar: PropTypes.number
        },
        getDefaultProps () {
          return {
            foo: '!foo',
            bar: 647
          }
        }
      })
      instance = Component.create()
    })

    it('calls validateProperty for each propType', function () {
      expect(helpers.validateProperty.calledWith(instance, 'foo')).to.be.true
      expect(helpers.validateProperty.calledWith(instance, 'bar')).to.be.true
      expect(helpers.validateProperty.calledWith(instance, 'baz')).to.be.true
      expect(helpers.validateProperty.calledWith(instance, 'quux')).to.be.true
    })

    it('has default values for each property', function () {
      expect(instance.get('foo')).to.equal('!foo')
      expect(instance.get('bar')).to.equal(647)
      expect(instance.get('baz')).to.equal('!baz')
      expect(instance.get('quux')).to.equal('!quux')
    })
  })
})
