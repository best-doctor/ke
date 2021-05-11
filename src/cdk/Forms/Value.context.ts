import { createContext } from 'react'

import type { FormValue } from './types'

export const ValueContext = createContext<FormValueContext>([{}, () => {}])

type FormValueContext<T extends FormValue = FormValue> = [T, (val: T) => void]
