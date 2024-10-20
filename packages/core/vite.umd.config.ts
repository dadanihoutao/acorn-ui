import vue from '@vitejs/plugin-vue'
import { readFileSync } from 'fs'
import { delay } from 'lodash-es'
import { resolve } from 'path'
import shell from 'shelljs'
import { defineConfig } from 'vite'
import compression from 'vite-plugin-compression2'

import hooks from './hooksPlugin'

const TRY_MOVE_STYLE_DELAY = 800 as number
function moveStyle() {
  try {
    readFileSync('./dist/umd/index.css.gz')
    shell.cp('./dist/umd/index.css', './dist/index.css')
  } catch (_) {
    delay(moveStyle, TRY_MOVE_STYLE_DELAY)
  }
}

export default defineConfig({
  plugins: [
    vue(),
    compression({
      include: /.(cjs|css)$/i
    }),
    hooks({
      rmFile: ['./dist/umd', './dist/index.css'],
      afterBuild: moveStyle
    })
  ],
  build: {
    outDir: 'dist/umd',
    lib: {
      entry: resolve(__dirname, './index.ts'),
      name: 'AcornUI',
      fileName: 'index',
      formats: ['umd']
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue'
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'index.css'
          return assetInfo.name as string
        }
      }
    }
  }
})
