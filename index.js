'use strict'

module.exports = {
  name: 'ember-prop-types',

  init () {
    this.options = this.options || {}
    this.options.babel = this.options.babel || {}
    this.options.babel.optional = this.options.babel.optional || []

    if (this.options.babel.optional.indexOf('es6.spec.symbols') === -1) {
      this.options.babel.optional.push('es6.spec.symbols')
    }

    this._super.init && this._super.init.apply(this, arguments)
  }
}
