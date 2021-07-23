import { createContext } from 'react'

import type { AnalyticsConfig } from './types'

// TODO: Remove when proper config is ready
export const analyticsConfigContext = createContext<AnalyticsConfig>({})

export const AnalyticsConfigProvider = analyticsConfigContext.Provider
