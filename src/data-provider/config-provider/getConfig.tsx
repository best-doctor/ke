import { BaseConfig, GetConfigOptions } from './interfaces'
import { withDefaultOptions } from './utils'

export function getConfig<GlobalConfig extends BaseConfig, Config extends BaseConfig>(
  baseConfig: GlobalConfig,
  configKey: string,
  options: GetConfigOptions<Config> = {}
) {
  return (): Config => {
    const config = baseConfig[configKey] as Config
    const { mergeConfigs, override = {} } = withDefaultOptions(options)
    return mergeConfigs(config, override)
  }
}

export function getGlobalConfig(baseConfig: BaseConfig) {
  return <GlobalConfig extends BaseConfig>(): GlobalConfig => baseConfig as GlobalConfig
}
