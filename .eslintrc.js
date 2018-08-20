module.exports = {
   extends: 'frost-standard',
   rules: {
    'ocd/sort-import-declarations': [
      2,
      {
        'localPrefixes': [
          '../',
          './',
          'dummy/',
          'ember-prop-types'
        ]
      }
    ]
  },
  "rules": {
    "ember-standard/logger": [2, "never"]
  }
}
