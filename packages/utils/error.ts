import { isString } from 'lodash-es'

class AUIError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'AUIError'
  }
}

export function throwError(scope: string, msg: string) {
  throw new AUIError(`[${scope}] ${msg}`)
}

// 函数重载
export function debugWarn(error: Error): void
export function debugWarn(scope: string, msg: string): void
export function debugWarn(scope: string | Error, msg?: string) {
  if (process.env.NODE_ENV !== 'production') {
    let err: Error
    try {
      if (isString(scope)) {
        err = new AUIError(`[${scope}] ${msg}`)
      } else {
        err = scope
      }
    } catch (e: any) {
      // 处理 AUIError 构造函数可能抛出的异常
      err = new Error(`Failed to create AUIError: ${e?.message}`)
    }
    console.warn(err)
  }
}
