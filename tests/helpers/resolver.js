import config from '../../config/environment'
import Resolver from '../../resolver'

const resolver = Resolver.create({namespace: 'resolver'})

resolver.namespace = {
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix
}

export default resolver
