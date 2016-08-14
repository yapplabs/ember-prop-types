import {expect} from 'chai'
import Ember from 'ember'
const {Logger} = Ember
import PropTypesMixin, {helpers, PropTypes} from 'ember-prop-types/mixins/prop-types'
import {afterEach, beforeEach, describe, it} from 'mocha'

describe('PropTypes.shape', function () {
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

  describe('when required and sub-property required', function () {
    let def, Foo

    beforeEach(function () {
      def = {
        required: true,
        type: 'shape',
        typeDefs: {
          baz: {
            required: true,
            type: 'string'
          }
        }
      }

      Foo = Ember.Object.extend(PropTypesMixin, {
        propTypes: {
          bar: PropTypes.shape({
            baz: PropTypes.string.isRequired
          }).isRequired
        }
      })
    })

    describe('when initialized with correct shape value', function () {
      let instance

      beforeEach(function () {
        instance = Foo.create({
          bar: {
            baz: 'test'
          }
        })
      })

      it('validates prop-types for instance', function () {
        expect(helpers.validatePropTypes.lastCall.args).to.eql([instance])
      })

      it('validates property "bar"', function () {
        expect(helpers.validateProperty.lastCall.args).to.eql([instance, 'bar', def])
      })

      it('does not log warning', function () {
        expect(Logger.warn.callCount).to.equal(0)
      })
    })

    describe('when initialized with shape missing sub-property', function () {
      let instance

      beforeEach(function () {
        instance = Foo.create({
          bar: {}
        })
      })

      it('validates prop-types for instance', function () {
        expect(helpers.validatePropTypes.lastCall.args).to.eql([instance])
      })

      it('validates property "bar"', function () {
        expect(helpers.validateProperty.lastCall.args).to.eql([instance, 'bar', def])
      })

      it('logs warning', function () {
        expect(Logger.warn.callCount).to.equal(1)
        expect(Logger.warn.lastCall.args).to.eql(['Property bar does not match the given shape'])
      })
    })

    describe('when initialized with incorrect shape value', function () {
      let instance

      beforeEach(function () {
        instance = Foo.create({
          bar: {
            spam: 'test'
          }
        })
      })

      it('validates prop-types for instance', function () {
        expect(helpers.validatePropTypes.lastCall.args).to.eql([instance])
      })

      it('validates property "bar"', function () {
        expect(helpers.validateProperty.lastCall.args).to.eql([instance, 'bar', def])
      })

      it('does not log warning', function () {
        expect(Logger.warn.callCount).to.equal(1)
        expect(Logger.warn.lastCall.args).to.eql(['Property bar does not match the given shape'])
      })
    })

    describe('when initialized with number value', function () {
      let instance

      beforeEach(function () {
        instance = Foo.create({bar: 1})
      })

      it('validates prop-types for instance', function () {
        expect(helpers.validatePropTypes.lastCall.args).to.eql([instance])
      })

      it('validates property "bar"', function () {
        expect(helpers.validateProperty.lastCall.args).to.eql([instance, 'bar', def])
      })

      it('logs warning', function () {
        expect(Logger.warn.callCount).to.equal(1)
        expect(Logger.warn.lastCall.args).to.eql(['Property bar does not match the given shape'])
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
        expect(helpers.validateProperty.lastCall.args).to.eql([instance, 'bar', def])
      })

      it('logs warning', function () {
        expect(Logger.warn.callCount).to.equal(1)
        expect(Logger.warn.lastCall.args).to.eql(['Missing required property bar'])
      })
    })
  })

  describe('when required and sub-property not required', function () {
    let def, Foo

    beforeEach(function () {
      def = {
        required: true,
        type: 'shape',
        typeDefs: {
          baz: {
            isRequired: {
              required: true,
              type: 'string'
            },
            required: false,
            type: 'string'
          }
        }
      }

      Foo = Ember.Object.extend(PropTypesMixin, {
        propTypes: {
          bar: PropTypes.shape({
            baz: PropTypes.string
          }).isRequired
        }
      })
    })

    describe('when initialized with correct shape value', function () {
      let instance

      beforeEach(function () {
        instance = Foo.create({
          bar: {
            baz: 'test'
          }
        })
      })

      it('validates prop-types for instance', function () {
        expect(helpers.validatePropTypes.lastCall.args).to.eql([instance])
      })

      it('validates property "bar"', function () {
        expect(helpers.validateProperty.lastCall.args).to.eql([instance, 'bar', def])
      })

      it('does not log warning', function () {
        expect(Logger.warn.callCount).to.equal(0)
      })
    })

    describe('when initialized with shape missing sub-property', function () {
      let instance

      beforeEach(function () {
        instance = Foo.create({
          bar: {}
        })
      })

      it('validates prop-types for instance', function () {
        expect(helpers.validatePropTypes.lastCall.args).to.eql([instance])
      })

      it('validates property "bar"', function () {
        expect(helpers.validateProperty.lastCall.args).to.eql([instance, 'bar', def])
      })

      it('does not log warning', function () {
        expect(Logger.warn.callCount).to.equal(0)
      })
    })

    describe('when initialized with incorrect shape value', function () {
      let instance

      beforeEach(function () {
        instance = Foo.create({
          bar: {
            spam: 'test'
          }
        })
      })

      it('validates prop-types for instance', function () {
        expect(helpers.validatePropTypes.lastCall.args).to.eql([instance])
      })

      it('validates property "bar"', function () {
        expect(helpers.validateProperty.lastCall.args).to.eql([instance, 'bar', def])
      })

      it('logs warning', function () {
        expect(Logger.warn.callCount).to.equal(1)
        expect(Logger.warn.lastCall.args).to.eql(['Property bar does not match the given shape'])
      })
    })

    describe('when initialized with number value', function () {
      let instance

      beforeEach(function () {
        instance = Foo.create({bar: 1})
      })

      it('validates prop-types for instance', function () {
        expect(helpers.validatePropTypes.lastCall.args).to.eql([instance])
      })

      it('validates property "bar"', function () {
        expect(helpers.validateProperty.lastCall.args).to.eql([instance, 'bar', def])
      })

      it('logs warning', function () {
        expect(Logger.warn.callCount).to.equal(1)
        expect(Logger.warn.lastCall.args).to.eql(['Property bar does not match the given shape'])
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
        expect(helpers.validateProperty.lastCall.args).to.eql([instance, 'bar', def])
      })

      it('logs warning', function () {
        expect(Logger.warn.callCount).to.equal(1)
        expect(Logger.warn.lastCall.args).to.eql(['Missing required property bar'])
      })
    })
  })

  describe('when not required and sub-property is required', function () {
    let def, Foo

    beforeEach(function () {
      def = {
        isRequired: {
          required: true,
          type: 'shape',
          typeDefs: {
            baz: {
              required: true,
              type: 'string'
            }
          }
        },
        required: false,
        type: 'shape',
        typeDefs: {
          baz: {
            required: true,
            type: 'string'
          }
        }
      }

      Foo = Ember.Object.extend(PropTypesMixin, {
        propTypes: {
          bar: PropTypes.shape({
            baz: PropTypes.string.isRequired
          })
        }
      })
    })

    describe('when initialized with correct shape value', function () {
      let instance

      beforeEach(function () {
        instance = Foo.create({
          bar: {
            baz: 'test'
          }
        })
      })

      it('validates prop-types for instance', function () {
        expect(helpers.validatePropTypes.lastCall.args).to.eql([instance])
      })

      it('validates property "bar"', function () {
        expect(helpers.validateProperty.lastCall.args).to.eql([instance, 'bar', def])
      })

      it('does not log warning', function () {
        expect(Logger.warn.callCount).to.equal(0)
      })
    })

    describe('when initialized with shape missing sub-property', function () {
      let instance

      beforeEach(function () {
        instance = Foo.create({
          bar: {}
        })
      })

      it('validates prop-types for instance', function () {
        expect(helpers.validatePropTypes.lastCall.args).to.eql([instance])
      })

      it('validates property "bar"', function () {
        expect(helpers.validateProperty.lastCall.args).to.eql([instance, 'bar', def])
      })

      it('logs warning', function () {
        expect(Logger.warn.callCount).to.equal(1)
        expect(Logger.warn.lastCall.args).to.eql(['Property bar does not match the given shape'])
      })
    })

    describe('when initialized with incorrect shape value', function () {
      let instance

      beforeEach(function () {
        instance = Foo.create({
          bar: {
            spam: 'test'
          }
        })
      })

      it('validates prop-types for instance', function () {
        expect(helpers.validatePropTypes.lastCall.args).to.eql([instance])
      })

      it('validates property "bar"', function () {
        expect(helpers.validateProperty.lastCall.args).to.eql([instance, 'bar', def])
      })

      it('logs warning', function () {
        expect(Logger.warn.callCount).to.equal(1)
        expect(Logger.warn.lastCall.args).to.eql(['Property bar does not match the given shape'])
      })
    })

    describe('when initialized with number value', function () {
      let instance

      beforeEach(function () {
        instance = Foo.create({bar: 1})
      })

      it('validates prop-types for instance', function () {
        expect(helpers.validatePropTypes.lastCall.args).to.eql([instance])
      })

      it('validates property "bar"', function () {
        expect(helpers.validateProperty.lastCall.args).to.eql([instance, 'bar', def])
      })

      it('logs warning', function () {
        expect(Logger.warn.callCount).to.equal(1)
        expect(Logger.warn.lastCall.args).to.eql(['Property bar does not match the given shape'])
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
        expect(helpers.validateProperty.lastCall.args).to.eql([instance, 'bar', def])
      })

      it('does not log warning', function () {
        expect(Logger.warn.callCount).to.equal(0)
      })
    })
  })

  describe('when not required and sub-property is not required', function () {
    let def, Foo

    beforeEach(function () {
      def = {
        isRequired: {
          required: true,
          type: 'shape',
          typeDefs: {
            baz: {
              isRequired: {
                required: true,
                type: 'string'
              },
              required: false,
              type: 'string'
            }
          }
        },
        required: false,
        type: 'shape',
        typeDefs: {
          baz: {
            isRequired: {
              required: true,
              type: 'string'
            },
            required: false,
            type: 'string'
          }
        }
      }

      Foo = Ember.Object.extend(PropTypesMixin, {
        propTypes: {
          bar: PropTypes.shape({
            baz: PropTypes.string
          })
        }
      })
    })

    describe('when initialized with correct shape value', function () {
      let instance

      beforeEach(function () {
        instance = Foo.create({
          bar: {
            baz: 'test'
          }
        })
      })

      it('validates prop-types for instance', function () {
        expect(helpers.validatePropTypes.lastCall.args).to.eql([instance])
      })

      it('validates property "bar"', function () {
        expect(helpers.validateProperty.lastCall.args).to.eql([instance, 'bar', def])
      })

      it('does not log warning', function () {
        expect(Logger.warn.callCount).to.equal(0)
      })
    })

    describe('when initialized with shape missing sub-property', function () {
      let instance

      beforeEach(function () {
        instance = Foo.create({
          bar: {}
        })
      })

      it('validates prop-types for instance', function () {
        expect(helpers.validatePropTypes.lastCall.args).to.eql([instance])
      })

      it('validates property "bar"', function () {
        expect(helpers.validateProperty.lastCall.args).to.eql([instance, 'bar', def])
      })

      it('does not log warning', function () {
        expect(Logger.warn.callCount).to.equal(0)
      })
    })

    describe('when initialized with incorrect shape value', function () {
      let instance

      beforeEach(function () {
        instance = Foo.create({
          bar: {
            spam: 'test'
          }
        })
      })

      it('validates prop-types for instance', function () {
        expect(helpers.validatePropTypes.lastCall.args).to.eql([instance])
      })

      it('validates property "bar"', function () {
        expect(helpers.validateProperty.lastCall.args).to.eql([instance, 'bar', def])
      })

      it('logs warning', function () {
        expect(Logger.warn.callCount).to.equal(1)
        expect(Logger.warn.lastCall.args).to.eql(['Property bar does not match the given shape'])
      })
    })

    describe('when initialized with number value', function () {
      let instance

      beforeEach(function () {
        instance = Foo.create({bar: 1})
      })

      it('validates prop-types for instance', function () {
        expect(helpers.validatePropTypes.lastCall.args).to.eql([instance])
      })

      it('validates property "bar"', function () {
        expect(helpers.validateProperty.lastCall.args).to.eql([instance, 'bar', def])
      })

      it('logs warning', function () {
        expect(Logger.warn.callCount).to.equal(1)
        expect(Logger.warn.lastCall.args).to.eql(['Property bar does not match the given shape'])
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
        expect(helpers.validateProperty.lastCall.args).to.eql([instance, 'bar', def])
      })

      it('does not log warning', function () {
        expect(Logger.warn.callCount).to.equal(0)
      })
    })
  })
})
