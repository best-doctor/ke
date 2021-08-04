import { createContext } from 'react'

import type { AccessConfig } from './types'

// TODO: Remove when proper config is ready
export const accessConfigContext = createContext<AccessConfig>({ resources: {} })

export const AccessConfigProvider = accessConfigContext.Provider
