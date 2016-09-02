import Ember from 'ember'
const {
  typeOf
} = Ember
import PropTypes, {validators} from '../utils/prop-types'
import config from 'ember-get-config'

const helpers = {
  /* eslint-disable complexity */
  validateProperty (ctx, name, def) {
    const value = ctx.get(name)

    if (value === undefined) {
      if (!def.required) {
        return
      }

      Ember.Logger.warn(`Missing required property ${name}`)

      return
    }

    if (def.type in validators) {
      validators[def.type](ctx, name, value, def, true)
    } else {
      Ember.Logger.warn(`Unknown propType ${def.type}`)
    }
  },
  /* eslint-enable complexity */

  validatePropTypes (ctx) {
    if (!config || config.environment === 'production') {
      return
    }

    const propTypesArray = [].concat(ctx.get('propTypes'))
    propTypesArray.forEach((propType) => {
      if (!propType) {
        return
      }

      Object.keys(propType).forEach(name => {
        const def = propType[name]

        if (def === undefined) {
          Ember.Logger.warn(`propType for ${name} is unknown`)
          return
        }

        helpers.validateProperty(ctx, name, def)
      })
    })
  }
}

export default Ember.Mixin.create({
  concatenatedProperties: ['propTypes', 'getDefaultProps'],

  init () {
    helpers.validatePropTypes(this)

    const keys = Object.keys(this)
    const defaults = [].concat(this.get('getDefaultProps'))
    defaults.forEach((propsFunction) => {
      if (typeOf(propsFunction) !== 'function') {
        return
      }

      const defaultProps = propsFunction.apply(this)
      keys.forEach((key) => {
        delete defaultProps[key]
      })

      this.setProperties(defaultProps)
    })
    this._super(...arguments)
  }
})

export {helpers, PropTypes}
