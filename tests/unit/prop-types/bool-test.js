/**
 * Unit test for the PropTypes.bool validator
 */
import Ember from 'ember'
const {Logger} = Ember
import {afterEach, beforeEach, describe} from 'mocha'
import sinon from 'sinon'

import {itValidatesTheProperty, spyOnValidateMethods} from 'dummy/tests/helpers/validator'
import PropTypesMixin, {PropTypes} from 'ember-prop-types/mixins/prop-types'

const requiredDef = {
  required: true,
  type: 'bool'
}

const notRequiredDef = {
  isRequired: requiredDef,
  required: false,
  type: 'bool'
}

describe('Unit / validator / PropTypes.bool', function () {
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
      Foo = Ember.Object.extend(PropTypesMixin, {
        propTypes: {
          bar: PropTypes.bool.isRequired
        }
      })
    })

    describe('when initialized with boolean value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create({bar: true})
      })

      itValidatesTheProperty(ctx)

      describe('when updated with array value', function () {
        beforeEach(function () {
          Logger.warn.reset()
          ctx.instance.set('bar', [])
        })

        itValidatesTheProperty(ctx, 'Expected property bar to be a boolean')
      })

      describe('when updated with boolean value', function () {
        beforeEach(function () {
          Logger.warn.reset()
          ctx.instance.set('bar', false)
        })

        itValidatesTheProperty(ctx)
      })

      describe('when updated with null value', function () {
        beforeEach(function () {
          Logger.warn.reset()
          ctx.instance.set('bar', null)
        })

        itValidatesTheProperty(ctx, 'Expected property bar to be a boolean')
      })

      describe('when updated with number value', function () {
        beforeEach(function () {
          Logger.warn.reset()
          ctx.instance.set('bar', 2)
        })

        itValidatesTheProperty(ctx, 'Expected property bar to be a boolean')
      })

      describe('when updated with object value', function () {
        beforeEach(function () {
          Logger.warn.reset()
          ctx.instance.set('bar', {})
        })

        itValidatesTheProperty(ctx, 'Expected property bar to be a boolean')
      })

      describe('when updated with string value', function () {
        beforeEach(function () {
          Logger.warn.reset()
          ctx.instance.set('bar', 'baz')
        })

        itValidatesTheProperty(ctx, 'Expected property bar to be a boolean')
      })
    })

    describe('when initialized with number value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create({bar: 1})
      })

      itValidatesTheProperty(ctx, 'Expected property bar to be a boolean')

      describe('when updated with array value', function () {
        beforeEach(function () {
          Logger.warn.reset()
          ctx.instance.set('bar', [])
        })

        itValidatesTheProperty(ctx, 'Expected property bar to be a boolean')
      })

      describe('when updated with boolean value', function () {
        beforeEach(function () {
          Logger.warn.reset()
          ctx.instance.set('bar', false)
        })

        itValidatesTheProperty(ctx)
      })

      describe('when updated with null value', function () {
        beforeEach(function () {
          Logger.warn.reset()
          ctx.instance.set('bar', null)
        })

        itValidatesTheProperty(ctx, 'Expected property bar to be a boolean')
      })

      describe('when updated with number value', function () {
        beforeEach(function () {
          Logger.warn.reset()
          ctx.instance.set('bar', 2)
        })

        itValidatesTheProperty(ctx, 'Expected property bar to be a boolean')
      })

      describe('when updated with object value', function () {
        beforeEach(function () {
          Logger.warn.reset()
          ctx.instance.set('bar', {})
        })

        itValidatesTheProperty(ctx, 'Expected property bar to be a boolean')
      })

      describe('when updated with string value', function () {
        beforeEach(function () {
          Logger.warn.reset()
          ctx.instance.set('bar', 'baz')
        })

        itValidatesTheProperty(ctx, 'Expected property bar to be a boolean')
      })
    })

    describe('when initialized without value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create()
      })

      itValidatesTheProperty(ctx, 'Missing required property bar')

      describe('when updated with array value', function () {
        beforeEach(function () {
          Logger.warn.reset()
          ctx.instance.set('bar', [])
        })

        itValidatesTheProperty(ctx, 'Expected property bar to be a boolean')
      })

      describe('when updated with boolean value', function () {
        beforeEach(function () {
          Logger.warn.reset()
          ctx.instance.set('bar', false)
        })

        itValidatesTheProperty(ctx)
      })

      describe('when updated with null value', function () {
        beforeEach(function () {
          Logger.warn.reset()
          ctx.instance.set('bar', null)
        })

        itValidatesTheProperty(ctx, 'Expected property bar to be a boolean')
      })

      describe('when updated with number value', function () {
        beforeEach(function () {
          Logger.warn.reset()
          ctx.instance.set('bar', 2)
        })

        itValidatesTheProperty(ctx, 'Expected property bar to be a boolean')
      })

      describe('when updated with object value', function () {
        beforeEach(function () {
          Logger.warn.reset()
          ctx.instance.set('bar', {})
        })

        itValidatesTheProperty(ctx, 'Expected property bar to be a boolean')
      })

      describe('when updated with string value', function () {
        beforeEach(function () {
          Logger.warn.reset()
          ctx.instance.set('bar', 'baz')
        })

        itValidatesTheProperty(ctx, 'Expected property bar to be a boolean')
      })
    })
  })

  describe('when not required', function () {
    beforeEach(function () {
      ctx.def = notRequiredDef
      Foo = Ember.Object.extend(PropTypesMixin, {
        propTypes: {
          bar: PropTypes.bool
        }
      })
    })

    describe('when initialized with boolean value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create({bar: true})
      })

      itValidatesTheProperty(ctx)

      describe('when updated with array value', function () {
        beforeEach(function () {
          Logger.warn.reset()
          ctx.instance.set('bar', [])
        })

        itValidatesTheProperty(ctx, 'Expected property bar to be a boolean')
      })

      describe('when updated with boolean value', function () {
        beforeEach(function () {
          Logger.warn.reset()
          ctx.instance.set('bar', false)
        })

        itValidatesTheProperty(ctx)
      })

      describe('when updated with null value', function () {
        beforeEach(function () {
          Logger.warn.reset()
          ctx.instance.set('bar', null)
        })

        itValidatesTheProperty(ctx, 'Expected property bar to be a boolean')
      })

      describe('when updated with number value', function () {
        beforeEach(function () {
          Logger.warn.reset()
          ctx.instance.set('bar', 2)
        })

        itValidatesTheProperty(ctx, 'Expected property bar to be a boolean')
      })

      describe('when updated with object value', function () {
        beforeEach(function () {
          Logger.warn.reset()
          ctx.instance.set('bar', {})
        })

        itValidatesTheProperty(ctx, 'Expected property bar to be a boolean')
      })

      describe('when updated with string value', function () {
        beforeEach(function () {
          Logger.warn.reset()
          ctx.instance.set('bar', 'baz')
        })

        itValidatesTheProperty(ctx, 'Expected property bar to be a boolean')
      })
    })

    describe('when initialized with number value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create({bar: 1})
      })

      itValidatesTheProperty(ctx, 'Expected property bar to be a boolean')

      describe('when updated with array value', function () {
        beforeEach(function () {
          Logger.warn.reset()
          ctx.instance.set('bar', [])
        })

        itValidatesTheProperty(ctx, 'Expected property bar to be a boolean')
      })

      describe('when updated with boolean value', function () {
        beforeEach(function () {
          Logger.warn.reset()
          ctx.instance.set('bar', false)
        })

        itValidatesTheProperty(ctx)
      })

      describe('when updated with null value', function () {
        beforeEach(function () {
          Logger.warn.reset()
          ctx.instance.set('bar', null)
        })

        itValidatesTheProperty(ctx, 'Expected property bar to be a boolean')
      })

      describe('when updated with number value', function () {
        beforeEach(function () {
          Logger.warn.reset()
          ctx.instance.set('bar', 2)
        })

        itValidatesTheProperty(ctx, 'Expected property bar to be a boolean')
      })

      describe('when updated with object value', function () {
        beforeEach(function () {
          Logger.warn.reset()
          ctx.instance.set('bar', {})
        })

        itValidatesTheProperty(ctx, 'Expected property bar to be a boolean')
      })

      describe('when updated with string value', function () {
        beforeEach(function () {
          Logger.warn.reset()
          ctx.instance.set('bar', 'baz')
        })

        itValidatesTheProperty(ctx, 'Expected property bar to be a boolean')
      })
    })

    describe('when initialized without value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create()
      })

      itValidatesTheProperty(ctx)

      describe('when updated with array value', function () {
        beforeEach(function () {
          Logger.warn.reset()
          ctx.instance.set('bar', [])
        })

        itValidatesTheProperty(ctx, 'Expected property bar to be a boolean')
      })

      describe('when updated with boolean value', function () {
        beforeEach(function () {
          Logger.warn.reset()
          ctx.instance.set('bar', false)
        })

        itValidatesTheProperty(ctx)
      })

      describe('when updated with null value', function () {
        beforeEach(function () {
          Logger.warn.reset()
          ctx.instance.set('bar', null)
        })

        itValidatesTheProperty(ctx, 'Expected property bar to be a boolean')
      })

      describe('when updated with number value', function () {
        beforeEach(function () {
          Logger.warn.reset()
          ctx.instance.set('bar', 2)
        })

        itValidatesTheProperty(ctx, 'Expected property bar to be a boolean')
      })

      describe('when updated with object value', function () {
        beforeEach(function () {
          Logger.warn.reset()
          ctx.instance.set('bar', {})
        })

        itValidatesTheProperty(ctx, 'Expected property bar to be a boolean')
      })

      describe('when updated with string value', function () {
        beforeEach(function () {
          Logger.warn.reset()
          ctx.instance.set('bar', 'baz')
        })

        itValidatesTheProperty(ctx, 'Expected property bar to be a boolean')
      })
    })
  })
})
