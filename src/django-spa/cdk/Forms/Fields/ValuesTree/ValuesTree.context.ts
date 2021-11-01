import { createContext } from 'react'
import { RootContext } from '../../../ContextTree'

export const ValuesContext = createContext<RootContext>([defaultContextFunc, defaultContextFunc])

function defaultContextFunc(): never {
  throw new Error(`Try to use ValuesContext before initialization.`)
}
