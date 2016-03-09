import _ from 'lodash'
import Ember from 'ember'
import PropTypes, {validators} from '../utils/prop-types'

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
    const owner = Ember.getOwner(ctx)

    // FIXME: figure out how to do below without accessing __container__ directly
    const config = owner ? owner.__container__.lookupFactory('config:environment') : null

    // If we are in production environment then do not perform property validation
    if (!config || config.environment === 'production') {
      return
    }

    const propTypes = ctx.get('propTypes')

    if (!propTypes) {
      return
    }

    _.forIn(propTypes, (def, name) => {
      if (def === undefined) {
        Ember.Logger.warn(`propType for ${name} is unknown`)
        return
      }

      helpers.validateProperty(ctx, name, def)
    })
  }
}

export default Ember.Mixin.create({
  init () {
    helpers.validatePropTypes(this)

    if (_.isFunction(this.getDefaultProps)) {
      const presentPropKeys = Object.keys(this)
      const defaultProps = this.getDefaultProps()
      const needsSetProps = _.omit(defaultProps, presentPropKeys)

      this.setProperties(needsSetProps)
    }

    this._super()
  }
})

export {helpers, PropTypes}
