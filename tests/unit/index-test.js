const expect = chai.expect

import {describe, it} from 'mocha'
import PropTypesMixin, {PropTypes} from 'ember-prop-types/mixins/prop-types'
import PropTypesMixin2, {PropTypes as PropTypes2} from 'ember-prop-types'

describe('ember-prop-types', function () {
  it('exports PropTypesMixin as default', function () {
    expect(PropTypesMixin).to.equal(PropTypesMixin2)
  })

  it('exports PropTypes', function () {
    expect(PropTypes).to.equal(PropTypes2)
  })
})
