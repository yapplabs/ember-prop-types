/* eslint-env node */
const EmberAddon = require('ember-cli/lib/broccoli/ember-addon')

module.exports = function (defaults) {
  let app = new EmberAddon(defaults, {
    'babel': {
      optional: ['es6.spec.symbols']
    },
    'ember-cli-babel': {
      includePolyfill: true
    },
    'ember-prism': {
      components: [
        'handlebars',
        'javascript',
        'markup-templating'
      ],
      theme: 'okaidia'
    }
  })

  return app.toTree()
}
