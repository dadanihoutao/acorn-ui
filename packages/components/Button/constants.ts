import type { ButtonGroupContext } from './types'
import type { InjectionKey } from 'vue'

export const BUTTON_GROUP_CTX_KEY: InjectionKey<ButtonGroupContext> = Symbol('buttonGroupContext')
