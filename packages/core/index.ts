import { makeInstaller } from '@acorn-ui/utils'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

import components from './components'
import '@acorn-ui/theme/index.css'
import printLogo from './printLogo'

printLogo()

library.add(fas)

const installer = makeInstaller(components)

export * from '@acorn-ui/components'

export default installer
