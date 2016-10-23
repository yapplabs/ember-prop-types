export default [
  {
    description: 'Property can be of any type.',
    example: `
import Ember from 'ember'
const {Component} = Ember
import PropTypeMixin, {PropTypes} from 'ember-prop-types'

export default Component.extend(PropTypeMixin, {
  propTypes: {
    foo: PropTypes.any
  }
})
    `,
    name: 'any'
  },
  {
    description: 'Property must be an array.',
    example: `
import Ember from 'ember'
const {Component} = Ember
import PropTypeMixin, {PropTypes} from 'ember-prop-types'

export default Component.extend(PropTypeMixin, {
  propTypes: {
    foo: PropTypes.array
  }
})
    `,
    name: 'array'
  },
  {
    description: 'Property must be an array of given type.',
    example: `
import Ember from 'ember'
const {Component} = Ember
import PropTypeMixin, {PropTypes} from 'ember-prop-types'

export default Component.extend(PropTypeMixin, {
  propTypes: {
    foo: PropTypes.arrayOf(PropTypes.string)
  }
})
    `,
    name: 'arrayOf'
  },
  {
    description: 'Property must be a boolean.',
    example: `
import Ember from 'ember'
const {Component} = Ember
import PropTypeMixin, {PropTypes} from 'ember-prop-types'

export default Component.extend(PropTypeMixin, {
  propTypes: {
    foo: PropTypes.boolean
  }
})
    `,
    name: 'bool'
  },
  {
    description: 'Property must be an instance of Element.',
    example: `
import Ember from 'ember'
const {Component} = Ember
import PropTypeMixin, {PropTypes} from 'ember-prop-types'

export default Component.extend(PropTypeMixin, {
  propTypes: {
    foo: PropTypes.element
  }
})
    `,
    name: 'element'
  },
  {
    description: 'Property must be an Ember.Object.',
    example: `
import Ember from 'ember'
const {Component} = Ember
import PropTypeMixin, {PropTypes} from 'ember-prop-types'

export default Component.extend(PropTypeMixin, {
  propTypes: {
    foo: PropTypes.EmberObject
  }
})
    `,
    name: 'EmberObject'
  },
  {
    description: 'Property must be a function.',
    example: `
import Ember from 'ember'
const {Component} = Ember
import PropTypeMixin, {PropTypes} from 'ember-prop-types'

export default Component.extend(PropTypeMixin, {
  propTypes: {
    foo: PropTypes.func
  }
})
    `,
    name: 'func'
  },
  {
    description: 'Property must be an instance of given class.',
    example: `
import Ember from 'ember'
const {Component} = Ember
import PropTypeMixin, {PropTypes} from 'ember-prop-types'

export default Component.extend(PropTypeMixin, {
  propTypes: {
    foo: PropTypes.instanceOf(HTMLElement)
  }
})
    `,
    name: 'instanceOf'
  },
  {
    description: 'Property must be null. This is typically useful in conjunction with oneOfType.',
    example: `
import Ember from 'ember'
const {Component} = Ember
import PropTypeMixin, {PropTypes} from 'ember-prop-types'

export default Component.extend(PropTypeMixin, {
  propTypes: {
    foo: PropTypes.oneOfType([
      PropTypes.null,
      PropTypes.string
    ])
  }
})
    `,
    name: 'null'
  },
  {
    description: 'Property must be a number.',
    example: `
import Ember from 'ember'
const {Component} = Ember
import PropTypeMixin, {PropTypes} from 'ember-prop-types'

export default Component.extend(PropTypeMixin, {
  propTypes: {
    foo: PropTypes.number
  }
})
    `,
    name: 'number'
  },
  {
    description: 'Property must be an object.',
    example: `
import Ember from 'ember'
const {Component} = Ember
import PropTypeMixin, {PropTypes} from 'ember-prop-types'

export default Component.extend(PropTypeMixin, {
  propTypes: {
    foo: PropTypes.object
  }
})
    `,
    name: 'object'
  },
  {
    description: 'Property value must be in set of possible values.',
    example: `
import Ember from 'ember'
const {Component} = Ember
import PropTypeMixin, {PropTypes} from 'ember-prop-types'

export default Component.extend(PropTypeMixin, {
  propTypes: {
    foo: PropTypes.oneOf(['bar', 'baz'])
  }
})
    `,
    name: 'oneOf'
  },
  {
    description: 'Property type must be in set of possible types.',
    example: `
import Ember from 'ember'
const {Component} = Ember
import PropTypeMixin, {PropTypes} from 'ember-prop-types'

export default Component.extend(PropTypeMixin, {
  propTypes: {
    foo: PropTypes.oneOfType([
      PropTypes.null,
      PropTypes.string
    ])
  }
})
    `,
    name: 'oneOfType'
  },
  {
    description: 'Property must be an Object of the given shape.',
    example: `
import Ember from 'ember'
const {Component} = Ember
import PropTypeMixin, {PropTypes} from 'ember-prop-types'

export default Component.extend(PropTypeMixin, {
  propTypes: {
    foo: PropTypes.shape({
      bar: PropTypes.number.isRequired,
      baz: PropTypes.string
    })
  }
})
    `,
    name: 'shape'
  },
  {
    description: 'Property must be a string.',
    example: `
import Ember from 'ember'
const {Component} = Ember
import PropTypeMixin, {PropTypes} from 'ember-prop-types'

export default Component.extend(PropTypeMixin, {
  propTypes: {
    foo: PropTypes.string
  }
})
    `,
    name: 'string'
  },
  {
    description: 'Property must be a symbol.',
    example: `
import Ember from 'ember'
const {Component} = Ember
import PropTypeMixin, {PropTypes} from 'ember-prop-types'

export default Component.extend(PropTypeMixin, {
  propTypes: {
    foo: PropTypes.symbol
  }
})
    `,
    name: 'symbol'
  }
]
