import { each, isFunction } from 'lodash-es'
import shell from 'shelljs'

export default function hooksPlugin({
  rmFile = [],
  beforeBuild,
  afterBuild
}: {
  rmFile?: string[]
  beforeBuild?: Function
  afterBuild?: Function
}) {
  return {
    name: 'hooks-plugin',
    buildStart() {
      each(rmFile, (fName) => {
        shell.rm('-rf', fName)
      })
      isFunction(beforeBuild) && beforeBuild()
    },
    buildEnd(err?: Error) {
      !err && isFunction(afterBuild) && afterBuild()
    }
  }
}
