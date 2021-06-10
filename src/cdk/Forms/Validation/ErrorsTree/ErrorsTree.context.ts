import { createContext } from 'react'
import { RootContext } from '@cdk/ContextTree'

export const ErrorsContext = createContext<RootContext>([() => undefined, () => undefined])
