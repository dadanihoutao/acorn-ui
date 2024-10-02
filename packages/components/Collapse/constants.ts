import type { CollapseContext } from './types'
import type { InjectionKey } from 'vue'

export const COLLAPSE_CTX_KEY: InjectionKey<CollapseContext> = Symbol('collapseContext')
