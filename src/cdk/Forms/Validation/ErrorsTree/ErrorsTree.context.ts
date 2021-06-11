import { createContext } from 'react'
import { RootContext } from '@cdk/ContextTree'

export const ErrorsContext = createContext<RootContext>([defaultContextFunc, defaultContextFunc])

function defaultContextFunc(): never {
  throw new Error(`Try to use ErrorsContext before initialization.`)
}
