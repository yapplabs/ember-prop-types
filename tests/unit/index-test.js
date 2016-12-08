import {expect} from 'chai'
import PropTypesMixin2, {PropTypes as PropTypes2} from 'ember-prop-types'
import PropTypesMixin, {PropTypes} from 'ember-prop-types/mixins/prop-types'
import {describe, it} from 'mocha'

describe('Unit / index / ember-prop-types', function () {
  it('should export PropTypesMixin as default', function () {
    expect(PropTypesMixin).to.equal(PropTypesMixin2)
  })

  it('should export PropTypes', function () {
    expect(PropTypes).to.equal(PropTypes2)
  })
})
