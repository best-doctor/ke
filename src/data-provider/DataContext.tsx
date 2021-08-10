import React from 'react'
import { BaseConfig, ConfigProviderOptions } from './config-provider'
import { ConfigProvider } from './config-provider/ConfigProvider'

import { ResourceProvider, ResourceProviderConfig } from './resource-provider'

interface DataProviderProps<GlobalConfig extends BaseConfig> {
  children: React.ReactNode
  globalConfig?: GlobalConfig
  configOptions?: ConfigProviderOptions<GlobalConfig>
  resourcesConfig: Partial<ResourceProviderConfig>
}

export const DataProvider = <GlobalConfig extends BaseConfig>({
  children,
  resourcesConfig = {},
  globalConfig = {} as GlobalConfig,
  configOptions,
}: DataProviderProps<GlobalConfig>): JSX.Element => (
  <ResourceProvider config={resourcesConfig}>
    <ConfigProvider globalConfig={globalConfig} options={configOptions}>
      {children}
    </ConfigProvider>
  </ResourceProvider>
)
