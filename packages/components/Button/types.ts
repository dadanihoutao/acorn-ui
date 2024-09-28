import type { Component } from 'vue'

export type ButtonType = 'primary' | 'success' | 'warning' | 'danger' | 'info'
export type NativeType = 'button' | 'submit' | 'reset'
export type ButtonSize = 'default' | 'large' | 'small'

export interface ButtonProps {
  tag?: string | Component
  type?: ButtonType
  size?: ButtonSize
  plain?: boolean
  round?: boolean
  circle?: boolean
  disabled?: boolean
  autofocus?: boolean
  nativeType?: NativeType
  icon?: string
  loading?: boolean
  loadingIcon?: string
  useThrottle?: boolean
  throttleDuration?: number
}
