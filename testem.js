/* eslint-env node */

module.exports = {
  disable_watching: true,
  framework: 'mocha',
  launch_in_ci: [
    'Chrome',
    'Firefox'
  ],
  launch_in_dev: [
    'Chrome'
  ],
  tap_quiet_logs: true,
  test_page: 'tests/index.html?hidepassed'
}
