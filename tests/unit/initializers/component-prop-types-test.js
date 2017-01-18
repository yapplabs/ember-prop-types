/**
 * Unit test for the component-prop-types initializer
 */
import {expect} from 'chai'
import Ember from 'ember'
const {Application, Component, run} = Ember
import {beforeEach, describe, it} from 'mocha'

import {createComponent} from 'dummy/tests/helpers/ember-prop-types'
import {initialize} from 'ember-prop-types/initializers/component-prop-types'
import PropTypesMixin from 'ember-prop-types/mixins/prop-types'

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
})
