export default [
  {
    description: 'Property can be of any type.',
    example: `
import Ember from 'ember'
const {Component} = Ember
import PropTypeMixin, {PropTypes} from 'ember-prop-types'

export default Component.extend(PropTypeMixin, {
  propTypes: {
    bar: PropTypes.any,
    baz: PropTypes.any.isRequired,
    foo: PropTypes.any({required: true})
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
    bar: PropTypes.array,
    baz: PropTypes.array.isRequired,
    foo: PropTypes.array({required: true})
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
    bar: PropTypes.arrayOf(PropTypes.string),
    baz: PropTypes.arrayOf(PropTypes.string).isRequired,
    foo: PropTypes.arrayOf(PropTypes.string, {required: true})
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
    bar: PropTypes.bool,
    baz: PropTypes.bool.isRequired,
    foo: PropTypes.bool({required: true})
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
    bar: PropTypes.element,
    baz: PropTypes.element.isRequired,
    foo: PropTypes.element({required: true})
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
    bar: PropTypes.EmberObject,
    baz: PropTypes.EmberObject.isRequired,
    foo: PropTypes.EmberObject({required: true})
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
    bar: PropTypes.func,
    baz: PropTypes.func.isRequired,
    foo: PropTypes.func({required: true})
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
    bar: PropTypes.instanceOf(HTMLElement),
    baz: PropTypes.instanceOf(HTMLElement).isRequired
    foo: PropTypes.instanceOf(HTMLElement, {required: true})
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
    bar: PropTypes.oneOfType([
      PropTypes.null,
      PropTypes.string
    ]),
    baz: PropTypes.oneOfType([
      PropTypes.null,
      PropTypes.string
    ]).isRequired,
    foo: PropTypes.oneOfType(
      [
        PropTypes.null,
        PropTypes.string
      ],
      {
        required: true
      }
    )
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
    bar: PropTypes.number,
    baz: PropTypes.number.isRequired,
    foo: PropTypes.number({required: true})
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
    bar: PropTypes.object,
    baz: PropTypes.object.isRequired,
    foo: PropTypes.object({required: true})
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
    bar: PropTypes.oneOf(['bar', 'baz']),
    baz: PropTypes.oneOf(['bar', 'baz']).isRequired,
    foo: PropTypes.oneOf(
      [
        'bar',
        'baz'
      ],
      {
        required: true
      }
    )
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
    bar: PropTypes.oneOfType([
      PropTypes.null,
      PropTypes.string
    ]),
    baz: PropTypes.oneOfType([
      PropTypes.null,
      PropTypes.string
    ]).isRequired,
    foo: PropTypes.oneOfType(
      [
        PropTypes.null,
        PropTypes.string
      ],
      {
        required: true
      }
    )
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
    bar: PropTypes.shape({
      bar: PropTypes.number.isRequired,
      baz: PropTypes.string
    }),
    baz: PropTypes.shape({
      bar: PropTypes.number.isRequired,
      baz: PropTypes.string
    }).isRequired,
    foo: PropTypes.shape(
      {
        bar: PropTypes.number.isRequired,
        baz: PropTypes.string
      },
      {
        required: true
      }
    )
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
    bar: PropTypes.string,
    baz: PropTypes.string.isRequired,
    foo: PropTypes.string({required: true})
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
    bar: PropTypes.symbol,
    baz: PropTypes.symbol.isRequired,
    foo: PropTypes.symbol({required: true})
  }
})
    `,
    name: 'symbol'
  }
]
