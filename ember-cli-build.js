/* eslint-env node */
const EmberAddon = require('ember-cli/lib/broccoli/ember-addon')

module.exports = function (defaults) {
  let app = new EmberAddon(defaults, {
    'babel': {
      plugins: ['@babel/plugin-transform-typeof-symbol']
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
