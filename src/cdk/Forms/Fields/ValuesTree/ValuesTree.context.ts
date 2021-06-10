import { createContext } from 'react'
import { RootContext } from '@cdk/ContextTree'

export const ValuesContext = createContext<RootContext>([() => undefined, () => undefined])
