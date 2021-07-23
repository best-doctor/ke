import { createContext, useContext } from 'react'
import type { AnalyticsHandler } from './types'

const analyticsContext = createContext<AnalyticsHandler>({ pushEvent: () => {} })

export const AnalyticsProvider = analyticsContext.Provider

export function useAnalytics(): AnalyticsHandler {
  return useContext(analyticsContext)
}
