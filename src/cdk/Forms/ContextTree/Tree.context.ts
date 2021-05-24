import { createContext } from 'react'

import { RootContext } from './types'

export const TreeContext = createContext<RootContext>([() => undefined, () => undefined])
