module.exports = function (environment) {
  var ENV = {
    APP: {},
    baseURL: '/',
    EmberENV: {
      FEATURES: {}
    },
    googleFonts: [
      'Roboto:300'
    ],
    environment: environment,
    locationType: 'auto',
    modulePrefix: 'dummy',

    'ember-prop-types': {
      throwErrors: false,
      validateOnUpdate: true
    }
  }

  switch (environment) {
    case 'production':
      ENV.baseURL = '/ember-prop-types'
      break

    case 'test':
      // Testem prefers this...
      ENV.baseURL = '/'
      ENV.locationType = 'none'

      // keep test console output quieter
      ENV.APP.LOG_ACTIVE_GENERATION = false
      ENV.APP.LOG_VIEW_LOOKUPS = false

      ENV.APP.rootElement = '#ember-testing'
      break
  }

  return ENV
}
