/**
 * Unit test for the component-prop-types initializer
 */
import Application from '@ember/application'

import Component from '@ember/component'
import {run} from '@ember/runloop'
import {expect} from 'chai'
import {
  after,
  before,
  beforeEach,
  describe,
  it
} from 'mocha'

import {createComponent} from 'dummy/tests/helpers/ember-prop-types'
import {initialize} from 'ember-prop-types/initializers/component-prop-types'
import PropTypesMixin, {settings} from 'ember-prop-types/mixins/prop-types'

describe('Unit / Initializers / component-prop-types', function () {
  let container, application

  beforeEach(function () {
    run(() => {
      application = Application.create()
      container = application.__container__
      application.deferReadiness()
    })

    initialize(container, application)
  })

  describe('when a new component is created', function () {
    let component
    beforeEach(function () {
      component = createComponent(Component)
    })

    it('should have the PropTypesMixin', function () {
      expect(PropTypesMixin.detect(component)).to.equal(true)
    })
  })

  describe('when requireComponentPropTypes is set to true', function () {
    let originalRequireComponentPropTypes

    before(function () {
      originalRequireComponentPropTypes = settings.requireComponentPropTypes
      settings.requireComponentPropTypes = true
    })

    after(function () {
      settings.requireComponentPropTypes = originalRequireComponentPropTypes
    })

    describe('when throwErrors is set to true', function () {
      let originalThrowErrors

      before(function () {
        originalThrowErrors = settings.throwErrors
        settings.throwErrors = true
      })

      after(function () {
        settings.throwErrors = originalThrowErrors
      })

      it('does not throw error when component has propTypes', function () {
        expect(() => {
          createComponent(Component.extend({
            propTypes: {}
          }))
        }).not.to.throw()
      })

      it('throws error when component does not have propTypes', function () {
        expect(() => {
          createComponent(Component)
        }).to.throw()
      })
    })

    describe('when throwErrors is set to false', function () {
      let originalThrowErrors

      before(function () {
        originalThrowErrors = settings.throwErrors
        settings.throwErrors = false
      })

      after(function () {
        settings.throwErrors = originalThrowErrors
      })

      it('does not throw error when component has propTypes', function () {
        expect(() => {
          createComponent(Component.extend({
            propTypes: {}
          }))
        }).not.to.throw()
      })

      it('does not throw error when component does not have propTypes', function () {
        expect(() => {
          createComponent(Component)
        }).not.to.throw()
      })
    })
  })

  describe('when requireComponentPropTypes is set to false', function () {
    let originalRequireComponentPropTypes

    before(function () {
      originalRequireComponentPropTypes = settings.requireComponentPropTypes
      settings.requireComponentPropTypes = false
    })

    after(function () {
      settings.requireComponentPropTypes = originalRequireComponentPropTypes
    })

    describe('when throwErrors is set to true', function () {
      let originalThrowErrors

      before(function () {
        originalThrowErrors = settings.throwErrors
        settings.throwErrors = true
      })

      after(function () {
        settings.throwErrors = originalThrowErrors
      })

      it('does not throw error when component has propTypes', function () {
        expect(() => {
          createComponent(Component.extend({
            propTypes: {}
          }))
        }).not.to.throw()
      })

      it('does not throw error when component does not have propTypes', function () {
        expect(() => {
          createComponent(Component)
        }).not.to.throw()
      })
    })

    describe('when throwErrors is set to false', function () {
      let originalThrowErrors

      before(function () {
        originalThrowErrors = settings.throwErrors
        settings.throwErrors = false
      })

      after(function () {
        settings.throwErrors = originalThrowErrors
      })

      it('does not throw error when component has propTypes', function () {
        expect(() => {
          createComponent(Component.extend({
            propTypes: {}
          }))
        }).not.to.throw()
      })

      it('does not throw error when component does not have propTypes', function () {
        expect(() => {
          createComponent(Component)
        }).not.to.throw()
      })
    })
  })
})
