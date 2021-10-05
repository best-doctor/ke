import React, { useMemo, useRef } from 'react'

export interface TestIdConfig {
  enabled?: boolean
  enableDuplicationsWarnings?: boolean
}

export interface TestIdContextData {
  config: TestIdConfig
  keys: Set<string>
}

export const TestIdContext = React.createContext<TestIdContextData | null>(null)

interface TestIdProviderProps {
  config?: TestIdConfig
  children?: React.ReactNode
}

const defaultConfig: TestIdConfig = {
  enabled: true,
  enableDuplicationsWarnings: true,
}

export const TestIdProvider: React.FC<TestIdProviderProps> = ({ config = {}, children }) => {
  const keys = useRef(new Set<string>())

  const value: TestIdContextData = useMemo(
    () => ({
      keys: keys.current,
      config: { ...defaultConfig, ...config },
    }),
    [config]
  )

  return <TestIdContext.Provider value={value}>{children}</TestIdContext.Provider>
}
