import { BaseConfig, ConfigProcessorConfig } from '../interfaces'

export function getDefaultConfigProviderConfig<Config extends BaseConfig>(): ConfigProcessorConfig<Config> {
  return {
    mergeConfigs(a: Partial<Config>, b: Partial<Config>): Config {
      return { ...a, ...b } as Config
    },
  }
}
