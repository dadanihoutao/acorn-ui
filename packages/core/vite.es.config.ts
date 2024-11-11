import terser from '@rollup/plugin-terser'
import vue from '@vitejs/plugin-vue'
import { readdirSync, readFileSync } from 'fs'
import { filter, map, delay } from 'lodash-es'
import { resolve } from 'path'
import shell from 'shelljs'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

import hooks from './hooksPlugin'

const isProd = process.env.NODE_ENV === 'production'
const isDev = process.env.NODE_ENV === 'development'
const isTest = process.env.NODE_ENV === 'test'
const TRY_MOVE_STYLE_DELAY = 800 as number

function getDirectoriesSync(basePath: string) {
  const entries = readdirSync(basePath, { withFileTypes: true })

  return map(
    filter(entries, (entry) => entry.isDirectory()),
    (entry) => entry.name
  )
}
function moveStyle() {
  try {
    readFileSync('./dist/es/theme')
    shell.cp('./dist/es/theme', './dist')
  } catch (_) {
    delay(moveStyle, TRY_MOVE_STYLE_DELAY)
  }
}

export default defineConfig({
  plugins: [
    vue(),
    dts({
      tsconfigPath: '../../tsconfig.build.json',
      outDir: 'dist/types'
    }),
    hooks({
      rmFile: ['./dist/es', './dist/theme', './dist/types'],
      afterBuild: moveStyle
    }),
    terser({
      compress: {
        drop_console: ['log'],
        drop_debugger: true,
        passes: 3,
        global_defs: {
          '@DEV': JSON.stringify(isDev),
          '@PROD': JSON.stringify(isProd),
          '@TEST': JSON.stringify(isTest)
        }
      }
    }),
    {
      name: 'exit-after-build',
      closeBundle() {
        // 在打包完成后退出进程
        process.exit(0)
      }
    }
  ],
  build: {
    outDir: 'dist/es',
    minify: false,
    cssCodeSplit: true,
    lib: {
      entry: resolve(__dirname, './index.ts'),
      name: 'AcornUI',
      fileName: 'index',
      formats: ['es']
    },
    rollupOptions: {
      external: [
        'vue',
        '@fortawesome/fontawesome-svg-core',
        '@fortawesome/free-solid-svg-icons',
        '@fortawesome/vue-fontawesome',
        '@popperjs/core',
        'async-validator'
      ],
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'index.css'
          if (assetInfo.type === 'asset' && /\.(css)$/i.test(assetInfo.name as string)) {
            return 'theme/[name].[ext]'
          }
          return assetInfo.name as string
        },
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'
          }
          if (id.includes('/packages/hooks')) {
            return 'hooks'
          }
          if (id.includes('/packages/utils') || id.includes('plugin-vue:export-helper')) {
            return 'utils'
          }
          for (const dirName of getDirectoriesSync('../components')) {
            if (id.includes(`/packages/components/${dirName}`)) {
              return dirName
            }
          }
        }
      }
    }
  }
})
