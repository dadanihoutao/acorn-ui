import { makeInstaller } from '@acorn-ui/utils'

import components from './components'
import '@acorn-ui/theme/index.css'

const installer = makeInstaller(components)

export * from './components'

export default installer
