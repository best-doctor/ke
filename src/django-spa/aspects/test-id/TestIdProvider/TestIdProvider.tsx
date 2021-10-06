import React, { useMemo } from 'react'

export interface TestIdConfig {
  enabled?: boolean
  enableDuplicationsWarnings?: boolean
}

export interface TestIdContextData {
  config: TestIdConfig
}

export const TestIdContext = React.createContext<TestIdContextData | null>(null)

interface TestIdProviderProps {
  config?: TestIdConfig
  children?: React.ReactNode
}

const defaultConfig: TestIdConfig = {
  enabled: true,
}

export const TestIdProvider: React.FC<TestIdProviderProps> = ({ config = defaultConfig, children }) => {
  const value: TestIdContextData = useMemo(
    () => ({
      config: { ...defaultConfig, ...config },
    }),
    [config]
  )

  return <TestIdContext.Provider value={value}>{children}</TestIdContext.Provider>
}
