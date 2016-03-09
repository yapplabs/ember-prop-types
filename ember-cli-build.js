/* global require, module */
var EmberAddon = require('ember-cli/lib/broccoli/ember-addon')

module.exports = function (defaults) {
  var app = new EmberAddon(defaults, {
    'ember-cli-mocha': {
      useLintTree: false
    }
  })

  if (app.env === 'test') {
    app.import('bower_components/sinonjs/sinon.js')
  }

  return app.toTree()
}
