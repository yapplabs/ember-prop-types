import Ember from 'ember'
const {Route} = Ember

import contributors from '../fixtures/contributors'
import validators from '../fixtures/validators'

const defaultsExample = `
import Ember from 'ember'
const {Component} = Ember
import PropTypeMixin, {PropTypes} from 'ember-prop-types'

export default Component.extend(PropTypeMixin, {
  propTypes: {
    baz: PropTypes.number,
    foo: PropTypes.string
  },

  getDefaultProps () {
    return {
      baz: 1,
      foo: 'bar'
    }
  }
})

`

export default Route.extend({
  model () {
    return {
      contributors,
      defaultsExample,
      validators
    }
  }
})
