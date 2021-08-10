import { useContext } from 'react'
import { ConfigContext, ConfigProviderValue } from '../ConfigProvider'
import { BaseConfig } from '../interfaces'

export function useGlobalConfig<GlobalConfig extends BaseConfig>(): ConfigProviderValue<GlobalConfig> {
  const config = useContext(ConfigContext) as ConfigProviderValue<GlobalConfig> | null
  if (!config) {
    throw new Error('You must wrap your app with DataProvider before using useResourceProviderConfig')
  }
  return config
}
