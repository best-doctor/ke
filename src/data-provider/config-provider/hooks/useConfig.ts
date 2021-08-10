import { useMemo } from 'react'
import { useConfigResolver } from '../../hooks/useConfigResolver'
import { BaseConfig, ConfigConsumerOptionsOrKey } from '../interfaces'
import { useGlobalConfig } from './useGlobalConfig'

export function useConfig<Config extends BaseConfig>(optionsOrString: ConfigConsumerOptionsOrKey<Config>): Config {
  const { config, globalConfig } = useGlobalConfig<any>()

  const { key, mergeConfigs = config.mergeConfigs, override = {}, defaultConfig } = useConfigResolver(optionsOrString)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const subconfig = globalConfig[key as any]

  return useMemo(() => {
    if (!subconfig) {
      return defaultConfig
    }

    if (override) {
      return mergeConfigs(subconfig, override)
    }
    return subconfig
  }, [defaultConfig, mergeConfigs, override, subconfig])
}
