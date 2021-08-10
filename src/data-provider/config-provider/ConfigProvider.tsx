import React, { useMemo } from 'react'
import { BaseConfig, ConfigProcessorConfig, ConfigProviderOptions } from './interfaces'
import { getDefaultConfigProviderConfig } from './utils/getDefaultConfigProviderConfig'

export interface ConfigProviderValue<GlobalConfig extends BaseConfig> {
  globalConfig: GlobalConfig
  config: ConfigProcessorConfig<GlobalConfig>
}

export const ConfigContext = React.createContext<ConfigProviderValue<any> | null>(null)

interface ConfigProviderProps<GlobalConfig extends BaseConfig> {
  globalConfig: GlobalConfig
  options?: ConfigProviderOptions<GlobalConfig>
  children?: React.ReactNode
}

export const ConfigProvider = <GlobalConfig extends BaseConfig>({
  children,
  globalConfig,
  options,
}: ConfigProviderProps<GlobalConfig>): React.ReactElement => {
  const processorConfig: ConfigProcessorConfig<GlobalConfig> = useMemo(
    () => ({
      ...getDefaultConfigProviderConfig(),
      ...options,
    }),
    [options]
  )

  const value: ConfigProviderValue<GlobalConfig> = useMemo(() => ({ config: processorConfig, globalConfig }), [
    globalConfig,
    processorConfig,
  ])
  return <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>
}
