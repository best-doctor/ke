import { createContext } from 'react'

import type { ArrContext, RecContext } from './types'

export const RootContext = createContext<ArrContext | RecContext>({ value: {}, errors: {}, setData: () => undefined })

export function isArrContext(ctx: ArrContext | RecContext): ctx is ArrContext {
  return Array.isArray(ctx.value)
}
