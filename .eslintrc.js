module.exports = {
   extends: 'frost-standard',
   plugins: [
      'ember'
    ],
   rules: {
    'ember/new-module-imports': 'error',
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
  }
}
